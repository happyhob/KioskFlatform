import React from 'react'
// import Header from '../components/Header/Header'
import MenubarForm from '../../components/Menubar/MenubarForm'
import Home from '../adminpage/Home';
import Header from '../../components/Header/Header'


const MenuBar = () => {
  return (
    <>
        <Header/>
        <div className='container'>
            <MenubarForm />
        </div>
    </>
  )
}

export default MenuBar