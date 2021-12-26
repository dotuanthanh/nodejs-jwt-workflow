 const CustomAPIError = require('./custom-error')
 const { StatusCodes } = require('http-status-codes')
 class Unauthorized extends CustomAPIError{
     constructor(messenge){
         super(messenge)
         this.statusCode = StatusCodes.FORBIDDEN
     }

 }
module.exports = Unauthorized
