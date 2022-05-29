import './App.scss';
import { Routes, Route, BrowserRouter as Router, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/authContext';
import Login from './components/Login';
import HomeAdmin from './components/Admin/HomeAdmin';
import CreateTeacher from './components/Admin/CreateTeacher';
import EditTeacher from './components/Admin/EditTeacher';
import Navbar from './components/navigationBar';

function App() {

  return (
    <Router>
      <div className='flex'>
        <Navbar />
        <Routes>
            <Route path='/' exact={true} element={<HomeAdmin />}/>
            <Route path='/login' exact={true} element={<Login />}/>
            <Route path='/createTeacher' exact={true} element={<CreateTeacher />}/>
            <Route path='/editTeacher/:id' exact={true} element={<EditTeacher />}/>
        </Routes>
      </div>
    </Router>

  );
}

export default App;
