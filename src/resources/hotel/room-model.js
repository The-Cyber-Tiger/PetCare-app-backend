import mongoose from 'mongoose'

const roomSchema = new mongoose.Schema({
    numero: {
        type: Number,
        required: true
    },
    huesped: {
        type: String
    },
    raza: {
        type: String
    },
    fecha: {
        type: Array
    },
    indicaciones: {
        type: String
    },
    status: {
        type: Boolean,
        required: true,
    }
})

export const Room = mongoose.model('hotel', roomSchema)