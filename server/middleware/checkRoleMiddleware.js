const jwt = require('jsonwebtoken')
const ApiError = require('../apiError/apiError')

module.exports = function (role){
    return function (req, res, next){
        if(req.method === 'OPTIONS'){
            next()
        }
        try {
            const token = req.headers.authorization.split(' ')[1]
            if(!token){
                return next(ApiError.unauthorized('you have to log in'))
            }
            const decoded = jwt.verify(token, process.env.SECRET_KEY)
            if(decoded.role!==role){
                return next(ApiError.forbidden('you have not access'))
            }
            req.user = decoded
            next()
        }catch (e) {
            return next(ApiError.unauthorized('you have to log in'))
        }
    }
}