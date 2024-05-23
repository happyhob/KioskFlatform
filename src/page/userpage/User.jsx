import React from 'react'
import UserForm from '../../components/User/UserForm'
import UserHeader from '../../components/UserHeader/Header'
const User = () => {
  return (
    <div className='container'>
      <UserHeader />
      <UserForm />
    </div>
  )
}

export default User