const mongoose = require('mongoose')

const database = async () => {
    try {
        const connection = await mongoose.connect(process.env.Mongo)
        console.log(`Database connected: ${connection.connection.host}`)
    } catch (error) {
        console.error("Error connecting to database:", error.message)
        process.exit(1)
    }
}

module.exports = { database }