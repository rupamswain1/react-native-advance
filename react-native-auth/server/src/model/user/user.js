const User=require('./user.schema');

const addUser=async({countryCode,phoneNumber})=>{
    console.log(await User.create({phone:phoneNumber,countryCode:countryCode}))
    const user = await User.findOne({phone:phoneNumber,countryCode:countryCode});
    console.log(user)
}

module.exports={addUser}