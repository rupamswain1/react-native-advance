const express = require('express');
const router = express.Router();

const { addUser,findUser, deleteUser,updateOTP } = require('../model/user/user');

router.post('/register', async (req, res) => {
  const {phone,countryCode}=req.body;
  const user=await findUser({ countryCode: countryCode, phoneNumber: phone });
  if(!user){
    const user=await addUser({ countryCode: countryCode, phoneNumber: phone });
    res.status(201).send({success:true,user})
  }
  else{
    res.status(303).send({success:false,message:'User already exists'})
  }

});

router.post('/delete',async (req,res)=>{
    const {phone,countryCode}=req.body;
    const user=await findUser({ countryCode: countryCode, phoneNumber: phone });
   
    if(user!==null){
        const deleted=await deleteUser({ countryCode: countryCode, phoneNumber: phone });
        if(deleted){
            res.status(201).send({success:true,message:"user record deleted"})
        }
        else{
            res.send({success:false,message:"user does not exist"})
        }
    }
    else{
        res.send({success:false,message:"user does not exist"})
    } 
})

router.post('/verfyRequest',async (req,res)=>{
    const {phone,countryCode}=req.body;
    const otp=Math.floor(Math.random()*8999+1000)
    //twillio code here, for place holder we will print the otp in the console
    console.log(otp);
    const user =await findUser({ countryCode: countryCode, phoneNumber: phone });
    if(user){
       const updatedUser=await updateOTP({ countryCode: countryCode, phoneNumber: phone,otp:otp })
       console.log(updatedUser)
    }
    res.send({success:true,message:'OTP sent to users number'})
})
 
module.exports = router;
