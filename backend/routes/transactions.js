const express = require('express')
const authMiddleware = require('../middlewares/auth');
const { default: mongoose } = require('mongoose');
const { Accounts, Transactions } = require('../db');

const router = express.Router();

router.post('/', authMiddleware, async (req, res) => {
    const session = await mongoose.startSession();
    session.startTransaction();

    try {

        const { to, amount } = req.body.transaction_deatils;
        const fromId = req.id;



        const fromAccount = await Accounts.findOne({ user_id: fromId }).session(session)
        console.log('txn two')


        if (!fromAccount || fromAccount.balance < amount) {
            console.log('txn three')
            await session.abortTransaction();
            return res.status(402).json({
                message: 'Insuficient Balance'
            })
        }
        console.log('txn 4')


        const toAccount = await Accounts.findOne({ user_id: to }).session(session)
        console.log('txn 5')

        if (!toAccount) {
            console.log('Hi txn 6');
            await session.abortTransaction();
            return res.status(402).json({
                message: "Recipient's bank account not found"
            })
        }
        console.log('txn 7')

        await Accounts.findByIdAndUpdate({ _id: fromAccount._id }, { $inc: { balance: -amount } }).session(session);
        console.log('txn 8')
        await Accounts.findByIdAndUpdate({ _id: toAccount._id }, { $inc: { balance: amount } }).session(session);
        console.log('txn 9')

        const new_transaction = new Transactions({
            from_account_id: fromId,
            to_account_id: to,
            amount: amount
        })
        console.log('txn 10')

        // (await new_transaction.save()).$session(session)
        await new_transaction.save({ session })
        console.log('txn 11')

        res.status(200).json({
            success: true,
            message: `Sent ${amount}`,
            transactioN_id: new_transaction._id
        })
        console.log('txn 12')

        await session.commitTransaction();
    } catch (error) {
        console.log(error);
        await session.abortTransaction();
        res.status(500).json({
            message: 'Something went wrong'
        })
    }


})

router.get('/:id', authMiddleware, async (req, res) => {
    const id = req.params.id

    try {
        if (!id) {
            return res.status(401).json({
                message: "Bad request"
            })
        }
        const transaction = await Transactions.findOne({ _id: id }).populate('from_account_id').populate('to_account_id')
        if (!transaction) {
            return res.status(404).json({
                message: "No transactions yet"
            })
        }
        let transaction_obj = {
            transactionId: transaction.id,
            to_account: transaction.to_account_id,
            from_account: transaction.from_account_id,
            amount: transaction.amount,
            date: transaction.createdAt.toDateString()
        }
        res.status(200).json({
            transaction: transaction_obj
        })
    } catch (error) {
        res.status(500).json({
            message: "Something went wrong"
        })

    }
})

router.get('/history', async (req, res) => {
    console.log('hiiiiiii')
    const id = "679141597cd9a34579edee2b";
    // console.log(id);

    try {
        console.log('hello')
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

        console.log('two')

        if (transactions.length == 0) {
            return res.status(403).json({
                message: 'No transactions yet'
            })
        }
        console.log('three')
        let arr = transactions.map((transaction) => {
            if (id / this.toString() == transaction.to_account_id.toString()) {
                let obj = {
                    senders_name: `${transaction.from_account_id.first_name} ${transaction.from_account_id.lat_name}`,
                    amount: transaction.amount,
                    date: transaction.createdAt,
                    recieved: true
                }
                return obj;
            }
            else {
                let obj = {
                    receivers_name: `${transaction.to_account_id.first_name} ${transaction.to_account_id.lat_name}`,
                    amount: transaction.amount,
                    date: transaction.createdAt,
                    recieved: false
                }
                return obj;
            }
        })
        console.log('four')
        res.status(200).json({
            history: arr
        })
        console.log('five')
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Something went wrong"
        })
    }
    console.log('hellojhehfi')
})


module.exports = router