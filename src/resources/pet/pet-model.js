import mongoose from 'mongoose'

// Creamos un Schema con Mongoose para definir las características de las mascotaas en nuestra base de datos.
const ownerSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: true
    },
    domicilio: {
        type: String,
        required: true
    },
    telefono: {
        type: Number,
        required: true
    },
    email: {
        type: String,
        required: true
    }

})

const petSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: true
    },
    raza: {
        type: String,
        required: true
    },
    edad: {
        type: String,
        required: true
    },
    especie: {
        type: String,
        required: true
    },
    sexo: {
        type: String,
        required: true
    },
    descripcion: {
        type: String,
        required: true
    },
    owner: [ownerSchema]

}, {timestamps: true} )

export const Pet = mongoose.model('pets', petSchema)
    /*  Breve explicación:
        Recordemos que MongoDB es una DB muy flexible y nos otorga total libertad en la data que almacenamos.
        Para tener un orden y control sobre como almacenamos los datos Mongoose nos permite la creación de Schemas.
        
        -Schema: Define reglas sobre los documentos(data) en MongoDB, añadiendo forma y estructura a nuestra data.
        -Model: Es el constructor para crear documentos(data) en base al Schema definido.
     
    */