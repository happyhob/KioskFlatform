import axios from 'axios';

// 회원가입 API 호출 함수
export const joinApi = ({ userId, password, name, email }) => {
  const signUpUrl = 'http://localhost:8080/admin/join';

  return axios.post(signUpUrl, {
    joinId: userId,
    password: password,
    userName: name,
    email: email,
  });
};