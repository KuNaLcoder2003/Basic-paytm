const express = require('express')
const authMiddleware = require('../middlewares/auth');
const { default: mongoose } = require('mongoose');
const { Accounts } = require('../db');

const router = express.Router();

router.post('/', authMiddleware, async (req, res) => {
    const session = await mongoose.startSession();
    session.startTransaction();
    try {
        const { to, amount } = req.body.transaction_deatils;
        const fromId = req.id;

        const fromAccount = await Accounts.findOne({ user_id: fromId }).session(session)

        if (!fromAccount || fromAccount.balance < amount) {
            await session.abortTransaction();
            return res.status(402).json({
                message: 'Insuficient Balance'
            })
        }

        const toAccount = await Accounts.findOne({ user_id: to }).session(session)

        if (!toAccount) {
            await session.abortTransaction();
            return res.status(402).json({
                message: "Recipient's bank account not found"
            })
        }
        await Accounts.findByIdAndUpdate({ _id: fromAccount._id }, { $inc: { balance: -amount } }).session(session);
        await Accounts.findByIdAndUpdate({ _id: toAccount._id }, { $inc: { balance: amount } }).session(session);
        res.status(200).json({
            success: true,
            message: `Sent ${amount}`
        })
    } catch (error) {
        await session.abortTransaction();
        res.status(500).json({
            message : 'Something went wrong'
        })
    }
    await session.commitTransaction();
    console.log('done')

})


module.exports = router