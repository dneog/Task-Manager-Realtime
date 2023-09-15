import './App.css';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/home/Home';
import Header from './components/Header/Header';
import Login from './pages/auth/Login';
import Signup from './pages/auth/Signup';
import Tasks from './pages/collaboration/Tasks';
import Notification from './pages/notification/Notification';
import Add from './pages/add/Add';
import Users from './pages/users/Users';
import Update from './pages/add/Update';
import ForgotPassword from './pages/auth/ForgotPassword';
import UserDetails from './pages/userDetails/UserDetails';
function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />}/>
        <Route path='/forgotPassword' element={<ForgotPassword />}/>
        <Route path='/collab' element={<Tasks />}/>
        <Route path='/notification' element={<Notification />}/>
        <Route path='/add' element={<Add />}/>
        <Route path='/userDetails' element={<UserDetails />}/>
        <Route path='/update/:id' element={<Add />}/>
        <Route path='/SharedUpdate/:id' element={<Update />}/>
        <Route path='/users/:id' element={<Users />}/>
      </Routes>
    </div>
  );
}

export default App;