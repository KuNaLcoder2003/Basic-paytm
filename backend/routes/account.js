const express = require('express')
const authMiddleware = require('../middlewares/auth');
const { Accounts } = require('../db');
const router = express.Router();

router.get('/balance' , authMiddleware , async(req  , res)=>{
    const userId = req.id;
    try {
        const account = await Accounts.findOne({user_id : userId})

        if(!account){
            return res.status(404).json({
                valid : false,
                message : 'Account not found'
            })
        }

        let message;
        if(account.balance < 100){
            message = "Low balance please add more funds to avoid low balance charges!"
        }
        else {
            message = "..."
        }

        res.status(200).json({
            balance : account.balance,
            message 
        })
    } catch (error) {
        res.status(500).json({
            message : "Something went wrong"
        })
    }
})


module.exports = router