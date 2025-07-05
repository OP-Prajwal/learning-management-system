const jwt = require('jsonwebtoken')
const { User } = require('../models/user.model')

const auth = async (req, res, next) => {
    try {
        const token = req.cookies.token
        
        if (!token) {
            return res.status(401).json({
                success: false,
                message: "Please login first"
            })
        }

        const decoded = await jwt.verify(token, process.env.Secretkey)
        const user = await User.findOne({ 
            _id: decoded.userId,
            'tokens.token': token 
        })

        if (!user) {
            return res.status(401).json({
                success: false,
                message: "Authentication failed"
            })
        }

       req.id=user._id 
        next()

    } catch (error) {
        res.status(401).json({
            success: false,
            message: "Authentication failed"
        })
    }
}

module.exports ={
    auth
}
