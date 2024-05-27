//header Menu bar
import React from 'react'
import Box from '@mui/material/Box';
import RegistrationForm from '../../components/Registration/RegistrationForm';
import Header from '../../components/AdminHeader/Header'
//https://mui.com/material-ui/react-app-bar/
const Registration=()=>{

  return (
    <Box sx={{ flexGrow: 1 }}> 
      <Header />
      <RegistrationForm/>
    </Box>
  )
}
export default Registration;