const jwt = require('jsonwebtoken')
const JWT_SECRET = require('../routes/jwtConfig')

module.exports = (req, res, next) => {
   // Check for token
   if (!token)
      return res.status(401).json({ msg: 'No token, authorizaton denied' })

   try {
      // Verify token
      const decoded = jwt.verify(token, JWT_SECRET.secret)
      // Add user from payload
      req.user = decoded
      next()
   } catch (e) {
      console.log(e)
      res.status(400).json({ msg: 'Token is not valid' })
   }
}
