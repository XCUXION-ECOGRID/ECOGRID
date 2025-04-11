const jwt = require('jsonwebtoken')

function authMiddleware(req, res, next) {

    const authheader = req.headers['authorization']
    if (!authheader || !authheader.startsWith('Bearer ')) {
        return res.status(401).json({ message: "Unauthorized user" })
    }

    const token = authheader.split(' ')[1]


    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        req.user = decoded
        next()
    } catch {
        return res.status(401).json({ message: "Invalid token" })
    }
}

function isAdmin(req, res, next) {
    if (req.user?.role === "admin") return res.status(403).json({ message: "Access denied" })
    next()
}

module.exports = { authMiddleware, isAdmin }