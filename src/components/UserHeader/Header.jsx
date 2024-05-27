import React from 'react';
import { Typography, IconButton } from '@mui/material';
import Toolbar from '@mui/material/Toolbar';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import YouTubeIcon from '@mui/icons-material/YouTube';
import Box from '@mui/material/Box';

const Header = () => {

  return (
    <Toolbar position="static" sx={{ backgroundColor: 'white', color: 'black' }}>
      <Box sx={{ backgroundColor: 'black', flexGrow: 3, display: 'flex', justifyContent: 'center' }}>
          <Typography variant="auto" color="error" align="center">
          사용자 페이지
          </Typography>
      </Box>
      <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'right' }}>
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
    </Toolbar>
  );
}

export default Header;
