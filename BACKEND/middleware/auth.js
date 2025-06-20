const jwt = require('jsonwebtoken')

function authMiddleware(req, res, next) {
    const authHeader = req.headers['authorization']

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ message: "Unauthorized user" })
    }

    const token = authHeader.split(' ')[1]

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)

        if(!decoded || !decoded.userId || !decoded.role){
            return res.status(403).json({message: 'Invalid token payload'})
        }

        req.user = {id: decoded.userId, email: decoded.email, role: decoded.role}
        next()
    } catch(error) {
        return res.status(401).json({ message: "Invalid token", error })
    }
}


module.exports = { authMiddleware}