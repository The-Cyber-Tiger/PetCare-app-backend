import { config } from '../config/config'
import { User } from '../resources/users/user-model'
import jwt from 'jsonwebtoken'

// Definimos la función para crear un nuevo token
export const newToken = (user) => {
    // Un token esta compuesto por un payload + secretOrPrivateKey + options
    return jwt.sign({ id: user.id }, config.secrets.jwt, {
        expiresIn: config.secrets.jwtExp,
    })
}

// Definimos la función para verificar el token
export const verifyToken = (token) =>
    new Promise((resolve, reject) => {
        jwt.verify(token, config.secrets.jwt, (err, payload) => {
            if (err) return reject(err)
            resolve(payload)
        })
    })

// Definimos la función para registrarnos
export const register = async(req, res) => {
    if (!req.body.email || !req.body.password) {
        // Si falta algún campo en el registro...
        return res
            .status(400)
            .send({ message: 'email y contraseña necesarios' })
    }
    try {
        const user = await User.create(req.body) // Creamos un nuevo documento (usuario) en MongoDB con base al modelo de Mongoose.
        const token = newToken(user) // Creamos un token de acceso para el nuevo usuario.
        return res.status(201).send({ token }) // Devolvemos un status 201 y el token al cliente.
    } catch (error) {
        // En caso de algún error...
        console.error(error)
        if (error.code === 11000) {
            return res
                .status(400)
                .send({ error: 'El correo ya se encuentra registrado' })
        }
        return res.status(400).end()
    }
}

// Definimos la función para iniciar sesión
export const login = async(req, res) => {
    if (!req.body.email || !req.body.password) {
        // Si falta algún campo en la solicitud...
        return res
            .status(400)
            .send({ message: 'email y contraseña necesarios' })
    }
    const user = await User.findOne({ email: req.body.email }).exec() // Buscamos al usuario por su email en la base de datos.
    if (!user) {
        return res.status(401).send({ message: 'Usuario no registrado' }) // Si no existe no esta registrado
    }
    try {
        // Si encontramos al usuario...
        const match = await user.checkPassword(req.body.password) // Verificamos que la contraseña coincida
        if (!match) {
            return res
                .status(401)
                .send({ message: 'La contraseña no coincide' }) // La contraseña no coincide
        }
        // Si la contraseña coincide, entonces...
        const token = newToken(user) // Creamos un nuevo token para el usuario.
        return res.status(201).send({ token }) // Devolvemos el token al cliente.
    } catch (error) {
        // En caso de error...
        console.error(error)
        return res
            .status(401)
            .send({ message: 'Ocurrió un error, vuelve a intentarlo de nuevo' })
    }
}

// Definimos la función que protege las rutas de acceso no autorizado
export const protectRoute = async(req, res, next) => {
    if (!req.headers.authorization) {
        // Si la petición no contiene el header de authorization...
        return res.status(401).send({ message: 'Acceso no autorizado' })
    }
    let token = req.headers.authorization.split('Bearer ')[1] // Seleccionamos el token del header(auth)
    if (!token) {
        // Si el header no contiene el token...
        return res.status(401).send({ message: 'No existe tu token' })
    }
    // Si existe el token...
    try {
        // El payload contiene toda la info con la que fué creada el token
        const payload = await verifyToken(token) // Verificamos el token y obtenemos el payload.
        const user = await User.findById(payload.id) // Encontramos al usuario al que corresponde el token.
            .select('-password') // Excluimos su contraseña por seguridad.
            .lean() // Formateamos.
            .exec() // Devolvemos el usuario.
        req.user = user // El objeto usuario se almacena en el req.user para identificarlo dentro de la app.
        next() // Continuamos.
    } catch (error) {
        console.error(error)
        return res
            .status(401)
            .send({ message: 'Ocurrió un error, verifica que tengas acceso' })
    }
}