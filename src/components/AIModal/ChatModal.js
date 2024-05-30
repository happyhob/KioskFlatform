
import React, { useState, useEffect, useCallback } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  CircularProgress,
  Box,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import MicIcon from "@mui/icons-material/Mic";
import axios from "axios";
import ChatBubble from "./ChatBubble";
import BudgetModal from "./BudgetModal";
import useSpeechRecognition from "./useSpeechRecognition";
import "./ChatModal.css";

const ChatModal = ({ open, onClose, cart, totalAmount, setCart }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [isFirstInteraction, setIsFirstInteraction] = useState(true);
  const [loading, setLoading] = useState(false);
  const [budgetModalOpen, setBudgetModalOpen] = useState(false);
  const [typingText, setTypingText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [awaitingItemInput, setAwaitingItemInput] = useState(false);
  const userId = 2222;

  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const {
    startSpeechRecognition,
    stopSpeechRecognition,
    restartSpeechRecognition,
    isListening,
  } = useSpeechRecognition(
    (speechResult) => {
      const finalMessage = awaitingItemInput
        ? `${speechResult} 담아줘.`
        : speechResult;
      setNewMessage(finalMessage);
      handleSendMessage(finalMessage);
    },
    (event) => {
      console.error("Speech recognition error", event);
    }
  );

  const startTypingAnimation = useCallback((text) => {
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
        setTypingText("");
        showNextMessages();
      }
    }, 150);
  }, []);

  useEffect(() => {
    if (open && isFirstInteraction) {
      setMessages([{ text: "", sender: "ai", clickable: false }]);
      setIsFirstInteraction(false);
      startTypingAnimation("안녕하세요! AI 도우미입니다. 무엇을 도와드릴까요?");
    }
  }, [open, isFirstInteraction, startTypingAnimation]);

  const showNextMessages = () => {
    const predefinedMessages = [
      "ex)오늘 날씨에 맞는 메뉴를 추천해 줘.",
      "ex)김치찌개에 대해서 설명해 줘.",
      "ex)예산에 맞는 메뉴를 추천해 줘.",
      "ex)다른 명령어는 뭐가 있어?",
      "ex)장바구니에 물건을 담고 싶어",
    ];

    setMessages((prevMessages) => [
      ...prevMessages,
      ...predefinedMessages.map((message) => ({
        text: message,
        sender: "user",
        clickable: true,
        id_Value: userId,
      })),
    ]);

    restartSpeechRecognition();
  };

  const speak = (text) => {
    if ("speechSynthesis" in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = "ko-KR"; // 한국어 설정
      window.speechSynthesis.speak(utterance);
    } else {
      console.error("TTS is not supported in this browser.");
    }
  };

  const handleSendMessage = async (
    messageText,
    messageId = null,
    paymentData = null
  ) => {
    if (isFirstInteraction) {
      setMessages([]);
      setIsFirstInteraction(false);
    }

    const userMessage = {
      text: messageText,
      sender: "user",
      id_Value: messageId || userId,
      paymentData: paymentData || null,
    };

    if (awaitingItemInput) {
      const items = [messageText.replace(" 담아줘.", "").trim()];
      const addToCartRequest = {
        user_id: userId,
        items: items,
      };
      userMessage.items = addToCartRequest.items;
      userMessage.user_id = addToCartRequest.user_id;
    }

    setMessages((prevMessages) => [
      ...prevMessages,
      { text: messageText, sender: "user" },
    ]);
    setLoading(true);

    try {
      const endpoint = awaitingItemInput
        ? "http://61.81.99.104:8000/users/addToCart"
        : messageText === "ex)장바구니에 있는 물건들 결제해줘."
        ? "http://61.81.99.104:8000/users/paymentAPI"
        : "http://61.81.99.104:8000/users/ai";

      const requestData = awaitingItemInput
        ? { user_id: userId, items: userMessage.items }
        : userMessage;

      const response = await axios.post(endpoint, requestData);
      const aiMessage = { text: response.data.message, sender: "ai" };
      setMessages((prevMessages) => [...prevMessages, aiMessage]);

      // AI 응답을 음성으로 출력
      speak(response.data.message);

      if (
        endpoint === "http://61.81.99.104:8000/users/addToCart" &&
        response.data.items
      ) {
        const productDetails = response.data.items.map((item) => ({
          title: item.product_name,
          price: item.price,
        }));
        setCart((prevCart) => [...prevCart, ...productDetails]);
        setAwaitingItemInput(false);
      }

      restartSpeechRecognition();
    } catch (error) {
      console.error("Error sending message:", error);
      setMessages((prevMessages) => [
        ...prevMessages,
        { text: "서버 응답 실패", sender: "ai" },
      ]);
      restartSpeechRecognition();
    } finally {
      setLoading(false);
    }

    setNewMessage("");
  };

  const handleBudgetSubmit = (budget) => {
    setBudgetModalOpen(false);
    handleSendMessage(`예산에 맞는 메뉴를 추천해줘, 예산은 ${budget}원 이야.`);
  };

  const handleMessageClick = (message) => {
    if (message.text === "ex)예산에 맞는 메뉴를 추천해줘.") {
      setBudgetModalOpen(true);
    } else if (message.text === "ex)장바구니에 있는 물건들 결제해줘.") {
      const paymentData = {
        item_name: cart.map((item) => item.title).join(", "),
        quantity: cart.length,
        total_amount: totalAmount,
      };
      handleSendMessage(message.text, message.id_Value, paymentData);
    } else if (message.text === "ex)다른 명령어는 뭐가 있어?") {
      setMessages([]);
      setTimeout(() => {
        const otherCommands = [
          "ex)오늘 날씨에 맞는 메뉴를 추천해 줘.",
          "ex)김치찌개에 대해서 설명해 줘.",
          "ex)예산에 맞는 메뉴를 추천해 줘.",
          "ex)장바구니에 있는 물건들 결제해 줘.",
          "ex)장바구니에 물건을 담고 싶어",
        ];

        setMessages(
          otherCommands.map((cmd) => ({
            text: cmd,
            sender: "ai",
            clickable: true,
          }))
        );
      }, 500);
    } else if (message.text === "ex)장바구니에 물건을 담고 싶어") {
      setMessages((prevMessages) => [
        ...prevMessages,
        {
          text: "장바구니에 물건을 담는 것을 도와드릴께요! 어떤 물건을 담을까요?",
          sender: "ai",
          clickable: false,
        },
      ]);
      setAwaitingItemInput(true);
    } else {
      handleSendMessage(message.text, message.id_Value);
    }
  };

  useEffect(() => {
    if (open) {
      startSpeechRecognition();
    } else {
      stopSpeechRecognition();
    }
  }, [open, startSpeechRecognition, stopSpeechRecognition]);

  return (
    <Dialog
      open={open}
      onClose={() => {
        setMessages([]);
        setIsFirstInteraction(true);
        stopSpeechRecognition();
        onClose();
      }}
      fullScreen={fullScreen}
      PaperProps={{
        style: {
          backgroundColor: "#f4eedd",
          borderRadius: "15px",
        },
      }}
    >
      <DialogTitle className="dialog-title">{"AI 도우미 채팅"}</DialogTitle>
      <DialogContent style={{ padding: 0 }}>
        <Box style={{ height: "auto", overflowY: "auto", padding: "16px" }}>
          {messages.map((message, index) => (
            <Box
              key={index}
              onClick={() => message.clickable && handleMessageClick(message)}
            >
              {index === 0 && isTyping ? (
                <ChatBubble message={{ text: typingText, sender: "ai" }} />
              ) : (
                <ChatBubble message={message} />
              )}
            </Box>
          ))}
          {loading && (
            <Box
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                padding: "10px",
              }}
            >
              <CircularProgress />
            </Box>
          )}
        </Box>
      </DialogContent>
      <DialogActions
        className="dialog-actions"
        style={{ backgroundColor: "#fff" }}
      >
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
            if (e.key === "Enter") {
              e.preventDefault();
              handleSendMessage(newMessage);
            }
          }}
          className="text-field"
        />
        <Button
          onClick={startSpeechRecognition}
          variant="contained"
          color="secondary"
          className="button-contained-secondary"
          endIcon={<MicIcon />}
        >
          음성 입력
        </Button>
        <Button
          onClick={onClose}
          variant="contained"
          color="secondary"
          className="button-contained-secondary"
        >
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
};

export default ChatModal;