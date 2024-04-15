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
import Header from '../../components/Header/Header'


//https://mui.com/material-ui/react-app-bar/
const Home=()=>{

  return (
      <Header/>
  )
}
export default Home;