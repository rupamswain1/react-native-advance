

const getOTP=()=>{
    const otp = Math.floor(Math.random() * 8999 + 1000);
    return otp
}

module.exports={getOTP}