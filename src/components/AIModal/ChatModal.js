import React, { useState, useEffect } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button, Typography, CircularProgress } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import axios from 'axios';

const ChatModal = ({ open, onClose }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [allergyInfo, setAllergyInfo] = useState('');
  const [isFirstInteraction, setIsFirstInteraction] = useState(true);
  const [loading, setLoading] = useState(false);

  // 모달이 열릴 때 초기 메시지를 설정
  useEffect(() => {
    if (open) {
        setMessages([
            { text: '안녕하세요! AI 도우미입니다. 무엇을 도와드릴까요?', sender: 'ai', clickable: false },
            { text: '오늘 날씨에 맞는 메뉴를 추천해줘.', sender: 'user', clickable: true },
            { text: '김치찌개에 대해서 설명해줘.', sender: 'user', clickable: true }
          ]);
      setIsFirstInteraction(true);
    }
  }, [open]);

  const handleSendMessage = async (messageText) => {
    if (isFirstInteraction) {
      setMessages([]);
      setIsFirstInteraction(false);
    }

    const userMessage = { text: messageText, sender: 'user', allergy: allergyInfo };
    setMessages(prevMessages => [...prevMessages, { text: messageText, sender: 'user' }]);
    setLoading(true); // 로딩 상태 시작

    // FastAPI 서버로 POST 요청 보내기
    try {
      const response = await axios.post('http://61.81.99.104:8000/users/ai', userMessage);
      const aiMessage = { text: response.data.message, sender: 'ai' };
      setMessages(prevMessages => [...prevMessages, aiMessage]);
    } catch (error) {
      console.error('Error sending message:', error);
      setMessages(prevMessages => [...prevMessages, { text: '서버 응답 실패', sender: 'ai' }]);
    } finally {
      setLoading(false); // 로딩 상태 종료
    }

    setNewMessage('');
  };

  return (
    <Dialog 
      open={open} 
      onClose={onClose} 
      fullWidth 
      maxWidth="sm" 
      PaperProps={{
        style: {
          minHeight: '700px', // 세로 길이 증가
          maxHeight: '700px', // 세로 길이 고정
          minWidth: '500px',  // 가로 길이 줄이기
          maxWidth: '500px',  // 가로 길이 고정
        },
      }}
    >
      <DialogTitle>{"AI 도우미 채팅"}</DialogTitle>
      <DialogContent style={{ padding: 0 }}>
        <div style={{ height: '500px', overflowY: 'auto', padding: '16px' }}>
          {messages.map((message, index) => (
            <div 
              key={index} 
              style={{ textAlign: message.sender === 'user' ? 'right' : 'left', margin: '10px 0' }}
              onClick={() => message.clickable && handleSendMessage(message.text)}
            >
              <Typography 
                variant="body1" 
                component="p" 
                style={{ 
                  background: message.sender === 'user' ? '#dcf8c6' : '#ffffff', 
                  display: 'inline-block', 
                  padding: '10px', 
                  borderRadius: '10px',
                  cursor: message.clickable ? 'pointer' : 'default'
                }}
              >
                {message.text}
              </Typography>
            </div>
          ))}
          {loading && (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '10px' }}>
              <CircularProgress />
              <Typography variant="body1" style={{ marginLeft: '10px' }}>응답을 기다리는 중...</Typography>
            </div>
          )}
        </div>
      </DialogContent>
      <DialogActions>
        <TextField
          autoFocus
          margin="dense"
          id="newMessage"
          label="메시지 입력"
          type="text"
          fullWidth
          variant="outlined"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyPress={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault();
              handleSendMessage(newMessage);
            }
          }}
        />
        <Button onClick={() => handleSendMessage(newMessage)} color="primary" variant="contained" endIcon={<SendIcon />}>
          보내기
        </Button>
        <Button onClick={onClose} color="primary">
          닫기
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default ChatModal;
