//통신 axios 객체 생성
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8081', // 여기에 서버의 기본 URL을 넣으세요.
  withCredentials: true // 모든 요청에 withCredentials를 적용합니다.
});

// 로그아웃 함수
export const logout = () => {
  return api.put("/logout")
    .then(response => {
      // 로그아웃 성공 시의 처리
    })
    .catch(error => {
      // 에러 처리
    });
};

export default api;