import { useState } from 'react'
import {BrowserRouter as Router,Route,Routes} from "react-router-dom";
import {Navigate} from 'react-router-dom'
import Login from './components/Login';
import Signup from './components/Signup';
import Home from './components/Home';

function App() {


  return (
    <>
        <Router>
          <Routes>

            <Route path='/' element={<Navigate to="/login" />} />

            <Route path='/home' element={
              <ProtectedRouteForAdmin>
                <Home />
            </ProtectedRouteForAdmin>
            } />

            <Route path='/login' element={<Login/>} />

            <Route path='/signup' element={<Signup />} />

          </Routes>
        </Router>
    </>
  )
}

export default App




export const ProtectedRouteForAdmin = ({ children }) => {

  const admin = localStorage.getItem('token');
    // console.log("Local Storage wala Token : " , admin );
  if (admin) {
    // console.log("Local Storage wala Email : " , admin.user.email );
    return children
  }
  else {
    return <Navigate to={'/login'}/>
  }
}
