import React, { useState } from 'react';
import { CreditCard, Mail, Lock, Eye, EyeOff, User } from 'lucide-react';
import Input from '../components/Input';
const Signin = () => {
    const [credentials, setCredentials] = useState({
        username: "",
        password: ""
    })

    function handleSignIn(e) {
        e.preventDefault();
        try {
            fetch('http://localhost:3000/api/v1/user/signin', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    user_credentials: credentials
                })
            }).then(async (response) => {
                const data = await response.json()
                console.log(data);
                if (data.token) {
                    localStorage.setItem('token', data.token)
                    setIsOnline(true);
                }
            })
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <div className="h-screen w-screen bg-[#faf8ff] flex">
            {/* Left Section - Form */}
            <form className="w-1/2 h-full flex flex-col justify-center items-center p-8" onSubmit={(e)=>handleSignIn(e)}>
                <div className="w-full max-w-md">
                    {/* Logo */}
                    <div className="flex items-center mb-12">
                        <CreditCard className="h-6 w-6 text-purple-600" />
                        <span className="ml-2 text-xl font-semibold text-gray-900">PaySwift</span>
                    </div>

                    {/* Title */}
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome back</h1>
                    <p className="text-gray-600 mb-8">Enter your details to access your account</p>

                    {/* Form */}
                    <form className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Username</label>
                            <div className="relative">
                                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                                <Input type="text" value={credentials.username} placeHolder="Email" onChange={function(e){
                                    setCredentials({
                                        ...credentials,
                                        username : e.target.value
                                    })
                                }} />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                            <div className="relative">
                                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                                <Input type="password" value={credentials.password} placeHolder="Email" onChange={function(e){
                                    setCredentials({
                                        ...credentials,
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

                        <div className="flex items-center justify-between">
                            <div className="flex items-center">
                                <input
                                    type="checkbox"
                                    className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
                                />
                                <label className="ml-2 block text-sm text-gray-700">Remember me</label>
                            </div>
                            <a href="#" className="text-sm text-purple-600 hover:text-purple-700">Forgot password?</a>
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-purple-600 text-white py-3 rounded-lg hover:bg-purple-700 font-medium mt-6"
                        >
                            Sign In
                        </button>
                    </form>

                    <p className="text-center mt-6 text-gray-600">
                        Don't have an account?
                        <a href="/signup" className="text-purple-600 hover:text-purple-700 font-medium ml-1">
                            Sign Up
                        </a>
                    </p>
                </div>
            </form>

            {/* Right Section */}
            <div className="w-1/2 h-full bg-gradient-to-br from-purple-600 to-purple-800 flex flex-col justify-center items-center p-12 text-white">
                <h2 className="text-4xl font-bold mb-8">Welcome Back!</h2>
                <p className="text-xl text-purple-100 mb-12 text-center max-w-md">
                    Access your account to send money instantly, track payments, and manage your finances securely.
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

export default Signin

