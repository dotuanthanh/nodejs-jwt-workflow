
const payload =(user)=>{
    return {
        username : user.username,
        password : user.password,
        roles : user.roles
    }
}
module.exports =  payload