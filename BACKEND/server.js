const express = require('express')
const auditRoute = require('./routes/auditRoute.js')
const solarPackage = require('./routes/solarPackageRoute.js')
const costAnalysisRoute = require('./routes/costAnalysisRoute.js')
const userPackageRoute = require('./routes/userPackageRoute.js')
const userRoute = require('./routes/userRoute.js')
const authRoute = require('./routes/authRoutes.js')
const companyBranch = require('./routes/companyBranchRoutes.js')

const swaggerjsdoc = require("swagger-jsdoc")
const swaggerui = require("swagger-ui-express")

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

const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "ECOGRID - Solar Energy Management API",
            version: "1.0.0",
            description: "API for managing solar energy packages, user data, and cost analysis. This API allows users to view solar packages, manage their accounts, and perform cost analysis for solar energy solutions and energy audits. It also includes endpoints for user authentication and company branch management.",
        },
        servers: [
            {
                url: "http://localhost:5000",
            },
        ],
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: "http",
                    scheme: "bearer",
                    bearerFormat: "JWT",
                }
            }
        },
        security: [
            {
                bearerAuth: [],
            },
        ], // Path to the API docs
    },
    apis: ["./routes/*.js", "./controllers/*.js"],
}

const spacs = swaggerjsdoc(options)

server.use(
    "/api/v1/docs",
    swaggerui.serve,
    swaggerui.setup(spacs)
)

const PORT = 5000

server.listen(PORT, () => console.log(`Server running on PORT ${PORT}`))

//jwt verify key