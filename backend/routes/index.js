const express = require('express')
const userRouter = require('./user');
const accountsRouter = require('./account')
const transactionsRouter = require('./transactions')

const router = express.Router()

router.use('/user', userRouter);
router.use('/account' , accountsRouter);
router.use('/transaction' , transactionsRouter)
module.exports = router;