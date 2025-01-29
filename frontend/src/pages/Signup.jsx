import React ,  {useState} from 'react';
import { CreditCard, Mail, Lock, Eye, EyeOff, User } from 'lucide-react';
import Input from '../components/Input';

const Signup = ({setIsOnline}) => {
  const [signupData, setSignUpData] = useState({
        first_name: "",
        last_name: "",
        username: "",
        password: ""
  })
    const handleSignUp = (e)=>{
    e.preventDefault();
    try {
      fetch('http://localhost:3000/api/v1/user/signup' , {
        method : 'POST',
        body : JSON.stringify({
          user_details : signupData
        }),
        headers : {
          'Content-Type' : 'application/json'
        }
      }).then(async(reponse)=>{
        const data = await reponse.json();
        console.log(data);
        if(data.token) {
          localStorage.setItem('token' , data.token)
          console.log(data.message)
          setSignUpData({
            first_name : "",
            last_name : "",
            username : "",
            password : ""
          })
          setIsOnline(true);
        } else {
          console.log(data.message)
        }
      })
    } catch (error) {
      
    }
  }
  return (
    <div className="h-screen w-screen bg-[#faf8ff] flex">
      {/* Left Section - Form */}
      <form className="w-1/2 h-full flex flex-col justify-center items-center p-8" onSubmit={(e)=>handleSignUp(e)}>
        <div className="w-full max-w-md">
          {/* Logo */}
          <div className="flex items-center mb-12">
            <CreditCard className="h-6 w-6 text-purple-600" />
            <span className="ml-2 text-xl font-semibold text-gray-900">PaySwift</span>
          </div>

          {/* Title */}
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Create an account</h1>
          <p className="text-gray-600 mb-8">Start your journey with PaySwift today</p>

          {/* Form */}
          <form className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <Input placeHolder="First Name" value={signupData.first_name} type="text" onChange={function(e){
                  setSignUpData({
                    ...signupData,
                    first_name : e.target.value
                  })
                }} />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <Input placeHolder="Last Name" value={signupData.last_name} type="text" onChange={function(e){
                  setSignUpData({
                    ...signupData , 
                    last_name : e.target.value
                  })
                }} />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Username</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <Input placeHolder="you@example.com" value={signupData.username} type="text" onChange={function(e){
                  setSignUpData({
                    ...signupData , 
                    username : e.target.value
                  })
                }} />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <Input placeHolder="Password" value={signupData.password} type="password" onChange={function(e){
                  setSignUpData({
                    ...signupData,
                    password : e.target.value
                  })
                }} />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  <Eye className="h-5 w-5" />
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-purple-600 text-white py-3 rounded-lg hover:bg-purple-700 font-medium mt-6"
            >
              Create Account
            </button>
          </form>

          <p className="text-center mt-6 text-gray-600">
            Already have an account?
            <a href="/signin" className="text-purple-600 hover:text-purple-700 font-medium ml-1">
              Sign In
            </a>
          </p>
        </div>
      </form>

      {/* Right Section */}
      <div className="w-1/2 h-full bg-gradient-to-br from-purple-600 to-purple-800 flex flex-col justify-center items-center p-12 text-white">
        <h2 className="text-4xl font-bold mb-8">Join PaySwift Today</h2>
        <p className="text-xl text-purple-100 mb-12 text-center max-w-md">
          Join thousands of users who trust PaySwift for fast, secure, and convenient global payments.
        </p>
        <div className="grid grid-cols-2 gap-8 max-w-lg">
          <div className="text-left">
            <h3 className="font-semibold mb-2">Global Transfers</h3>
            <p className="text-purple-100 text-sm">Send money anywhere in the world instantly</p>
          </div>
          <div className="text-left">
            <h3 className="font-semibold mb-2">Zero Fees</h3>
            <p className="text-purple-100 text-sm">No hidden charges or transaction fees</p>
          </div>
          <div className="text-left">
            <h3 className="font-semibold mb-2">Secure</h3>
            <p className="text-purple-100 text-sm">Bank-level security for your peace of mind</p>
          </div>
          <div className="text-left">
            <h3 className="font-semibold mb-2">24/7 Support</h3>
            <p className="text-purple-100 text-sm">Get help anytime, anywhere</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup
