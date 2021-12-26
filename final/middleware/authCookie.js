//I write  how can i get toke from cookie 

const CustomError = require('../errors');
const {isTokenValid} = require('../util')
const authen = (req , res, next) =>{

const token = req.signedCookies.token;

if(!token){
    throw new CustomError.UnauthenticatedError('Token is invalid ne')
}
try {
    const {id, username, roles} = isTokenValid(token)
    //req-res life circle , next middleware receive new req object that have information of user
     req.user = {id, username, roles}
     next()
} catch (error) {
    throw new CustomError.UnauthenticatedError('authen invalid')
}}

const authorized = (...roles)=>{
 return (req , res, next)=>{
     console.log(roles)
   if(!roles.includes(req.body.roles)){
       throw new CustomError.Unauthorized('you do not have permission to access this reousrce')
   }
   next()
 }
}
module.exports= {
    authen,
    authorized
}