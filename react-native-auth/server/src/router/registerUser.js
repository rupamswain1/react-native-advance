const express = require('express');
const router = express.Router();

const { addUser } = require('../model/user/user');

router.get('/test', async (req, res) => {
  console.log('inside test');
  await addUser({ countryCode: '+91', phoneNumber: 12134567 });
  res.send('Test is a success yes');
});

module.exports = router;
