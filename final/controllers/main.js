// register or login ---> client retrive a token --> this token is used to access some authorticate resource
// setup authentication so only the request with JWT can access the dasboard
// i set api helloadmin need authen and authorized
const User = require('../model/User')
const jwt = require('jsonwebtoken')
const { BadRequestError, CustomAPIError } = require('../errors')
const { createToken, attachCookiesToResponse } = require('../util')

const login = async (req, res) => {
  const { username, password } = req.body


  if (!username || !password) {
    throw new BadRequestError('Please provide email and password')
  }


  const token = jwt.sign({ id, username }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  })

  res.status(200).json({ msg: 'user created', token })
}
const register = async(req,res)=>{
  const {username , password ,roles} = req.body
 const findUser = User.find({username : username}) 
 if(findUser){
    new BadRequestError('Username is already exist')
 }
 User.create({username: username , roles : roles , password : password})
 try {
  const token = createToken({username,roles})
  attachCookiesToResponse(token)
 } catch (error) {
   
 }
  User.save()
}

const dashboard = async (req, res) => {

  res.status(200).json({
    msg: `Hello, ${req.user.username}`,
    secret: `User or admin can access this resource`,
  })
}
const admin = (req, res) =>{
  res.status(200).json({
    msg :"Hello admin , only admin can access this resource"
  })
}

module.exports = {
  login,
  dashboard,
}
