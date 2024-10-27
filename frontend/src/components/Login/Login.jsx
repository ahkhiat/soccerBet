import Input from "../Input/Input";
import { useState } from 'react';
import './Login.css';

// lien de génération du token d'authentification
// https://api.themoviedb.org/3/authentication/token/new

function Login() {

    const [formData, setFormData] = useState({
      email: '',
      password: ''
    });
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);

    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData({
        ...formData,
        [name]: value
      });
    };

    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4ZjI5NTI3ZjU3NjQ4OTE5MzU5YThlM2EzNGZhZDEyMSIsIm5iZiI6MTcyNjY0OTExMC44Njg2NzYsInN1YiI6IjY2ZTk4ODJlMWJlY2E4Y2UwN2QyZTYzZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.DiBcCQalz7EIIuk852QklQk_bBBSjfR8-Lk_2McaCKI'
      }
    };

    const handleSubmit = (e) => {
      e.preventDefault(); 

      fetch(`https://api.themoviedb.org/3/authentication/token/new`, options)
      .then(response => response.json())
      .then((result) => {
        console.log(result)
        setIsLoaded(true);
        
        localStorage.setItem('token', result.request_token);

        const token = localStorage.getItem('token');

        console.log('token enregistré dans local storage :' + token)
      })
      .catch(err => console.error(err));

    };
    
    return (
    <>
      <div className="flex justify-center items-center min-h-screen">
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md w-full max-w-sm">
          
          <Input label="Email" id="email" type="email" name="email" onChange={handleChange}/>
          <Input label="Mot de passe" id="password" type="password"  name="password" onChange={handleChange}/>

          <button type="submit" className="submit-btn">Envoyer</button>
      
        </form>
      </div>
    </>

    );
  }

  export default Login