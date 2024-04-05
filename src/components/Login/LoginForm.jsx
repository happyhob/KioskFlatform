import Cookies from 'js-cookie';
import React, { useContext, useEffect, useState } from 'react';
import { LoginContext } from '../../Context/LoginContextProvider'
import './LoginForm.css';
import IdForm from "../Id/IdForm";
import PwForm from "../Pw/PwForm";
import { FaUser, FaLock } from "react-icons/fa";
import {useNavigate} from "react-router-dom";
import Box from '@mui/material/Box';

import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import AccountCircle from '@mui/icons-material/AccountCircle';
import IconButton from '@mui/material/IconButton';
import FilledInput from '@mui/material/FilledInput';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';


const LoginForm = () => {

  const { login } = useContext(LoginContext);
  const navigate = useNavigate()
  const [rememberUserId, setRememberUserId] = useState();

  const onJoin = () => {
    navigate("/join")
  }

  const onLogin = (e) => {
    e.preventDefault()
    const userId = e.target.username.value
    const password = e.target.password.value
    const rememberId = e.target.rememberId.checked
    console.log(e.target.username.value)
    console.log(e.target.password.value)
    console.log(e.target.rememberId.checked)

    login(userId, password, rememberId )
  }

  useEffect( () => {
    // 쿠키에서 저장된 아이디 가져오기
    const remeberId = Cookies.get("rememberId")
    console.log(`쿠키 remeberId : ${remeberId}`);
    setRememberUserId(remeberId)
  }, [])


  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };


  return (
    <div className="wrapper">
      <h1 className="login-title">로그인</h1>
      <form action=" " onSubmit={(e) => onLogin(e)}>
        <div className="input-box">
          {/* <input
                id="username"
                type="text"
                placeholder="UserId"
                name="username"
                autoComplete='username'
                required
                defaultValue={rememberUserId}
            /> */}
          {/* <Box
            component="form"
            sx={{
              '& > :not(style)': { m: 1, width: '35ch' },
            }}
            noValidate
            autoComplete="off"
          >
            <TextField
              id="username"
              type="text"
              label="UserId"
              variant="outlined"
              autoComplete='username'
              required
              // defaultValue={rememberUserId}
              defaultValue={rememberUserId ? rememberUserId : ""}
            />
          </Box> */}

          <Box sx={{ '& > :not(style)': { m: 1, width: '35ch' } }}>
            <FormControl variant="standard">
              <InputLabel htmlFor="input-with-icon-adornment">
                UserId
              </InputLabel>
              <Input
                id="input-with-icon-adornment"
                startAdornment={
                  <InputAdornment position="start">
                    <AccountCircle />
                  </InputAdornment>
                }
              />
            </FormControl>
          </Box>

        </div>
        <div className="input-box">
          {/* <input
                id="password"
                type="password"
                placeholder="password"
                name="password"
                autoComplete='current-password'
                required
            /> */}
          {/* <Box
              component="form"
              sx={{
                '& > :not(style)': { m: 1, width: '35ch' },
              }}
              noValidate
              autoComplete="off"
            >
              <TextField
                id="password"
                type="password"
                label="Password"
                variant="outlined"
                autoComplete='current-password'
                required
                // defaultValue={rememberUserId}
                defaultValue={rememberUserId ? rememberUserId : ""}
              />
            </Box> */}
          <Box sx={{ '& > :not(style)': { m: 1, width: '35ch' } }}>
            <FormControl variant="standard">
              <InputLabel htmlFor="input-with-icon-adornment">
                Password
              </InputLabel>
              <Input
                id="input-with-icon-adornment"
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
                label="Password"
              />
            </FormControl>
          </Box>
        </div>
        <div className='form-check'>
          <div style={{ display: 'flex', flexDirection: 'row' }}>
            <label className="toggle-btn" style={{ marginRight: '5px' }}>
              {!rememberUserId
                ?
                <input type="checkbox" id="remember-id" name='rememberId' value='0' />
                :
                <input type="checkbox" id="remember-id" name='rememberId' value='0' defaultChecked />
              }
              <span className="slider"></span>
            </label>
            <div style={{ display: 'flex', flexDirection: 'row', color: '#7a573e' }}>
              <label htmlFor='remember-id' className='check-label'>아이디 저장 |</label>
              <IdForm />
              <PwForm />
            </div>
          </div>
        </div>
        <button value="Login" style={{ background: '#7a573e', color: 'white' }}>
          Login
        </button>
        <div className="register-link">
          계정이 없으신가요?
          <button onClick={onJoin} style={{ background: 'lightgray', color: 'black' }} >
            Sign Up
          </button>
        </div>
      </form>
    </div>
  );
}

export default LoginForm