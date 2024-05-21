//header Menu bar
import React,{useContext, useState, useEffect} from 'react'
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import { useNavigate } from 'react-router-dom';
import RegistrationForm from '../../components/Registration/RegistrationForm';
import { LoginContext } from '../../Context/LoginContextProvider'; 
import Header from '../../components/Header/Header'
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
      <Header />
      <RegistrationForm/>
    </Box>
  )
}
export default Registration;