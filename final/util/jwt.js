const jwt = require('jsonwebtoken')
const createToken = ({payload})=>{
    const token = jwt.sign(payload,process.env.JWT_SECRET,{
        expiresIn: process.env.JWT_LIFETIME,
    })
    return token

}
const isTokenValid = ({token})=>{
    decode = jwt.verify(token,process.env.JWT_SECRET)
    return decode
}
const attachCookiesToResponse = ({ res, user }) => {
    const token = createJWT({ payload: user });
  
    const oneHour = 1000 * 60 * 60 ;
  
    res.cookie('token', token, {
      httpOnly: true,
      expires: new Date(Date.now() + oneHour),
      secure: process.env.NODE_ENV === 'production',
      signed: true,
    });
  };
 

module.exports = {
    isTokenValid,
    createToken,
    attachCookiesToResponse
}