import './App.css'
import { useState } from 'react'
import Router from './Router'
import Login from './components/Login/Login';



function App() { 
  const [token, setToken] = useState(localStorage.getItem('token'));


  return (
    <>
    <Router token={token} setToken={setToken} />
    </>
  )
}

export default App