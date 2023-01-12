const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  countryCode: String,
  phone: {
    type: Number,
    maxLength:10
  },
  authenticated:{
   type:Boolean,
   default:false
  },
  otp:{
   type:Number,
   default:null
  },
  otpSentTime:{
   type:Date,
   default:null
  }
});

module.exports = mongoose.model('User', userSchema);
