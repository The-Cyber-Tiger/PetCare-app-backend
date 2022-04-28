import mongoose from 'mongoose'

const vacunasSchema =  new mongoose.Schema({
    nombre: {
        type: String,
        default: "Vacunas"
    },
    cantidad: {
        type: Number,
        required: true
    },
    status: {
        type: Boolean,
        default: true
    }
})
const croquetasSchema =  new mongoose.Schema({
    nombre: {
        type: String,
        default: "Croquetas"
    },
    cantidad: {
        type: Number,
        required: true
    },
    status: {
        type: Boolean,
        required: true
    }
})
const antirrabicosSchema =  new mongoose.Schema({
    nombre: {
        type: String,
        default: "Antirrabicos"
    },
    cantidad: {
        type: Number,
        required: true
    },
    status: {
        type: Boolean,
        required: true
    }
})
const antibioticosSchema =  new mongoose.Schema({
    nombre: {
        type: String,
        default: "Antibioticos"
    },
    cantidad: {
        type: Number,
        required: true
    },
    status: {
        type: Boolean,
        required: true
    }
})
const galletasSchema =  new mongoose.Schema({
    nombre: {
        type: String,
        default: "Galletas"
    },
    cantidad: {
        type: Number,
        required: true
    },
    status: {
        type: Boolean,
        required: true
    }
})

const insumosSchema = new mongoose.Schema({
    vacunas: [vacunasSchema],
    croquetas: [croquetasSchema],
    antirrabicos: [antirrabicosSchema],
    antibioticos: [antibioticosSchema],
    galletas: [galletasSchema]
})

export const Insumos = mongoose.model('insumos', insumosSchema)