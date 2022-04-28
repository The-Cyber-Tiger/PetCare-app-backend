// require('dotenv').config()

export const config = {
    dbUrl: `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.9sp3u.mongodb.net/petcare-app?retryWrites=true&w=majority`,
    serverPORT: '8000',
    secrets: {
        jwt: process.env.JWT_SECRET,
        jwtExp: '1d'
    },
}
// MUy6xo5hjgEnfO7s