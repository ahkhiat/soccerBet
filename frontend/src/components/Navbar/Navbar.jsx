import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
// import SearchBar from '../SearchBar/SearchBar';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const isAuthenticated = sessionStorage.getItem('token') || localStorage.getItem('token');
  const [isDarkMode, setIsDarkMode] = useState(false)

  const handleLogout = () => {
    // Supprime le token de sessionStorage et localStorage
    sessionStorage.removeItem('token');
    localStorage.removeItem('token');

    // Redirige vers la page de connexion
    navigate('/login');
  };

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    // Appliquer la classe dark à l'élément racine ou à body
    document.body.classList.toggle('dark', !isDarkMode);
  };



  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  return (
    <>
    <nav className={`bg-gray-800 p-4 ${isDarkMode ? 'dark' : ''}`}>
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-white text-2xl">Soccer Bet</h1>

        {/* Menu pour les grands écrans */}
        <div className="hidden md:flex space-x-4">
        {isAuthenticated ? (
            <>
            <Link to="/" className="text-white hover:text-gray-400">Home</Link>
            <Link to="/all" className="text-white hover:text-gray-400">All</Link>
            <button 
                onClick={handleLogout} 
                className="text-white hover:text-gray-400"
            >
                Déconnecter
            </button>
            </>
        ) : (
            <Link to="/login" className="text-white hover:text-gray-400">Se connecter</Link>
        )}
        </div>

        {/* Bouton burger pour les petits écrans */}
        <button
          className="md:hidden text-white focus:outline-none"
          onClick={() => setIsOpen(!isOpen)}
        >
          <i className="fas fa-bars"></i>
        </button>
      </div>

      {/* Menu déroulant pour les petits écrans */}
      {isOpen && (
        <div className="md:hidden bg-gray-700">
          
          {isAuthenticated ? (
            <>
            <Link to="/" className="block px-4 py-2 text-white hover:bg-gray-600">Home</Link>
            <Link to="/all" className="block px-4 py-2 text-white hover:bg-gray-600">All</Link>
            <button 
              onClick={handleLogout} 
              className="w-full text-center block px-4 py-2 text-white hover:bg-gray-600"
            >
              Déconnecter
            </button>
            </>
          ) : (
            <Link to="/login" className="block px-4 py-2 text-white hover:bg-gray-600">Se connecter</Link>
          )}

        </div>
      )}
    </nav>
    </>
  );
};

export default Navbar;