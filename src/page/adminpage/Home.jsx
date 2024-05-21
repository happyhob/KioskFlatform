import React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import HomeForm from '../../components/Home/HomeForm'
import Header from '../../components/Header/Header'

const Home = () => {
 
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{ backgroundColor: 'white' }}>
        <Header/>
        <HomeForm/>
      </AppBar>
    </Box>
  );
};

export default Home;