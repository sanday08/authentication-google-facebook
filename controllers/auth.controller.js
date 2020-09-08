const User=require('../models/auth.model')
const expressJwt = require('express-jwt');
const _ = require('lodash')
const {OAuth2Client}=require('google-auth-library');
const fetch=require('node-fetch');
const {validationResult} =require('express-validator')
const jwt=require('jsonwebtoken');
//Custome error handler to get useful error from database error
const {errorHandler}=require('../helpers/dbErrorHandling')  
//send Email using sendgrid we can also use nodemail also
const sgMail=require('@sendgrid/mail');
sgMail.setApiKey(process.env.MAIL_KEY);

exports.registerController=(req,res)=>{
    const{name,email,password}=req.body;
    const errors=validationResult(req);

    //Validation to req,body we will create custome validation in seconds
    if(!errors.isEmpty()){
        const firstError=errors.array().map(error=>error.message)[0];
        return res.status(422).json({errors:firstError})
    }else{
        User.findOne({email}).exec((err,user)=>{
            //if user exists
            if(user){   
                return res.status(400).json({errors:"Email is taken"});
            }
        })
        //Genrate Token 
        const token=jwt.sign({
            name,email,password
        },process.env.JWT_ACCOUNT_ACTIVATION,{
            expiresIn:'15m'
        })
        //Email data sending
        const emailData={
            from:process.env.EMAIL_FROM,
            to:to,
            subject:"Account Activation Link",
            html:`<h1>Please Click to link to activate</h1>
            <p>${process.env.CLIENT_URL}/users/activate/${token}</p>
            <hr/>
            <p>This email contains sensitive info</p>
            <p>${process.env.CLIENT_URL}</p>
            `
            

        }
    }
}