const express = require('express');
const router = express.Router();

const { getOTP } = require('../utils/otpGenerator');

const {
  addUser,
  findUser,
  deleteUser,
  updateOTP,
} = require('../model/user/user');

router.post('/register', async (req, res) => {
  const { phone, countryCode } = req.body;
  if (phone.length < 10) {
    res.send({
      success: false,
      message: 'Phone Number should be of 10 Digits',
    });
  } else {
    const user = await findUser({
      countryCode: countryCode,
      phoneNumber: phone,
    });
    if (!user) {
      const user = await addUser({
        countryCode: countryCode,
        phoneNumber: phone,
      });
      res.status(201).send({ success: true, user });
    } else {
      res.status(303).send({ success: false, message: 'User already exists' });
    }
  }
});

router.post('/delete', async (req, res) => {
  const { phone, countryCode } = req.body;
  const user = await findUser({ countryCode: countryCode, phoneNumber: phone });

  if (user !== null) {
    const deleted = await deleteUser({
      countryCode: countryCode,
      phoneNumber: phone,
    });
    if (deleted) {
      res.status(201).send({ success: true, message: 'user record deleted' });
    } else {
      res.send({ success: false, message: 'user does not exist' });
    }
  } else {
    res.send({ success: false, message: 'user does not exist' });
  }
});

router.post('/verfyRequest', async (req, res) => {
  const { phone, countryCode } = req.body;

  if (phone.length < 10) {
    res.send({
      success: false,
      message: 'Phone Number should be of 10 Digits',
    });
  } else {
    const otp = getOTP();
    //twillio code here, for place holder we will print the otp in the console
    console.log('***', otp);
    const user = await findUser({
      countryCode: countryCode,
      phoneNumber: phone,
    });
    if (user) {
      const updatedUser = await updateOTP({
        countryCode: countryCode,
        phoneNumber: phone,
        otp: otp,
      });
      console.log(updatedUser);
    } else {
      const user = await addUser({
        countryCode: countryCode,
        phoneNumber: phone,
      });
      const updatedUser = await updateOTP({
        countryCode: countryCode,
        phoneNumber: phone,
        otp: otp,
      });
    }
    res.send({ success: true, message: 'OTP sent to users number' });
  }
});

router.post('/validateOtp', async (req, res) => {
  const { phone, countryCode, otp } = req.body;
  const user = await findUser({ countryCode, phoneNumber: phone });
  if (user) {
    const diffInTime = Math.floor((new Date() - user.otpSentTime) / 1000);

    if (otp.toString() === user.otp.toString()) {
      if (diffInTime > 120) {
        res.send({
          success: false,
          message: 'OTP Expired, PLease click on resend OTP',
        });
      } else {
        //just replace the otp in db, no need to send it to the user
        const otp = getOTP();
        const updatedUser = await updateOTP({
          countryCode: countryCode,
          phoneNumber: phone,
          otp: otp,
        });
        res.send({ success: true, message: 'OTP is validated' });
      }
    } else {
      res.send({ success: false, message: 'otp is invalid' });
    }
  }
});

module.exports = router;
