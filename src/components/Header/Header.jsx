import React, { useContext, useEffect, useState } from 'react';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import FacebookIcon from '@mui/icons-material/Facebook';
import XIcon from '@mui/icons-material/X';
import InstagramIcon from '@mui/icons-material/Instagram';
import Box from '@mui/material/Box';
import { useNavigate } from 'react-router-dom';
import { LoginContext } from '../../Context/LoginContextProvider';

const Header = () => {

  const navigate = useNavigate();
  const { isLogin, logout } = useContext(LoginContext);  // 로그인 상태와 로그아웃 함수 사용
  const [showMenu, setShowMenu] = useState(true);

  const navigateToLogin = () => {
    navigate("/login");
  };
  const navigateToJoin = () => {
    navigate("/join");
  };
  const navigateToHome = () => {
    navigate("/");
  };
  const navigateToMenuForm = () => {
    if (showMenu) {
      setShowMenu(false);
      navigate("/menu");
    } else {
      navigate("/");
    }
  };
  const navigateToQR= () => {
    navigate("/QR");
  };
  
  const handleLogout = () => {
    logout();  // 로그아웃 함수 호출
    navigateToHome();
  };

  return (
    <Toolbar position="static" sx={{ backgroundColor: 'black' }}>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 1 }}
            onClick={navigateToMenuForm}
          >
            <MenuIcon />
          </IconButton>
          <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'center' }}>
            <IconButton color="inherit" aria-label="facebook" href="https://facebook.com">
              <FacebookIcon />
            </IconButton>
            <IconButton color="inherit" aria-label="instagram" href="https://instagram.com">
              <InstagramIcon />
            </IconButton>
            <IconButton color="inherit" aria-label="x" href="https://x.com">
              <XIcon />
            </IconButton>
          </Box>
          <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'center' }}>
          <Button
            variant="h6"
            component="div"
            sx={{ flexGrow: 1 }}
            onClick={navigateToHome}
          >
            Home
          </Button>
          <Button
            variant="h6"
            component="div"
            sx={{ flexGrow: 1 }}
            onClick={navigateToHome}
          >
            Home
          </Button>
          <Button
            variant="h6"
            component="div"
            sx={{ flexGrow: 1 }}
            onClick={navigateToHome}
          >
            Home
          </Button>
          </Box>
          {!isLogin ? (
            <>
              <Button color="inherit" onClick={navigateToLogin}>
                Login
              </Button>
              <Button color="inherit" onClick={navigateToJoin}>
                Sign up
              </Button>
            </>
          ) : (
            <>
              <Button color="inherit" onClick={navigateToQR}>
                QR
              </Button>
              <Button color="inherit" onClick={handleLogout}>
                Logout
              </Button>
            </>
          )}
        </Toolbar>
  )
}

export default Header