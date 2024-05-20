// region UserForm(API) 요청 코드
// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { AppBar, Button, Card, CardActions, CardContent, CardMedia, CssBaseline, Grid, Typography, Drawer, List, ListItem, ListItemSecondaryAction, ListItemText, Badge, Divider, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions  } from '@material-ui/core';
// import IconButton from '@mui/material/IconButton';
// import DeleteIcon from '@mui/icons-material/Delete';
// import './UserForm.css';
// import { ProductsByUserId } from '../../apis/auth.js';

// const UserForm = () => {
//   const [cart, setCart] = useState([]);
//   const [cartOpen, setCartOpen] = useState(false);
//   const [cards, setCards] = useState([]);
//   const [openModal, setOpenModal] = useState(false); // 모달 상태 관리
//   const [apiResponse, setApiResponse] = useState('');
//   const [totalPrice, setTotalPrice] = useState(0);

//   useEffect(() => {
//     const userId = 2222; // 예시로 사용할 사용자 ID
//     ProductsByUserId(userId)
//       .then(data => {
//         setCards(data.map(item => ({
//           id: item[0], // API 응답에 따라 필드명을 확인하고 수정해야 할 수 있습니다.
//           description: item[4],
//           title: item[5],
//           price: item[6],
//           // price: `${item[6]}원`,
//           //image: item[7],
//           image: item.image,
//           editable: false
//         })));
//       })
//       .catch(error => console.error('Error loading products:', error));
//   }, []);

//   const handleOpenModal = async () => {
//     try {
//       const response = await axios.post('http://61.81.99.104:8000/users/ai', { /* 필요한 데이터 */ });
//       setApiResponse(response.data); // API 응답 저장
//       setOpenModal(true); // 모달 열기
//     } catch (error) {
//       console.error('API 호출 중 오류 발생:', error);
//       setApiResponse('데이터를 불러오는데 실패했습니다.');
//       setOpenModal(true);
//     }
//   };

//   const handleCloseModal = () => {
//     setOpenModal(false); // 모달 닫기
//   };

//   const handleCartToggle = () => {
//     setCartOpen(!cartOpen);
//   };

//   const addToCart = (card) => {
//     const newCart = [...cart, card];
//     setCart(newCart);
//     updateTotalPrice(newCart);
//   };

//   const removeFromCart = (index) => {
//     const newCart = cart.filter((item, i) => i !== index);
//     setCart(newCart);
//     updateTotalPrice(newCart);
//   };

//   const handleCheckout = () => {
//     console.log('Proceeding to checkout');
//     alert(`Proceeding to checkout... Total: ${totalPrice}원`);
//   };

//   const updateTotalPrice = (currentCart) => {
//     const total = currentCart.reduce((sum, item) => sum + item.price, 0);
//     setTotalPrice(total);
//   };

