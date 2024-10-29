import {
    BrowserRouter,
    Routes,
    Route,
    Navigate
} from 'react-router-dom';

import Home from './components/Home/Home';
import Logout from './components/Logout/Logout';
import Users from './components/Users/Users';
import Register from './components/Register/Register';
import Login from './components/Login/Login';
import Navbar from './components/Navbar/Navbar';

// function ProtectedRoute({ children }) {
//     const token = localStorage.getItem('token')  || sessionStorage.getItem('token') ;
//     return token ? children : <Navigate to="/login" />;
//   }



function Router({ setToken }) {

  const token = localStorage.getItem('token') || sessionStorage.getItem('token');

  return (
        <BrowserRouter>
            <Navbar />
                <Routes>
                    {/* Routes accessibles à tous */}
                    <Route path="/" element={<Home />}></Route>
                    <Route path="/login" element={<Login setToken={setToken}/>}></Route>
                    <Route path="/register" element={<Register />}></Route>

                    {/* Routes accessibles aux personnes connectées */}
                    <Route path="/logout" element={token ? <Logout /> : <Navigate to="/login" />} ></Route>
                    <Route path="/admin/users" element={token ? <Users /> : <Navigate to="/login" />}></Route>
                
                </Routes>
        </BrowserRouter>
)
}

export default Router