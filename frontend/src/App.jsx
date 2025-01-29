import { useEffect, useState } from 'react'
import './App.css'
import {Route, Routes} from "react-router-dom"
import Signup from './pages/Signup'
import Signin from './pages/Signin'
import LandingPage from './pages/LandingPage'
function App() {
  const [isOnline , setIsOnline] = useState(false);
  useEffect(()=>{
    const token = localStorage.getItem('token')
    if(!token){
      setIsOnline(false);
    }
    else {
      setIsOnline(true);
    }
  },[])
  return (
    <Routes>

      <Route path='/' element={<LandingPage/>} />

      <Route path='/signup' element={ isOnline ?<div>Hello</div> : <Signup setIsOnline={setIsOnline} /> } />
      <Route path='/signin' element={ isOnline ?<div>Hello</div> : <Signin setIsOnline={setIsOnline} /> } />

    </Routes>
  )
}

export default App
