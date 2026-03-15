const jwt = require('jsonwebtoken')

const authMiddleware = (req, res, next) => {
    const authorization = req.get('authorization')

    if (!authorization || !authorization.startsWith('Bearer ')) {
        return res.status(401).json({ error: 'Token missing' })
    }

    const token = authorization.replace('Bearer ', '')

    try {
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET)
        req.userId = decodedToken.id
        next()
    } catch(err) {
        return res.status(401).json({ error: 'Token invalid' })
    }
}

module.exports = authMiddleware