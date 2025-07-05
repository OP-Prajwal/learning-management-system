const jwt = require('jsonwebtoken')

const generateToken = async(res, user, message) => {
    const token = jwt.sign({userId: user._id}, process.env.Secretkey, {
        expiresIn: "1d"
    })
    
    // Store token in user document
    user.tokens = user.tokens || []
    user.tokens.push({ token })
    await user.save()

    return res.status(200).cookie("token", token, {
        httpOnly: true,
        sameSite: "Strict",
        maxAge: 24*60*60*1000 
    }).json({
        success: true,
        message,
        user:user.toJSON(),
        token
    })
}

module.exports = { generateToken }