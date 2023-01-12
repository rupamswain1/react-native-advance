const express = require('express');
const app = express();
const mongoose=require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

const userRouter = require('./src/router/registerUser');

app.use(express.json());

app.use('/users', userRouter);

mongoose.connect(process.env.mongoDBURL,()=>{
    console.log('connection success')
    app.listen(3000, () => {
        console.log('server started on port 3000');
    });
})

