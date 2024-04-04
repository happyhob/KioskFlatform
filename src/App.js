import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './page/adminpage/Home'
import Join from './page/adminpage/Join'
import Login from './page/adminpage/Login'
import Qr from './page/adminpage/Qr'
import Registration from './page/adminpage/Registration'
//import LoginContextProvider from '../Context/LoginContextProvider';
import LoginContextProvider from './Context/LoginContextProvider';
import {BrowserView, MobileView} from "react-device-detect";
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';

function Item(props) {
  return (
    <div class="card">
      <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a3/Eq_it-na_pizza-margherita_sep2005_sml.jpg/640px-Eq_it-na_pizza-margherita_sep2005_sml.jpg" class="card-img-top" alt="..." />
      <div class="card-body">
        <h5 class="card-title">{props.name}</h5>
        <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
        <a href="#" class="btn btn-primary">Go somewhere</a>
      </div>
    </div>

  );
}


function Header(props){
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
            News
          </Typography>
          <Button color="inherit">Login</Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}


{/*
<div className="row row-cols-1 row-cols-sm-2 row-colsp-md-3 g-3">
  <Item name="pizza"/>
  <Item/>
</div> > */}

function App() {
  return (
    <Router>
      <LoginContextProvider>
        <Routes>                   
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/registration" element={<Registration />} />
          <Route path="/join" element={<Join />} />
          <Route path="/qr/" element={<Qr />} />
        </Routes>
      </LoginContextProvider>
    </Router>
  );
}

export default App;
