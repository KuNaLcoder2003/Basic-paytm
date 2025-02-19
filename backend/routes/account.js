const express = require('express')
const authMiddleware = require('../middlewares/auth');
const { Accounts, Transactions } = require('../db');
const router = express.Router();

router.get('/balance', authMiddleware, async (req, res) => {
    const userId = req.id;
    try {
        const account = await Accounts.findOne({ user_id: userId })

        if (!account) {
            return res.status(404).json({
                valid: false,
                message: 'Account not found'
            })
        }

        let message;
        if (account.balance < 100) {
            message = "Low balance please add more funds to avoid low balance charges!"
        }
        else {
            message = "..."
        }

        res.status(200).json({
            balance: account.balance,
            message
        })
    } catch (error) {
        res.status(500).json({
            message: "Something went wrong"
        })
    }
})

router.get('/history', authMiddleware, async (req, res) => {

    const id = req.id;
    // console.log(id);

    try {
        // console.log('hello')
        const transactions = await Transactions.find({
            $or: [
                {
                    from_account_id: id
                },
                {
                    to_account_id: id
                }
            ]
        }).populate('from_account_id').populate('to_account_id')

        // console.log('two')

        if (transactions.length == 0) {
            return res.status(403).json({
                message: 'No transactions yet'
            })
        }
        // console.log('three')
        let arr = transactions.map((transaction) => {
            let obj = {};
            if (transaction.to_account_id.toString().includes(id)) {
                obj = {
                    senders_name: `${transaction.from_account_id.first_name} ${transaction.from_account_id.last_name}`,
                    amount: transaction.amount,
                    date: transaction.createdAt.toDateString(),
                    recieved: true
                }
            }
            else {
                obj = {
                    receivers_name: `${transaction.to_account_id.first_name} ${transaction.to_account_id.last_name}`,
                    amount: transaction.amount,
                    date: transaction.createdAt.toDateString(),
                    recieved: false
                }

            }
            return obj;
        })
        // console.log('four')
        arr = arr.reverse()
        res.status(200).json({
            history: arr
        })
        // console.log('five')
    } catch (error) {
        // console.log(error);
        res.status(500).json({
            message: "Something went wrong"
        })
    }
})

router.get('/totalSpent' , authMiddleware , async(req,res)=>{
    const id = req.id;
    try {
        const transactions = await Transactions.find({from_account_id : id})
        if(transactions.length == 0){
            return res.status(402).json({
                message : 'No transactions Found',
                total_spent : 0
            })
        }
        const all_trans = await Transactions.find({
            $or : [{from_account_id : id} , {to_account_id : id}]
        })

        const amnt = all_trans.reduce((acc , curr) => acc + curr.amount , 0)

        const total_amount = transactions.reduce((acc , curr) => acc + curr.amount , 0);
        const perecentage = (amnt - total_amount)/amnt * 100
        res.status(200).json({
            total_spent : total_amount,
            perecentage : perecentage.toFixed(2)
        })
    } catch (error) {
        res.status(500).json({
            message : 'Something went wrong'
        })
    }
})
router.get('/totalRecieved' , authMiddleware , async(req,res)=>{
    const id = req.id;
    try {
        const transactions = await Transactions.find({to_account_id : id})
        const all_trans = await Transactions.find({
            $or : [{from_account_id : id} , {to_account_id : id}]
        })

        const amnt = all_trans.reduce((acc , curr) => acc + curr.amount , 0)

        

        if(transactions.length == 0){
            return res.status(402).json({
                message : 'No transactions found',
                total_recieved : 0
            })
        }

        const total_amount = transactions.reduce((acc , curr)=> acc + curr.amount , 0)
        const perecentage = (amnt - total_amount)/amnt * 100

        res.status(200).json({
            total_recieved : total_amount,
            perecentage : perecentage.toFixed(2)
        })
    } catch (error) {
        
    }
})


module.exports = router