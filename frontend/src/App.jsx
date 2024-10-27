import './App.css'
import { useState } from 'react'
import Router from './Router'
import Login from './components/Login/Login';



function App() {
  const [token, setToken] = useState();

  const tokenUtilisateur = localStorage.getItem('token')

  if(!tokenUtilisateur) {
    return <Login setToken={setToken} />
  }


  return (
    <>
      <Router />
    </>
  )
}

export default App