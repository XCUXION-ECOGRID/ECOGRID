const express = require('express')
const auditRoute = require('./routes/auditRoute.js')
const solarPackage = require('./routes/solarPackageRoute.js')
const costAnalysisRoute = require('./routes/costAnalysisRoute.js')
const userPackageRoute = require('./routes/userPackageRoute.js')
const userRoute = require('./routes/userRoute.js')
const authRoute = require('./routes/authRoutes.js')
const companyBranch = require('./routes/companyBranchRoutes.js')

require('dotenv').config()

const { connectDB } = require('./config/db.js')

connectDB()

const server = express()

server.use(express.json())

//USER ROUTE
server.use("/api/v1/users", userRoute)
//authentication route
server.use("/api/v1/auth", authRoute)

//company branch route
server.use('/api/v1/company', companyBranch)

//base route
server.use("/api/v1/audit", auditRoute)
server.use("/api/v1/solarpackage", solarPackage)
server.use("/api/v1/cost-analysis", costAnalysisRoute)
server.use("/api/v1/user-package", userPackageRoute)

const PORT = 5000

server.listen(PORT, () => console.log(`Server running on PORT ${PORT}`))

//jwt verify key