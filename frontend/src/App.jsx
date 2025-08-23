import React from 'react'
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import UserLogin from './pages/UserLogin';
import UserSignup from './pages/UserSignup';
import CaptainLogin from './pages/CaptianLogin';
import CaptainSignup from './pages/CaptainSignup';
import UserProtectWrapper from './pages/UserProtectWrapper';
import CaptainHome from './pages/CaptainHome';
import UserLogout from './pages/UserLogout';
import CaptainProtectWrapper from './pages/CaptainProtectWrapper';
export const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={
          <UserProtectWrapper>
            <Home />
          </UserProtectWrapper>
        } />
        <Route path="/login" element={<UserLogin />} />
        <Route path="/signup" element={<UserSignup />} />
        <Route path="/captain-login" element={<CaptainLogin />} />
        <Route path="/captain-signup" element={<CaptainSignup />} />
        <Route path="/user/logout" element={
          <UserProtectWrapper>
            <UserLogout />
          </UserProtectWrapper>
        }/>
        <Route path="/captain-home" element={
          <CaptainProtectWrapper>
            <CaptainHome />
          </CaptainProtectWrapper>
        }/>
      </Routes>
    </div>
  )
}

export default App;
