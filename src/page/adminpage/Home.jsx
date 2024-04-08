//header Menu bar

import React from 'react'
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import LoginForm from '../../components/Login/LoginForm';
import { useNavigate } from 'react-router-dom';
//https://mui.com/material-ui/react-app-bar/
const Home=()=>{

  const navigate = useNavigate();

  const navigateToLogin = () => {
    navigate("/login");
  };
  const navigateToJoin = () => {
    navigate("/join");
  };
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Easy Make Kiosk 
          </Typography>
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