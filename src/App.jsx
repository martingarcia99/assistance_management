import './App.scss';
import { Routes, Route, BrowserRouter as Router} from 'react-router-dom';
import { AuthProvider } from './context/authContext';
import Login from './components/Login';
import HomeAdmin from './components/Admin/HomeAdmin';
import CreateTeacher from './components/Admin/CreateTeacher';
import EditTeacher from './components/Admin/EditTeacher';
import HomeTeacher from './components/Teacher/HomeTeacher';
import CreateSubject from './components/Teacher/CreateSubject';
import SidebarLayout from './components/sidebarLayout';
import SidebarLayoutTeacher from './components/sidebarLayoutTeacher';
import { ProtectedRoute } from './components/ProtectedRoute'
import { ProtectedRouteTeacher } from './components/ProtectedRouteTeacher'

function App() {

  return (
    <Router>
      <div className='flex'>
      <AuthProvider>
        <Routes>
          <Route element={<ProtectedRoute><SidebarLayout/></ProtectedRoute>}>
            <Route path='/' element={<ProtectedRoute><HomeAdmin /></ProtectedRoute>}/>
            <Route path='/createTeacher' element={<ProtectedRoute><CreateTeacher /></ProtectedRoute>}/>
            <Route path='/editTeacher/:id' element={<ProtectedRoute><EditTeacher /></ProtectedRoute>}/>
          </Route>
          <Route element={<ProtectedRouteTeacher><SidebarLayoutTeacher/></ProtectedRouteTeacher>}>
            <Route path='/HomeTeacher' element={<ProtectedRouteTeacher><HomeTeacher /></ProtectedRouteTeacher>}/>
            <Route path='/createSubject' element={<ProtectedRouteTeacher><CreateSubject/></ProtectedRouteTeacher>}/>
          </Route>
          <Route path='/login' exact={true} element={<Login />}/>
        </Routes>
      </AuthProvider>
      </div>
    </Router>

  );
}

export default App;
