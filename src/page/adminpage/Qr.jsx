import React from 'react'
// import Header from '../components/Header/Header'
import QRForm from '../../components/QR/QRForm'
import Home from '../adminpage/Home';


const QR = () => {
  return (
    <>
        <Home/>
        <div className='container'>
            <QRForm/>
        </div>
    </>
  )
}

export default QR