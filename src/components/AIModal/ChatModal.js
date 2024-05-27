
import React, { useState, useEffect } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button, CircularProgress, Box } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import axios from 'axios';
import ChatBubble from './ChatBubble'; // ChatBubble 컴포넌트 임포트
import BudgetModal from './BudgetModal'; // 예산 입력 모달 컴포넌트 임포트

const ChatModal = ({ open, onClose }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [isFirstInteraction, setIsFirstInteraction] = useState(true);
  const [loading, setLoading] = useState(false);
  const [budgetModalOpen, setBudgetModalOpen] = useState(false);
  const [typingText, setTypingText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const userId = 2222; // 예시 ID 값, 실제 ID 값으로 대체

  useEffect(() => {
    if (open) {
      setMessages([{ text: '', sender: 'ai', clickable: false }]);
      setIsFirstInteraction(true);
      startTypingAnimation('안녕하세요! AI 도우미입니다. 무엇을 도와드릴까요?');
    }
  }, [open]);

  const startTypingAnimation = (text) => {
    setIsTyping(true);
    let index = 0;
    const interval = setInterval(() => {
      setTypingText(text.slice(0, index + 1));
      index += 1;
      if (index === text.length) {
        clearInterval(interval);
        setIsTyping(false);
        setMessages((prevMessages) => {
          const newMessages = [...prevMessages];
          newMessages[0].text = text;
          return newMessages;
        });
        setTypingText('');
        showNextMessages();
      }
    }, 150); // 타이핑 속도 조절 (밀리초 단위)
  };

  const showNextMessages = () => {
    setTimeout(() => {
      setMessages((prevMessages) => [
        ...prevMessages,
        { text: '오늘 날씨에 맞는 메뉴를 추천해줘.', sender: 'user', clickable: true, id_Value: userId }
      ]);
    }, 500); // 0.5초 후에 첫 번째 메시지 추가

    setTimeout(() => {
      setMessages((prevMessages) => [
        ...prevMessages,
        { text: '김치찌개에 대해서 설명해줘.', sender: 'user', clickable: true, id_Value: userId }
      ]);
    }, 1000); // 1초 후에 두 번째 메시지 추가

    setTimeout(() => {
      setMessages((prevMessages) => [
        ...prevMessages,
        { text: '예산에 맞는 메뉴를 추천해줘.', sender: 'user', clickable: true, id_Value: userId }
      ]);
    }, 1500); // 1.5초 후에 세 번째 메시지 추가
  };

  const handleSendMessage = async (messageText, messageId = null) => {
    if (isFirstInteraction) {
      setMessages([]);
      setIsFirstInteraction(false);
    }

    const userMessage = { text: messageText, sender: 'user', id_Value: messageId || userId };
    setMessages(prevMessages => [...prevMessages, { text: messageText, sender: 'user' }]);
    setLoading(true);

    try {
      const response = await axios.post('http://localhost:8000/users/ai', userMessage);
      const aiMessage = { text: response.data.message, sender: 'ai' };
      setMessages(prevMessages => [...prevMessages, aiMessage]);
    } catch (error) {
      console.error('Error sending message:', error);
      setMessages(prevMessages => [...prevMessages, { text: '서버 응답 실패', sender: 'ai' }]);
    } finally {
      setLoading(false);
    }

    setNewMessage('');
  };

  const handleBudgetSubmit = (budget) => {
    handleSendMessage(`예산에 맞는 메뉴를 추천해줘, 예산은 ${budget}원 이야.`);
  };

  const handleMessageClick = (message) => {
    if (message.text === '예산에 맞는 메뉴를 추천해줘.') {
      setBudgetModalOpen(true);
    } else {
      handleSendMessage(message.text, message.id_Value);
    }
  };

  return (
    <Dialog 
      open={open} 
      onClose={onClose} 
      fullWidth 
      maxWidth="sm" 
      PaperProps={{
        style: {
          minHeight: '700px',
          maxHeight: '700px',
          minWidth: '500px',
          maxWidth: '500px',
        },
      }}
    >
      <DialogTitle>{"AI 도우미 채팅"}</DialogTitle>
      <DialogContent style={{ padding: 0 }}>
        <Box style={{ height: '500px', overflowY: 'auto', padding: '16px' }}>
          {messages.map((message, index) => (
            <Box 
              key={index} 
              onClick={() => message.clickable && handleMessageClick(message)}
            >
              {index === 0 && isTyping ? (
                <ChatBubble message={{ text: typingText, sender: 'ai' }} />
              ) : (
                <ChatBubble message={message} />
              )}
            </Box>
          ))}
          {loading && (
            <Box style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '10px' }}>
              <CircularProgress />
            </Box>
          )}
        </Box>
      </DialogContent>
      <DialogActions style={{ display: 'flex', alignItems: 'center' }}>
        <TextField
          autoFocus
          margin="dense"
          id="newMessage"
          label="메시지 입력"
          type="text"
          variant="outlined"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyPress={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault();
              handleSendMessage(newMessage);
            }
          }}
          style={{ flex: 1, marginRight: '8px' }}
        />
        <Button 
          onClick={() => handleSendMessage(newMessage)} 
          color="primary" 
          variant="contained" 
          endIcon={<SendIcon />} 
          style={{ height: '100%' }}
        >
          보내기
        </Button>
        <Button onClick={onClose} color="primary" style={{ marginLeft: '8px' }}>
          닫기
        </Button>
      </DialogActions>
      <BudgetModal 
        open={budgetModalOpen} 
        onClose={() => setBudgetModalOpen(false)} 
        onSubmit={handleBudgetSubmit} 
      />
    </Dialog>
  );
}

export default ChatModal;
