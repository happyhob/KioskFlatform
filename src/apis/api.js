//통신 axios 객체 생성
import axios from 'axios';

const api = axios.create({
  // baseURL: 'http://localhost:8081',
  baseURL: 'http://localhost:8080',
  withCredentials: true // 모든 요청에 withCredentials를 적용합니다.
});

export default api;