import React, { useContext, useState } from 'react';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import YouTubeIcon from '@mui/icons-material/YouTube';
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
    navigate("/home");
  };
  const navigateToMenuForm = () => {
    if (showMenu) {
      setShowMenu(false);
      navigate("/menu");
    } else {
      navigate("/home");
    }
  };

  const navigateToRegistration = () => {
    navigate("/registration");
  };

  const navigateToQR = () => {
    navigate("/QR");
  };
  
  const handleLogout = () => {
    logout();  // 로그아웃 함수 호출
    navigateToHome();
  };

  return (
    <Toolbar position="static" sx={{ backgroundColor: 'black', color: 'white' }}>
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
        <IconButton color="inherit" aria-label="instagram" href="https://youtube.com">
          <YouTubeIcon />
        </IconButton>
      </Box>
      {!isLogin ? (
        <>
          <Box sx={{ flexGrow: 3, display: 'flex', justifyContent: 'center' }}>
            <Button
              variant="h6"
              component="div"
              sm={{ flexGrow: 1 }}
            >
              Home
            </Button>
            <Button
              variant="h6"
              component="div"
              sm={{ flexGrow: 1, color: 'gray' }}
            >
              Registration
            </Button>
            <Button
              variant="h6"
              component="div"
              sm={{ flexGrow: 1, color: 'gray' }}
            >
              Profile
            </Button>
          </Box>
          <Button color="inherit" onClick={navigateToLogin} sx={{ color: 'white' }}>
            Login
          </Button>
          <Button color="inherit" onClick={navigateToJoin} sx={{ color: 'white' }}>
            Sign up
          </Button>
        </>
      ) : (
        <>
          <Box sx={{ flexGrow: 3, display: 'flex', justifyContent: 'center' }}>
            <Button
              variant="h6"
              component="div"
              sm={{ flexGrow: 1, color: 'white' }}
              onClick={navigateToHome}
            >
              Home
            </Button>
            <Button
              variant="h6"
              component="div"
              sm={{ flexGrow: 1, color: 'white' }}
              onClick={navigateToRegistration}
            >
              Registration
            </Button>
            <Button
              variant="h6"
              component="div"
              sm={{ flexGrow: 1, color: 'white' }}
              onClick={navigateToHome}
            >
              Profile
            </Button>
          </Box>
          <Button color="inherit" onClick={navigateToQR} sx={{ color: 'white' }}>
            QR
          </Button>
          <Button color="inherit" onClick={handleLogout} sx={{ color: 'white' }}>
            Logout
          </Button>
        </>
      )}
    </Toolbar>
  );
}

export default Header;
