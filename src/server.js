import express from 'express'
import { json, urlencoded } from 'body-parser'
import morgan from 'morgan'
import cors from 'cors'
import { connect } from './utils/db'
import { config } from './config/config'
import petRouter from './resources/pet/pet-router'
import roomRouter from './resources/hotel/room-router'
import insumosRouter from './resources/insumos/insumos-router'
import { register, login, protectRoute } from './utils/auth'

export const app = express() // iniciamos la app de express

// app.disable('x-powered-by')

// Añadimos los middlewares generales a nuestra app
app.use(cors()) // Cors para permitir peticiones al server desde cualquier sitio.
app.use(json()) // La función json() de body-parser nos permite acceder al body de las peticiones.
app.use(urlencoded({ extended: true })) // extended: true para usar la librería qs y acceder a todos los objetos de la peticion.
app.use(morgan('dev')) // Morgan solo otorga una respuesta visual en colores del status de la app. Util en la etapa de desarrollo.

// Definimos los paths, así como middlewares y routers encargados de manejar las peticiones.

app.post('/register', register) //Middleware para registrar nuevo usuario.
app.post('/login', login) //Middleware para iniciar sesión de usuario.

app.use('/api', protectRoute) //Middleware encargado de verificar el acceso a la api

app.use('/api/pet', petRouter) // Ruta y router para las peticiones de las mascotas.
app.use('/api/hotel', roomRouter)
app.use('/api/insumos', insumosRouter)

// Definimos y exportamos nuestra funcion start() para iniciar el server de express
export const start = async() => {
    try {
        await connect() // llamamos a la func connect() de Mongoose para concectarnos a la db de Mongo.
        app.listen(config.serverPORT, () => { // Comenzamos a escuchar nuestro server en localhost por el puerto especificado en config.
            console.log(`REST API on http://localhost:${config.serverPORT}/`)
        })
    } catch (error) {
        console.error(error) // Mostramos el error en caso de existir.
    }
}