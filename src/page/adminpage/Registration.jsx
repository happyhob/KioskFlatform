//header Menu bar
import React,{useContext, useState, useEffect} from 'react'
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { useNavigate } from 'react-router-dom';
import RegistrationForm from '../../components/Registration/RegistrationForm';
import { LoginContext } from '../../Context/LoginContextProvider'; 
import Home from '../adminpage/Home';
//https://mui.com/material-ui/react-app-bar/
const Registration=()=>{

  const navigate = useNavigate();
  const { isLogin, logout } = useContext(LoginContext);
  const [showMenu, setShowMenu] =useState(true);

  const navigateToLogin = () => {
    navigate("/login");
  };
  const navigateToJoin = () => {
    navigate("/join");
  };

  const navigateToQR= () => {
    navigate("/QR");
  };

  const navigateToRegistration = () => {
    navigate("/registration");
  };

  const navigateToMenuForm = () => {
    if(showMenu == true){
      setShowMenu(false)
      navigate("/menu");
    }
    else{
      navigate("/registraion");
    }
  };
  const navigateToHome = () => {
    navigate("/");
  };

  const handleLogout = () => {
    logout();  // 로그아웃 함수 호출
    navigateToHome();
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" color='default'>
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={navigateToMenuForm}
          >
            <MenuIcon />
          </IconButton >
          <Button variant="h6" component="div" sx={{ flexGrow: 3 }}
          onClick={navigateToRegistration}>
            Oner import image
          </Button>
          {!isLogin ? (
            <>
              <Button color="inherit" onClick={navigateToLogin}>Login</Button>
              <Button color="inherit" onClick={navigateToJoin}>Sign up</Button>
            </>
          ) : (
            <>
            <Button color="inherit" onClick={navigateToQR}>QR</Button>
            <Button color="inherit" onClick={handleLogout}>Logout</Button>
            </>
          )}
        </Toolbar>
        <RegistrationForm/>
      </AppBar>
    </Box>
  )
}
export default Registration;