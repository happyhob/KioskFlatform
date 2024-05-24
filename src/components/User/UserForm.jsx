import React, { useState, useEffect } from 'react';
import { AppBar, Toolbar, Button, Card, CardActions, CardContent, CardMedia, CssBaseline, Grid, Typography, Drawer, List, ListItem, ListItemSecondaryAction, ListItemText, Badge, Divider, IconButton, Container, Box } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import AssistantIcon from '@mui/icons-material/Assistant';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import './UserForm.css';
import { ProductsByUserId } from '../../apis/auth.js';
import ChatModal from '../AIModal/ChatModal.js'; // 모달 컴포넌트 import

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
    background: {
      default: '#f5f5f5',
    },
  },
  typography: {
    fontFamily: 'Roboto, Arial, sans-serif',
  },
});

const UserForm = () => {
  const [cart, setCart] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [cards, setCards] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    const userId = 3333; // 예시로 사용할 사용자 ID
    ProductsByUserId(userId)
      .then(data => {
        console.log('Loaded data:', data); // 데이터 확인을 위한 로그 추가
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
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppBar position="static" sx={{ backgroundColor: 'black' }}>
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            상품 주문
          </Typography>
          <IconButton color="inherit" onClick={handleCartToggle}>
            <Badge badgeContent={cart.length} color="secondary">
              <ShoppingCartIcon />
            </Badge>
          </IconButton>
        </Toolbar>
      </AppBar>
      <Box sx={{ background: 'gray', height: '300px' }}></Box>
      <Container className="cardGrid" maxWidth="md">
        <Grid container spacing={4} style={{ marginTop: '20px' }}>
          {cards.map(card => (
            <Grid item key={card.id} xs={12} sm={6} md={4}>
              <Card className="card" sx={{ boxShadow: 3, transition: 'transform 0.3s', '&:hover': { transform: 'scale(1.05)' } }}>
                <CardMedia
                  component="img"
                  className="cardMedia"
                  image={card.image}
                  title={card.title}
                />
                <CardContent className="cardContent">
                  <Typography gutterBottom variant="h5">
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
                <Button
                    size="small"
                    variant="outlined"
                    onClick={() => addToCart(card)}
                    sx={{
                      color: 'black',
                      borderColor: 'black',
                      '&:hover': {
                        borderColor: '#333',
                        backgroundColor: '#f0f0f0',
                      }
                    }}
                  >
                    장바구니 추가
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
        <Button 
          color="inherit" 
          onClick={handleOpenModal} 
          style={{ position: 'fixed', bottom: 20, right: 110 }}
          sx={{
            background: 'linear-gradient(45deg, #333 30%, #555 90%)',
            borderRadius: 3,
            border: 0,
            color: 'white',
            height: 48,
            padding: '0 30px',
            boxShadow: '0 3px 5px 2px rgba(50, 50, 50, .3)',
          }}
        >
          <AssistantIcon />
          AI 도우미(음성안내)
        </Button>
        <Button 
          variant="contained" 
          color="secondary" 
          onClick={handleCartToggle} 
          style={{ position: 'fixed', bottom: 20, right: 20 }}
          sx={{
            background: 'linear-gradient(45deg, #333 30%, #555 90%)',
            borderRadius: 3,
            border: 0,
            color: 'white',
            height: 48,
            padding: '0 30px',
            boxShadow: '0 3px 5px 2px rgba(50, 50, 50, .3)',
          }}
        >
          <Badge badgeContent={cart.length} color="error">
            <ShoppingCartIcon />
          </Badge>
        </Button>
      </Container>
      <Drawer anchor="right" open={cartOpen} onClose={handleCartToggle}>
        <List style={{ width: '300px' }}>
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
              Pay (total: {totalPrice}원)
            </Button>
          </ListItem>
        </List>
      </Drawer>
      <ChatModal open={openModal} onClose={handleCloseModal} />
      {/* <footer className="footer">
        <Typography variant="body2" color="textSecondary" align="center">
          {'© '}
          My Shop {new Date().getFullYear()}
          {'.'}
        </Typography>
      </footer> */} 
    </ThemeProvider>
  );
}

 export default UserForm;


// import React, { useState, useEffect } from 'react';
// import { AppBar, Toolbar, Button, Card, CardActions, CardContent, CardMedia, CssBaseline, Grid, Typography, Drawer, List, ListItem, ListItemSecondaryAction, ListItemText, Badge, Divider, IconButton, Container, Box, CircularProgress } from '@mui/material';
// import DeleteIcon from '@mui/icons-material/Delete';
// import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
// import AssistantIcon from '@mui/icons-material/Assistant';
// import { createTheme, ThemeProvider } from '@mui/material/styles';
// import './UserForm.css';
// import { ProductsByUserId } from '../../apis/auth.js';
// import ChatModal from '../AIModal/ChatModal.js'; // 모달 컴포넌트 import

// const theme = createTheme({
//   palette: {
//     primary: {
//       main: '#1976d2',
//     },
//     secondary: {
//       main: '#dc004e',
//     },
//     background: {
//       default: '#f5f5f5',
//     },
//   },
//   typography: {
//     fontFamily: 'Roboto, Arial, sans-serif',
//   },
// });

// const UserForm = () => {
//   const [cart, setCart] = useState([]);
//   const [cartOpen, setCartOpen] = useState(false);
//   const [cards, setCards] = useState([]);
//   const [openModal, setOpenModal] = useState(false);
//   const [totalPrice, setTotalPrice] = useState(0);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const userId = 3333; // 예시로 사용할 사용자 ID
//     ProductsByUserId(userId)
//       .then(data => {
//         console.log('Loaded data:', data); // 데이터 확인을 위한 로그 추가
//         setCards(data.map(item => {
//           const imagePath = item[7].split('\\').pop(); // 파일명만 추출
//           return {
//             id: item[0], // API 응답에 따라 필드명을 확인하고 수정해야 할 수 있습니다.
//             category: item[4],
//             title: item[5],
//             price: item[6],
//             image: `/images/${imagePath}`, // 서버의 이미지 경로로 설정
//             editable: false
//           };
//         }));
//         setLoading(false);
//       })
//       .catch(error => {
//         console.error('Error loading products:', error);
//         setError(error);
//         setLoading(false);
//       });
//   }, []);

//   const handleOpenModal = () => {
//     setOpenModal(true); // 모달 열기
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
//     alert(`Proceeding to checkout... 총합: ${totalPrice}원`);
//   };

//   const updateTotalPrice = (currentCart) => {
//     const total = currentCart.reduce((sum, item) => sum + item.price, 0);
//     setTotalPrice(total);
//   };

//   if (loading) {
//     return <CircularProgress />;
//   }

//   if (error) {
//     return <Typography color="error">Error: {error.message}</Typography>;
//   }

//   return (
//     <ThemeProvider theme={theme}>
//       <CssBaseline />
//       <AppBar position="static" sx={{ backgroundColor: 'black' }}>
//         <Toolbar>
//           <Typography variant="h6" sx={{ flexGrow: 1 }}>
//             상품 주문
//           </Typography>
//           <IconButton color="inherit" onClick={handleCartToggle}>
//             <Badge badgeContent={cart.length} color="secondary">
//               <ShoppingCartIcon />
//             </Badge>
//           </IconButton>
//         </Toolbar>
//       </AppBar>
//       <Box sx={{ background: 'gray', height: '300px' }}></Box>
//       <Container className="cardGrid" maxWidth="md">
//         <Grid container spacing={4} style={{ marginTop: '20px' }}>
//           {cards.map(card => (
//             <Grid item key={card.id} xs={12} sm={6} md={4}>
//               <Card className="card" sx={{ boxShadow: 3, transition: 'transform 0.3s', '&:hover': { transform: 'scale(1.05)' } }}>
//                 <CardMedia
//                   component="img"
//                   className="cardMedia"
//                   image={card.image}
//                   title={card.title}
//                 />
//                 <CardContent className="cardContent">
//                   <Typography gutterBottom variant="h5">
//                     {card.title}
//                   </Typography>
//                   <Typography>
//                     {card.category}
//                   </Typography>
//                   <Typography color="textSecondary">
//                     가격: {card.price}
//                   </Typography>
//                 </CardContent>
//                 <CardActions>
//                   <Button
//                     size="small"
//                     variant="outlined"
//                     onClick={() => addToCart(card)}
//                     sx={{
//                       color: 'black',
//                       borderColor: 'black',
//                       '&:hover': {
//                         borderColor: '#333',
//                         backgroundColor: '#f0f0f0',
//                       }
//                     }}
//                   >
//                     장바구니 추가
//                   </Button>
//                 </CardActions>
//               </Card>
//             </Grid>
//           ))}
//         </Grid>
//         <Button 
//           color="inherit" 
//           onClick={handleOpenModal} 
//           style={{ position: 'fixed', bottom: 20, right: 110 }}
//           sx={{
//             background: 'linear-gradient(45deg, #333 30%, #555 90%)',
//             borderRadius: 3,
//             border: 0,
//             color: 'white',
//             height: 48,
//             padding: '0 30px',
//             boxShadow: '0 3px 5px 2px rgba(50, 50, 50, .3)',
//           }}
//         >
//           <AssistantIcon />
//           AI 도우미(음성안내)
//         </Button>
//         <Button 
//           variant="contained" 
//           color="secondary" 
//           onClick={handleCartToggle} 
//           style={{ position: 'fixed', bottom: 20, right: 20 }}
//           sx={{
//             background: 'linear-gradient(45deg, #333 30%, #555 90%)',
//             borderRadius: 3,
//             border: 0,
//             color: 'white',
//             height: 48,
//             padding: '0 30px',
//             boxShadow: '0 3px 5px 2px rgba(50, 50, 50, .3)',
//           }}
//         >
//           <Badge badgeContent={cart.length} color="error">
//             <ShoppingCartIcon />
//           </Badge>
//         </Button>
//       </Container>
//       <Drawer anchor="right" open={cartOpen} onClose={handleCartToggle}>
//         <List style={{ width: '300px' }}>
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
//           <ListItem>
//             <Button color="primary" variant="contained" fullWidth onClick={handleCheckout}>
//               Pay (total: {totalPrice}원)
//             </Button>
//           </ListItem>
//         </List>
//       </Drawer>
//       <ChatModal open={openModal} onClose={handleCloseModal} />
//     </ThemeProvider>
//   );
// }

// export default UserForm;
