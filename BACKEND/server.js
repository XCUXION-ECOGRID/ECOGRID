const express = require('express')
const auditRoute = require('./routes/auditRoute.js')
const solarPackage = require('./routes/solarPackageRoute.js')
const costAnalysisRoute = require('./routes/costAnalysisRoute.js')
require('dotenv').config()

const { connectDB } = require('./config/db.js')

connectDB()

const server = express()

server.use(express.json())

//base route
server.use("/api/v1/audit", auditRoute)
server.use("/api/v1/solarpackage", solarPackage)
server.use("/api/v1/cost-analysis", costAnalysisRoute)

const PORT = 5000

server.listen(PORT, () => console.log(`Server running on PORT ${PORT}`))