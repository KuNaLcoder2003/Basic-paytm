import React, { useEffect, useState } from 'react';
import { CreditCard, User, Send } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const PaymentPage = () => {

  const [full_name , setFullName] = useState("");
  const [username  , setUsername] = useState("");
  const navigate = useNavigate();

  const [loading , setLoading] = useState(false);
  const [amount, setAmount] = useState("");
  const params = useLocation();

  useEffect(() => {
    const userId = params.pathname.split('/').at(-1);
    setLoading(true);

    try {
      const token = localStorage.getItem('token');
      fetch('http://localhost:3000/api/v1/user/' + userId, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          authorization: token
        }
      }).then(async(response)=>{
        const data  = await response.json();
        if(data.user || response.ok){
          setFullName(data.user.full_name);
          setUsername(data.user.username);

          setLoading(false)
        }
        else {
          setFullName("");
          setUsername("");
          setLoading(false);
          toast.error(data.message);
        }
      })
    } catch (error) {
      toast.error(error);
    }

  }, [])
  function handlePayment() {
    const toId = params.pathname.split('/').at(-1);
    const token = localStorage.getItem('token')
    try {
      fetch('http://localhost:3000/api/v1/transaction' , {
        method : 'POST',
        headers : {
          'Content-Type' : 'application/json',
          authorization : token
        },
        body : JSON.stringify( {
          transaction_deatils: {
            to : toId,
            amount : amount
          }
        })
      }).then(async(response)=>{
        const data = await response.json();
        if(data.success){
          navigate(`/${data.transactioN_id}`)
        }
        else {
          toast.error('Transaction failed')
        }
      })
    } catch (error) {
      toast.error(error);
    }
  }
  return (
    <div className="min-h-screen bg-white p-6">
      <div className="max-w-md mx-auto bg-white rounded-xl shadow-lg">
        <div className="p-6">
          {/* Header */}
          <div className="flex items-center space-x-4 mb-8">
            <div className="h-12 w-12 rounded-full bg-purple-100 flex items-center justify-center">
              <User className="h-6 w-6 text-purple-600" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-800">{full_name}</h2>
              <p className="text-gray-500">@{username}</p>
            </div>
          </div>

          {/* Amount Input */}
          <div className="mb-8">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Amount
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">$</span>
              <input
                type="number"
                value={amount}
                onChange={(e)=>{setAmount(e.target.value)}}
                className="w-full pl-8 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                placeholder="0.00"
              />
            </div>
          </div>

          {/* Payment Method */}
          {/* <div className="mb-8">
            <h3 className="text-sm font-medium text-gray-700 mb-4">Payment Method</h3>
            <div className="space-y-3">
              <div className="flex items-center p-4 border border-gray-200 rounded-lg hover:border-purple-500 cursor-pointer">
                <CreditCard className="h-6 w-6 text-purple-600 mr-3" />
                <div>
                  <p className="font-medium text-gray-800">•••• 4242</p>
                  <p className="text-sm text-gray-500">Expires 12/24</p>
                </div>
              </div>
              <button className="w-full text-purple-600 text-sm font-medium hover:text-purple-700">
                + Add new card
              </button>
            </div>
          </div> */}

          {/* Note Input */}
          <div className="mb-8">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Add a note (optional)
            </label>
            <input
              type="text"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              placeholder="What's this payment for?"
            />
          </div>

          {/* Payment Button */}
          <button onClick={handlePayment} className="w-full bg-purple-600 text-white py-4 rounded-lg font-medium hover:bg-purple-700 flex items-center justify-center">
            <Send className="h-5 w-5 mr-2" />
            Send Payment
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;