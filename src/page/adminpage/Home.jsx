//header Menu bar

import React,{useState, useEffect} from 'react'
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import LoginForm from '../../components/Login/LoginForm';
import { useNavigate } from 'react-router-dom';
import MenubarForm from '../../components/Menubar/MenubarForm';
//https://mui.com/material-ui/react-app-bar/
const Home=()=>{

  const navigate = useNavigate();

  const [showMenu, setShowMenu] =useState(true);

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
    if(showMenu == true){
      setShowMenu(false)
      navigate("/menu");
    }
    else{
      navigate("/");
    }
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
          onClick={navigateToHome}>
            Easy Make Kiosk 
          </Button>
          <Button color="inherit"
          onClick={navigateToLogin}>Login</Button>
          <Button color="inherit"
          onClick={navigateToJoin}>Sign up</Button>
        </Toolbar>
      </AppBar>
    </Box>
  )
}
export default Home;