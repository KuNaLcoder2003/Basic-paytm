const mongoose = require('mongoose')
const dotenv = require('dotenv')

dotenv.config();

mongoose.connect(process.env.MONGO_URL).then(()=>{
    console.log('Connected to MongoDB')
}).catch(err => {
    console.log(err);
})

const User_Schema = new mongoose.Schema({
    first_name : {
        required : true,
        unique : false,
        type : String,
    },
    last_name : {
        required : true,
        unique : false,
        type : String,
    },
    username : {
        required : true,
        unique : true,
        type : String,
    },
    password : {
        required : true,
        type : String,
    }
},{timestamps : true})

const Account_Scehma = new mongoose.Schema({
    user_id : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'paytm_users'
    },
    balance : {
        type : Number ,
        required : true
    }
},{timestamps : true})


const User = mongoose.model('paytm_users' , User_Schema);
const Accounts = mongoose.model('paytm_accounts' , Account_Scehma);

module.exports = {
    User,
    Accounts
}

