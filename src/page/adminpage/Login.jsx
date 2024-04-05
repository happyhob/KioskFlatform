import React from 'react'
// import Header from '../components/Header/Header'
import LoginForm from '../../components/Login/LoginForm'
import Home from '../adminpage/Home';
const Login = () => {
  return (
    <>
        <Home/>
        <div className='container'>
            <LoginForm />
        </div>
    </>
  )
}

export default Login