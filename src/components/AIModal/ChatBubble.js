import React from 'react';
import { Typography, Box } from '@mui/material';

const ChatBubble = ({ message }) => {
  const isUser = message.sender === 'user';
  const align = isUser ? 'right' : 'left';

  return (
    <Box 
      sx={{
        display: 'flex',
        justifyContent: isUser ? 'flex-end' : 'flex-start',
        mb: 2
      }}
    >
      <Box 
        sx={{
          maxWidth: '70%',
          bgcolor: isUser ? '#fff' : '#e0e0e0',
          color: isUser ? '#000' : '#000',
          p: 2,
          borderRadius: 2,
          boxShadow: 1,
        }}
      >
        <Typography variant="body1">{message.text}</Typography>
      </Box>
    </Box>
  );
};

export default ChatBubble;
