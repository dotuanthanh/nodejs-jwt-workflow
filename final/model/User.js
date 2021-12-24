const mongoose = require('mongoose')
const bcrypt = require('bcryptjs');
const UserSchema = mongoose.Schema({
 username:{
     type:String,
     require : [true,'username is required'],
     minlength: 3,
     maxlength: 10,
 },
 password :{
     type :String ,
     require : [true,'password is required'] ,
     minlength: 3,
     maxlength: 10,
 },
 roles:{
     type : String ,
     enum :['admin','user'],
     require :[true,'role is required'],
     default : 'user'
 }
},{collection : 'User'})

UserSchema.pre('save', async function(){
    // if (!this.isModified('password')) return;
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
})
UserSchema.methods.comparePassword = async function (canditatePassword) {
    const isMatch = await bcrypt.compare(canditatePassword, this.password);
    return isMatch;
  };
  
module.exports = mongoose.model('User', UserSchema);