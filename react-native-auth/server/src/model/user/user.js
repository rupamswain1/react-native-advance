const User=require('./user.schema');

const findUser=async({countryCode,phoneNumber})=>{
    const user=await User.findOne({phone:phoneNumber,countryCode:countryCode})
    return user;
}


const addUser=async({countryCode,phoneNumber})=>{
    const user = await User.create({phone:phoneNumber,countryCode:countryCode});
    return user
}

const deleteUser=async({countryCode,phoneNumber})=>{
    const user=await User.findOneAndRemove({phone:phoneNumber,countryCode:countryCode});
    return user;
}

const updateOTP=async({countryCode,phoneNumber,otp})=>{
    const updatedUser=await User.findOneAndUpdate({phone:phoneNumber,countryCode:countryCode},{otp:otp,otpSentTime:new Date()});
    return updatedUser;
}

module.exports={addUser,findUser,deleteUser,updateOTP}