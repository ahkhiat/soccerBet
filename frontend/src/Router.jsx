import {
    BrowserRouter,
    Routes,
    Route
} from 'react-router-dom';

import Home from './components/Home/Home';
import Logout from './components/Logout/Logout';
import Users from './components/Users/Users';
// import Navbar from './components/NavBar/NavBar';



function Router() {
  return (
        <BrowserRouter>
            {/* <Navbar /> */}
                <Routes>
                    <Route path="/" element={<Home />}></Route>
                    <Route path="/logout" element={<Logout />}></Route>
                    <Route path="/admin/users" element={<Users />}></Route>
                
                </Routes>
        </BrowserRouter>
)
}

export default Router