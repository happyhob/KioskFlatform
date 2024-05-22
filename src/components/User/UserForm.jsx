import React, { useState, useEffect } from 'react';
import { AppBar, Button, Card, CardActions, CardContent, CardMedia, CssBaseline, Grid, Typography, Drawer, List, ListItem, ListItemSecondaryAction, ListItemText, Badge, Divider, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import './UserForm.css';
import { ProductsByUserId } from '../../apis/auth.js';
import ChatModal from '../AIModal/ChatModal.js'; // 모달 컴포넌트 import

const UserForm = () => {
  const [cart, setCart] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [cards, setCards] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    const userId = 2222; // 예시로 사용할 사용자 ID
    ProductsByUserId(userId)
      .then(data => {
        setCards(data.map(item => {
          const imagePath = item[7].split('\\').pop(); // 파일명만 추출
          return {
            id: item[0], // API 응답에 따라 필드명을 확인하고 수정해야 할 수 있습니다.
            category: item[4],
            title: item[5],
            price: item[6],
            image: `/images/${imagePath}`, // 서버의 이미지 경로로 설정
            editable: false
          };
        }));
      })
      .catch(error => console.error('Error loading products:', error));
  }, []);

  const handleOpenModal = () => {
    setOpenModal(true); // 모달 열기
  };

  const handleCloseModal = () => {
    setOpenModal(false); // 모달 닫기
  };

  const handleCartToggle = () => {
    setCartOpen(!cartOpen);
  };

  const addToCart = (card) => {
    const newCart = [...cart, card];
    setCart(newCart);
    updateTotalPrice(newCart);
  };

  const removeFromCart = (index) => {
    const newCart = cart.filter((item, i) => i !== index);
    setCart(newCart);
    updateTotalPrice(newCart);
  };

  const handleCheckout = () => {
    console.log('Proceeding to checkout');
    alert(`Proceeding to checkout... 총합: ${totalPrice}원`);
  };

  const updateTotalPrice = (currentCart) => {
    const total = currentCart.reduce((sum, item) => sum + item.price, 0);
    setTotalPrice(total);
  };

  return (
    <React.Fragment>
      <CssBaseline />
      <AppBar position="static" className="appBar">
        <Typography variant="h6" color="inherit" align="center">
          사용자 페이지
        </Typography>
        <Button color="inherit" onClick={handleOpenModal}>
          AI 도우미(음성안내)
        </Button>
      </AppBar>
      <main>
        <div className="layout cardGrid">
          <Grid container spacing={2}>
            {cards.map(card => (
              <Grid item key={card.id} sm={6} md={4} lg={3}>
                <Card className="card">
                  <CardMedia className="cardMedia" image={card.image} title={card.title} />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                      {card.title}
                    </Typography>
                    <Typography>
                    {card.category}
                    </Typography>
                    <Typography color="textSecondary">
                      가격: {card.price}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button size="small" color="primary" onClick={() => addToCart(card)}>
                      장바구니 추가
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </div>
        <Button variant="contained" color="secondary" onClick={handleCartToggle} style={{ position: 'fixed', bottom: 20, right: 20 }}>
          <Badge badgeContent={cart.length} color="error">
            Cart
          </Badge>
        </Button>
      </main>
      <Drawer anchor="right" open={cartOpen} onClose={handleCartToggle}>
        <List style={{ width: '250px' }}>
          <ListItem>
            <ListItemText primary="장바구니" />
          </ListItem>
          <Divider />
          {cart.map((item, index) => (
            <ListItem key={index}>
              <ListItemText primary={item.title} secondary={`가격: ${item.price}`} />
              <ListItemSecondaryAction>
                <IconButton edge="end" onClick={() => removeFromCart(index)} aria-label="delete">
                  <DeleteIcon />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          ))}
          <Divider />
          <ListItem>
            <Button color="primary" variant="contained" fullWidth onClick={handleCheckout}>
              결제금액 (총합 : {totalPrice}원)
            </Button>
          </ListItem>
        </List>
      </Drawer>
      <ChatModal open={openModal} onClose={handleCloseModal} />
      <footer className="footer">
        {/* Footer content */}
      </footer>
    </React.Fragment>
  );
}

export default UserForm;