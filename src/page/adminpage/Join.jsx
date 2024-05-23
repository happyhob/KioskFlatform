import React, { useContext } from 'react'
import Header from '../../components/AdminHeader/Header'
import JoinForm from '../../components/Join/JoinForm'
import * as auth from '../../apis/auth';
import * as Swal from '../../apis/alter';
import { LoginContext } from '../../Context/LoginContextProvider';
import { useNavigate } from 'react-router-dom';

const Join = () => {

  const { login } = useContext(LoginContext);
  const navigate = useNavigate()

  // 회원가입 요청
  const join = async (  userId, userPw, name, email ) => {
    //console.log( userId, userPw, name, email);

    try {
      const {statusCode, responseData} = await auth.join( userId, userPw, name, email)

      // console.log(`data : ${responseData}`);
      // console.log(`status : ${statusCode}`);

      if( statusCode === 200 ) {
        //console.log(`회원가입 성공!`);
        Swal.alert("회원가입 성공", "메인 화면으로 이동합니다.", "success", () => { navigate("/login") })
      }
      else {
        //console.log(`회원가입 실패!`);
        Swal.alert("회원가입 실패", "회원가입에 실패하였습니다.", "error" )
      }
      
    } catch (error) {
      console.error(`회원가입 요청 중 에러가 발생하였습니다. : ${error}`);
      return
    }
  }

  return (
      <>
        <Header />
        <JoinForm join={join} />
      </>
  )
}

export default Join