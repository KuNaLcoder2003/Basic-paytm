import React, { useEffect, useState } from 'react';
import { use } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const PaymentSuccess = () => {

  const navigate = useNavigate();

    const params = useLocation();
    const [toUser , setToUser] = useState("");
    const [amount , setAmount] = useState("");
    const [transactionId, setTransactionId] = useState("");
    const [date , setDate] = useState("");
    useEffect(()=>{
        const id = params.pathname.split('/').at(-1)
        const token = localStorage.getItem('token');
        try {
            fetch('http://localhost:3000/api/v1/transaction/' + id , {
                method : 'GET',
                headers : {
                    'Content-Type' : 'application/json',
                    authorization : token
                }
            }).then(async(response)=>{
                const data = await response.json();
                if(data.transaction){
                    setToUser(`${data.transaction.to_account.first_name} ${data.transaction.to_account.last_name}`)
                    setTransactionId(data.transaction.transactionId);
                    setAmount(data.transaction.amount)
                    setDate(data.transaction.date)
                }
            })
        } catch (error) {
            
        }
    } ,[])
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-lg max-w-md w-full p-8 text-center">
        {/* Success Icon */}
        <div className="mx-auto h-16 w-16 bg-green-100 rounded-full flex items-center justify-center mb-6">
          <svg 
            className="h-10 w-10 text-green-500" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth="2" 
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>

        {/* Success Message */}
        <h1 className="text-2xl font-bold text-gray-800 mb-3">
          Payment Successful!
        </h1>
        <p className="text-gray-600 mb-8">
          Your payment of <span className="font-semibold">{`$ ${amount}`}</span> to {toUser} has been processed successfully
        </p>

        {/* Transaction Details */}
        <div className="bg-gray-50 rounded-lg p-6 mb-8">
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-600">Transaction ID</span>
              <span className="text-gray-900 font-medium">{transactionId}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Date</span>
              <span className="text-gray-900 font-medium">{date}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Payment Method</span>
              <span className="text-gray-900 font-medium">Wallet</span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3">
          <button className="w-full bg-purple-600 text-white py-3 rounded-lg font-medium hover:bg-purple-700">
            Download Receipt
          </button>
          <button onClick={()=>navigate('/dashboard')} className="w-full bg-gray-100 text-gray-700 py-3 rounded-lg font-medium hover:bg-gray-200">
            Back to Home
          </button>
        </div>

        {/* Support Link */}
        <div className="mt-8 text-sm text-gray-500">
          Having trouble? <a href="#" className="text-purple-600 hover:text-purple-700">Contact support</a>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccess;