import React, { useContext, useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './page/adminpage/Home';
import Join from './page/adminpage/Join';
import Login from './page/adminpage/Login';
import Qr from './page/adminpage/Qr';
import MenuBar from './page/adminpage/Menubar';
import Registration from './page/adminpage/Registration';
import User from './page/userpage/User';
import LoginContextProvider, { LoginContext } from './Context/LoginContextProvider';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Cookies from 'js-cookie';  // 추가된 부분: js-cookie 라이브러리 import

function Header() {

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
       
      </AppBar>
    </Box>
  );
}

function App() {
  const [isLoggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    // 로그인 상태 체크
    const token = Cookies.get('user_login');
    if (token) {
      setLoggedIn(true);
    }
  }, []);

  return (
    <Router>
      <LoginContextProvider value={{ isLoggedIn, setLoggedIn }}>
        <Header />
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/registration" element={<Registration />} />
          <Route path="/join" element={<Join />} />
          <Route path="/qr" element={<Qr />} />
          <Route path="/menu" element={<MenuBar />} />
          <Route path="/User" element={<User />} />
        </Routes>
      </LoginContextProvider>
    </Router>
  );
}

export default App;