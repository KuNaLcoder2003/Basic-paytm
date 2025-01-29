const express = require('express')
const {User, Accounts} = require('../db')
const signup_schema = require('../inputValidation/signup')
const signin_schema = require('../inputValidation/signin')
const dotenv = require('dotenv')
const jwt = require('jsonwebtoken')
const sigin_schema = require('../inputValidation/signin')
dotenv.config();
const jwt_key = process.env.JWT_KEY
const authMiddleware = require('../middlewares/auth')

const router = express.Router();

router.post('/signup' , async(req , res)=>{
    const requestBody = req.body.user_details;
    try {
        if(!requestBody){
            return res.status(401).json({
                message : 'Bad request'
            })
        }
        const {success} = signup_schema.safeParse(requestBody)

        if(!success){
            return res.status(403).json({
                message : "Invalid Inputs"
            })
        }

        const user = await User.findOne({username : requestBody.username})

        if(user){
            return res.status(401).json({
                messsage  : 'user already exists'
            })
        }

        const new_user = new User({
            first_name : requestBody.first_name,
            last_name : requestBody.last_name,
            username : requestBody.username,
            password : requestBody.password
        })
        await new_user.save();

        const new_Account = new Accounts({
            user_id : new_user._id,
            balance : Math.floor(Math.random()*1000) + 1
        })
        await new_Account.save();
        const token = jwt.sign({id : new_user._id } , jwt_key)

        res.status(200).json({
            token : token,
            message : 'Account created successfully'
        })

        
    } catch (error) {
        res.status(500).json({
            message : 'Something went wrong'
        })
    }
})

router.post('/signin' , async(req,res)=>{
    const credentials = req.body.user_credentials;
    try {
        if(!credentials){
            return res.status(401).json({
                message : 'Bad request'
            })
        }
        const {success} = sigin_schema.safeParse(credentials);
        if(!success){
            return res.status(403).json({
                message : 'Invalid inputs'
            })
        }
        const user = await User.findOne({username : credentials.username , password : credentials.password})

        if(!user){
            return res.status(403).json({
                message : 'User does not exists'
            })
        }
        const token = jwt.sign({id : user._id} , jwt_key);
        res.status(200).json({
            token : token,
            message : 'Logged In successfully!'
        })
    } catch (error) {
        res.status(500).json({
            message : 'Something went wrong'
        })
    }
})

router.get('/' , authMiddleware , async(req,res)=>{
    const searchValue = req.body.username;

    try {

        if(!searchValue){
            return res.status(402).json({
                message : "No user found"
            })
        }

        const users = await User.find({ 
            $or : [
            {
                first_name : {
                    "$regex" : searchValue
                }
            } ,
             {
                last_name : {
                    "$regex" : searchValue
                }
            }
        ]
    })
    if(users.length == 0){
        return res.status(403).json({
            message : 'No user found'
        })
    }

    const users_array = users.map( (user) => {
        let obj = {
            first_name : user.first_name,
            last_name : user.last_name,
            userId : user._id
        }
        return obj;
    } )
    return res.status(200).json({
        users : users_array
    })
        
    } catch (error) {
        res.status(500).json({
            message : 'Something went wrong'
        })
    }
})


module.exports = router;