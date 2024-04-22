import React, { useContext, useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate, Link } from 'react-router-dom';
import Home from './page/adminpage/Home';
import Join from './page/adminpage/Join';
import Login from './page/adminpage/Login';
import Qr from './page/adminpage/Qr';
import MenuBar from './page/adminpage/Menubar';
import Registration from './page/adminpage/Registration';
import LoginContextProvider, { LoginContext } from './Context/LoginContextProvider';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Cookies from 'js-cookie';  // 추가된 부분: js-cookie 라이브러리 import

function Header() {
  const { isLoggedIn, setLoggedIn } = useContext(LoginContext);

  const handleLogout = () => {
    Cookies.remove('user_login');  // 로그아웃 시 쿠키 삭제
    setLoggedIn(false);           // 로그인 상태 업데이트
  };

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
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/registration" element={<Registration />} />
          <Route path="/join" element={<Join />} />
          <Route path="/qr" element={<Qr />} />
          <Route path="/menu" element={<MenuBar />} />
        </Routes>
      </LoginContextProvider>
    </Router>
  );
}

export default App;