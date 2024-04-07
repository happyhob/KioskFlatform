import axios from 'axios';

// 회원가입 API 호출 함수
export const joinApi = ({ userId, password, name, email }) => {
  const signUpUrl = 'https://your-api-endpoint.com/admin/new-user';

  return axios.post(signUpUrl, {
    loginId: userId,
    password: password,
    userName: name,
    email: email,
  });
};