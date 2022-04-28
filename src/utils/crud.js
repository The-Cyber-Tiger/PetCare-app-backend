//Definimos nuestras funciones CRUD para interactuar con nuestra db de MongoDB

export const getOne = model => async(req, res) => {
    // try-catch para devolver una respuesta en caso de algún error.
    try {
        // Hacemos la consulta a MongoDB 
        const doc = await model //Obtenemos el documento segun los parametros de búsqueda necesarios.
            .findOne({ _id: req.params.id })
            .lean() // Convierte el objeto de Mongoose a un objeto JS.
            .exec() // Terminamos la Promise de Mongoose.
        if (!doc) { // Si no obtenemos respuesta...
            return res.status(400).end() // Devolvemos un estatus 400 al usuario.
        }
        res.status(200).json({ data: doc }) // Devolvemos un estatus 200 con el documento.
    } catch (error) {
        console.error(error)
        res.status(400).end() // Devolvemos un estatus 400 al usuario.
    }
}

export const getMany = model => async(req, res) => {
    try {
        const docs = await model
            .find()
            .lean()
            .exec()
        if (!docs) {
            return res.status(400).end()
        }
        res.status(200).json({ data: docs })
    } catch (error) {
        console.error(error)
        res.status(400).end()
    }
}

export const createOne = model => async(req, res) => {
    
    try {
        const doc = await model.create({...req.body})
        if (!doc) {
            return res.status(400).end()
        }
        res.status(201).json({ data: doc })

    } catch (error) {
        console.error(error)
        res.status(400).end()
    }
}

export const updateOne = model => async(req, res) => {
    try {
        const updatedDoc = await model
            .findOneAndUpdate({_id: req.params.id},
                req.body, { new: true }
            )
            .lean()
            .exec()
        if (!updatedDoc) {
            return res.status(400).end()
        }
        res.status(200).json({ data: updatedDoc })
    } catch (error) {
        console.error(error)
        res.status(400).end()
    }
}

export const removeOne = model => async(req, res) => {

    try {
        const removed = await model
            .findOneAndRemove({ _id: req.params.id })

        if (!removed) {
            return res.status(400).send({ message: 'no se encontró' })
        }
        return res.status(200).json({ data: removed })
    } catch (error) {
        console.error(error)
        res.status(400).send({ message: 'algo pasó' })
    }
}

export const getLast = model => async(req,res) => {
    try {
        const docs = await model
            .find()
            .sort({ updatedAt: -1 })
            .limit(3)
            .lean()
            .exec()
        if (!docs) {
            return res.status(400).end()
        }
        res.status(200).json({ data: docs })
    } catch (error) {
        console.error(error)
        res.status(400).end()
    }
}

//Exportamos todas nuestras funciones en un obj crudControllers
export const crudControllers = model => ({
    removeOne: removeOne(model),
    updateOne: updateOne(model),
    getMany: getMany(model),
    getOne: getOne(model),
    createOne: createOne(model),
    getLast: getLast(model)
})