//   return (
//     <React.Fragment>
//       <CssBaseline />
//       <AppBar position="static" className="appBar">
//         <Typography variant="h6" color="inherit" align="center">
//           사용자 페이지
//         </Typography>
//         <Button onClick={handleOpenModal}>
//           AI 도우미(음성안내)
//         </Button>
//       </AppBar>
//       <main>
//         <div className="layout cardGrid">
//           <Grid container spacing={2}>
//             {cards.map(card => (
//               <Grid item key={card.id} sm={6} md={4} lg={3}>
//                 <Card className="card">
//                   <CardMedia className="cardMedia" image={card.image} title={card.title} />
//                   <CardContent>
//                     <Typography gutterBottom variant="h5" component="h2">
//                       {card.title}
//                     </Typography>
//                     <Typography>
//                       {card.description}
//                     </Typography>
//                     <Typography color="textSecondary">
//                       가격: {card.price}
//                     </Typography>
//                   </CardContent>
//                   <CardActions>
//                     <Button size="small" color="primary" onClick={() => addToCart(card)}>
//                       Add to Cart
//                     </Button>
//                   </CardActions>
//                 </Card>
//               </Grid>
//             ))}
//           </Grid>
//         </div>
//         <Button variant="contained" color="secondary" onClick={handleCartToggle} style={{ position: 'fixed', bottom: 20, right: 20 }}>
//           <Badge badgeContent={cart.length} color="error">
//             Cart
//           </Badge>
//         </Button>
//       </main>
//       <Drawer anchor="right" open={cartOpen} onClose={handleCartToggle}>
//         <List style={{ width: '250px' }}>
//           <ListItem>
//             <ListItemText primary="Shopping Cart" />
//           </ListItem>
//           <Divider />
//           {cart.map((item, index) => (
//             <ListItem key={index}>
//               <ListItemText primary={item.title} secondary={`Price: ${item.price}`} />
//               <ListItemSecondaryAction>
//                 <IconButton edge="end" onClick={() => removeFromCart(index)} aria-label="delete">
//                   <DeleteIcon />
//                 </IconButton>
//               </ListItemSecondaryAction>
//             </ListItem>
//           ))}
//           <Divider />
//           <Dialog open={openModal} onClose={handleCloseModal}>
//             <DialogTitle>{"AI 음성 안내"}</DialogTitle>
//             <DialogContent>
//               <DialogContentText>
//                 {apiResponse || "데이터를 불러오는 중..."}
//               </DialogContentText>
//             </DialogContent>
//             <DialogActions>
//               <Button onClick={handleCloseModal} color="primary">
//                 닫기
//               </Button>
//             </DialogActions>
//           </Dialog>
//           <ListItem>
//             <Button color="primary" variant="contained" fullWidth onClick={handleCheckout}>
//               Pay (total : {totalPrice}원)
//             </Button>
//           </ListItem>
//         </List>
//       </Drawer>
      
//       <footer className="footer">
//         {/* Footer content */}
//       </footer>
//     </React.Fragment>
//   );
// }

// export default UserForm;

//endregion

// region ID 고정값 요청 코드
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {AppBar, Button, Card, CardActions, CardContent, CardMedia, CssBaseline, Grid, Typography, Drawer, List, ListItem, ListItemSecondaryAction, ListItemText, Badge, Divider, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, IconButton} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import './UserForm.css';
import { ProductsByUserId } from '../../apis/auth.js';

const UserForm = () => {
  const [cart, setCart] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [cards, setCards] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [apiResponse, setApiResponse] = useState('');
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    const userId = 2222; // 예시로 사용할 사용자 ID
    ProductsByUserId(userId)
      .then(data => {
        setCards(data.map(item => ({
          id: item[0], // API 응답에 따라 필드명을 확인하고 수정해야 할 수 있습니다.
          description: item[4],
          title: item[5],
          price: item[6],
          // price: `${item[6]}원`,
          //image: item[7],
          image: item.image,
          editable: false
        })));
      })
      .catch(error => console.error('Error loading products:', error));
  }, []);

  const handleOpenModal = async () => {
    try {
      const response = await axios.post('http://61.81.99.104:8000/users/ai', { /* 필요한 데이터 */ });
      setApiResponse(response.data); // API 응답 저장
      setOpenModal(true); // 모달 열기
    } catch (error) {
      console.error('API 호출 중 오류 발생:', error);
      setApiResponse('데이터를 불러오는데 실패했습니다.');
      setOpenModal(true);
    }
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
    alert(`Proceeding to checkout... Total: ${totalPrice}원`);
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
                      {card.description}
                    </Typography>
                    <Typography color="textSecondary">
                      가격: {card.price}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button size="small" color="primary" onClick={() => addToCart(card)}>
                      Add to Cart
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
            <ListItemText primary="Shopping Cart" />
          </ListItem>
          <Divider />
          {cart.map((item, index) => (
            <ListItem key={index}>
              <ListItemText primary={item.title} secondary={`Price: ${item.price}`} />
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
              Pay (total : {totalPrice}원)
            </Button>
          </ListItem>
        </List>
      </Drawer>
      <Dialog open={openModal} onClose={handleCloseModal}>
        <DialogTitle>{"AI 음성 안내"}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {apiResponse || "데이터를 불러오는 중..."}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseModal} color="primary">
            닫기
          </Button>
        </DialogActions>
      </Dialog>
      <footer className="footer">
        {/* Footer content */}
      </footer>
    </React.Fragment>
  );
}

export default UserForm;
//endregion