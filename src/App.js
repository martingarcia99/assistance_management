import './App.css';
import { Routes, Route, BrowserRouter, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/authContext';
import NavigationBar from './components/navigationBar';
import HomeTeacher from './components/HomeTeacher';

function App() {
  return (
    <div>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={ <NavigationBar/> }>
              <Route path='/login' element={ <HomeTeacher/> }/>
              <Route path='*' element={<Navigate replate to="/"/>} />
            </Route>
            <Route path='/login' element={ <HomeTeacher/> }/>
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </div>

  );
}

export default App;
