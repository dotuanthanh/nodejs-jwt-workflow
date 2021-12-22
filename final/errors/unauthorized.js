 const CustomAPIError = require('./custom-error')
 const { StatusCodes } = require('http-status-codes')
 class Unauthorized extends CustomAPIError{
     constructor(messenger){
         super(messenger)
         this.statusCodes = StatusCodes.FORBIDDEN
     }

 }
module.exports = Unauthorized
