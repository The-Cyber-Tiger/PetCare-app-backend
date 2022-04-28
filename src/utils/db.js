import mongoose from 'mongoose'
import {config } from '../config/config'

export const connect = (url = config.dbUrl) => {
    return mongoose.connect(url)
}