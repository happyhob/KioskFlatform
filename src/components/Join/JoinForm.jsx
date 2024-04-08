import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { joinApi } from '../../apis/join.js'; // joinApi 함수를 임포트합니다.
import './Join.css';

const JoinForm = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    userId: '',
    password: '',
    name: '',
    email: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('회원가입 시도:', userData);
    joinApi(userData) // API 호출
      .then(response => {
        console.log('회원가입 성공:', response.data);
        navigate('/login');
      })
      .catch(error => {
        console.error('회원가입 실패:', error.response ? error.response.data : error.message);
      });
  };

  return (
    <div className="wrapper">
      <h1 className="login-title">Create Account</h1>
      <form onSubmit={handleSubmit}>
        <div className="input-box">
          <input
            id="userId"
            type="text"
            placeholder="UserId"
            name="userId"
            required
            value={userData.userId}
            onChange={handleChange}
          />
        </div>
        <div className="input-box">
          <input
            id="password"
            type="password"
            placeholder="Password"
            name="password"
            required
            value={userData.password}
            onChange={handleChange}
          />
        </div>
        <div className="input-box">
          <input
            id="name"
            type="text"
            placeholder="Name"
            name="name"
            required
            value={userData.name}
            onChange={handleChange}
          />
        </div>
        <div className="input-box">
          <input
            id="email"
            type="email"
            placeholder="Email"
            name="email"
            required
            value={userData.email}
            onChange={handleChange}
          />
        </div>
        <button type="submit" className="signup-button">Sign Up</button>
      </form>
    </div>
  );
};

export default JoinForm;
