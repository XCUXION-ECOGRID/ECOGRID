const express = require('express')
const auditRoute = require('./routes/auditRoute')
require('dotenv').config()

const { connectDB } = require('./config/db.js')

connectDB()

const server = express()

server.use(express.json())

//base route
server.use("/api/audit", auditRoute)

const PORT = 5000

server.listen(PORT, () => console.log(`Server running on PORT ${PORT}`))