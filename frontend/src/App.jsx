import React from 'react'
import { Route, Routes } from 'react-router-dom';
import Start from './pages/Start';
import UserLogin from './pages/UserLogin';
import UserSignup from './pages/UserSignup';
import CaptainLogin from './pages/CaptianLogin';
import CaptainSignup from './pages/CaptainSignup';
import UserProtectWrapper from './pages/UserProtectWrapper';
import CaptainHome from './pages/CaptainHome';
import UserLogout from './pages/UserLogout';
import CaptainProtectWrapper from './pages/CaptainProtectWrapper';
import CaptainLogout from './pages/CaptainLogout';
import Home from './pages/Home';
export const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/start" element={
          <UserProtectWrapper>
            <Start />
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
        <Route path="/captain/logout" element={
          <CaptainProtectWrapper>
            <CaptainLogout />
          </CaptainProtectWrapper>
        }/>
        <Route path='/' element={<Home />} />
      </Routes>
    </div>
  )
}

export default App;
