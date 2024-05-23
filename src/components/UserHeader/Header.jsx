import React, { useContext, useState } from 'react';
import { AppBar, Button, Card, CardActions, CardContent, CardMedia, CssBaseline, Grid, Typography, Drawer, List, ListItem, ListItemSecondaryAction, ListItemText, Badge, Divider, IconButton } from '@mui/material';
import Toolbar from '@mui/material/Toolbar';
import MenuIcon from '@mui/icons-material/Menu';
import DeleteIcon from '@mui/icons-material/Delete';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import YouTubeIcon from '@mui/icons-material/YouTube';
import Box from '@mui/material/Box';
import { useNavigate } from 'react-router-dom';
import { LoginContext } from '../../Context/LoginContextProvider';

const Header = () => {
  const navigate = useNavigate();
  const [cart, setCart] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [cards, setCards] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [totalPrice, setTotalPrice] = useState(0);

  return (
    <Toolbar position="static" sx={{ backgroundColor: 'white', color: 'black' }}>

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
        <Box sx={{ flexGrow: 3, display: 'flex', justifyContent: 'center' }}>
            <Typography variant="h4" color="inherit" align="center">
            사용자 페이지
            </Typography>
        </Box>
        <Box sx={{ flexGrow: 2, display: 'flex', justifyContent: 'center' }}>
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
    </Toolbar>
  );
}

export default Header;
