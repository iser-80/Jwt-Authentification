const jwt = require('jsonwebtoken')

const generateToken = (res, userId) => {
    const token = jwt.sign({userId}, process.env.JWT_SECRET, {expiresIn: '4h'})

    res.cookie('jwt', token, {
        httponly: true, 
        secure: false, 
        sameSite: 'strict',
        maxAge: 1000 * 60 * 60 * 4
    })
}

module.exports = generateToken