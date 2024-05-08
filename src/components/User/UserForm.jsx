import React, { useState } from 'react';
import { AppBar, Button, Card, CardActions, CardContent, CardMedia, CssBaseline, Grid, Typography, Drawer, List, ListItem, ListItemSecondaryAction, ListItemText, Badge, Divider } from '@material-ui/core';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import './UserForm.css';

const UserForm = () => {
  // const [open, setOpen] = useState(false);
  const [cart, setCart] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [cards, {/*setCards*/}] = useState([
    { id: 1, title: '한식', description: '메뉴 설명', price: '10,000원', editable: false },
    { id: 2, title: '중식', description: '메뉴 설명', price: '11,000원', editable: false },
    { id: 3, title: '일식', description: '메뉴 설명', price: '12,000원', editable: false },
    { id: 4, title: '양식', description: '메뉴 설명', price: '13,000원', editable: false },
    { id: 5, title: '분식', description: '메뉴 설명', price: '14,000원', editable: false },
    { id: 6, title: '학식', description: '메뉴 설명', price: '15,000원', editable: false },
    // 추가 카드 데이터...
  ]);

  const handleCartToggle = () => {
    setCartOpen(!cartOpen);
  };

  const addToCart = (card) => {
    setCart([...cart, card]);
  };

  const handleCheckout = () => {
    console.log('Proceeding to checkout');
    // Here you can add functionality to handle actual checkout logic
    alert('Proceeding to checkout...');
  };

  const removeFromCart = (index) => {
    setCart(currentCart => currentCart.filter((item, i) => i !== index));
  };

  return (
    <React.Fragment>
      <CssBaseline />
      <AppBar position="static" className="appBar">
        <Typography variant="h6" color="inherit" align="center">
          사용자 페이지
        </Typography>
        <Typography variant="h6" color="initial" align="center" onClick={() => ""}>
          AI 도우미(음성안내)
        </Typography>
      </AppBar>
      <main>
        <div className="layout cardGrid">
          <Grid container spacing={2}>
            {cards.map(card => (
              <Grid item key={card.id} sm={6} md={4} lg={3}>
                <Card className="card">
                  <CardMedia className="cardMedia" image="이미지 URL" title="Image title" />
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
              Pay
            </Button>
          </ListItem>
        </List>
      </Drawer>
      <footer className="footer">
        {/* Footer content */}
      </footer>
    </React.Fragment>
  );
}

export default UserForm;

//region UserForm(API) 요청 코드
// import React, { useState, useEffect } from 'react';
// import { AppBar, Button, Card, CardActions, CardContent, CardMedia, CssBaseline, Grid, Typography, Drawer, List, ListItem, ListItemSecondaryAction, ListItemText, Badge, Divider } from '@material-ui/core';
// import IconButton from '@mui/material/IconButton';
// import DeleteIcon from '@mui/icons-material/Delete';
// import './UserForm.css';
// import { ProductsByUserId } from '../../apis/auth.js';

// const UserForm = () => {
//   const [cart, setCart] = useState([]);
//   const [cartOpen, setCartOpen] = useState(false);
//   const [cards, setCards] = useState([]);

//   useEffect(() => {
//     const userId = 2222; // 예시로 사용할 사용자 ID
//     ProductsByUserId(userId)
//       .then(data => {
//         setCards(data.map(item => ({
//           id: item.product_id, // API 응답에 따라 필드명을 확인하고 수정해야 할 수 있습니다.
//           title: item.product_name,
//           description: item.categoryName,
//           price: `${item.price}원`,
//           image: item.image,
//           editable: false
//         })));
//       })
//       console
//       .catch(error => console.error('Error loading products:', error));
//   }, []);

//   const handleCartToggle = () => {
//     setCartOpen(!cartOpen);
//   };

//   const addToCart = (card) => {
//     setCart([...cart, card]);
//   };

//   const handleCheckout = () => {
//     console.log('Proceeding to checkout');
//     alert('Proceeding to checkout...');
//   };

//   const removeFromCart = (index) => {
//     setCart(currentCart => currentCart.filter((item, i) => i !== index));
//   };

//   return (
//     <React.Fragment>
//       <CssBaseline />
//       <AppBar position="static" className="appBar">
//         <Typography variant="h6" color="inherit" align="center">
//           사용자 페이지
//         </Typography>
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
//           <ListItem>
//             <Button color="primary" variant="contained" fullWidth onClick={handleCheckout}>
//               Pay
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
