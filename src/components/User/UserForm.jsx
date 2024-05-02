import React, { useState } from 'react';
import { AppBar, Button, Card, CardActions, CardContent, CardMedia, CssBaseline, Grid, Typography, Drawer, List, ListItem, ListItemText, Badge, Divider } from '@material-ui/core';
import './UserForm.css';

const UserForm = () => {
  const [open, setOpen] = useState(false);
  const [cart, setCart] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [cards, setCards] = useState([
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

  return (
    <React.Fragment>
      <CssBaseline />
      <AppBar position="static" className="appBar">
        <Typography variant="h6" color="inherit" align="center">
          사용자 페이지
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



// import React, { useEffect, useState } from 'react';
// import PropTypes from 'prop-types';
// import classNames from 'classnames';
// import AppBar from '@material-ui/core/AppBar';
// import Card from '@material-ui/core/Card';
// import CardActions from '@material-ui/core/CardActions';
// import CardContent from '@material-ui/core/CardContent';
// import CardMedia from '@material-ui/core/CardMedia';
// import CssBaseline from '@material-ui/core/CssBaseline';
// import Grid from '@material-ui/core/Grid';
// import Typography from '@material-ui/core/Typography';
// import Button from '@material-ui/core/Button';
// import { withStyles } from '@material-ui/core/styles';

// // 스타일 설정 업데이트
// const styles = theme => ({
//   appBar: {
//     position: 'relative',
//   },
//   layout: {
//     width: 'auto',
//     marginLeft: theme.spacing(3),
//     marginRight: theme.spacing(3),
//     [theme.breakpoints.up(1100 + theme.spacing(3) * 2)]: {
//       width: 1100,
//       marginLeft: 'auto',
//       marginRight: 'auto',
//     },
//   },
//   cardGrid: {
//     padding: theme.spacing(8, 0),
//   },
//   card: {
//     height: '100%',
//     display: 'flex',
//     flexDirection: 'column',
//   },
//   cardMedia: {
//     paddingTop: '56.25%', // 16:9 비율
//   },
//   cardContent: {
//     flexGrow: 1,
//   },
//   footer: {
//     backgroundColor: theme.palette.background.paper,
//     padding: theme.spacing(6),
//   },
// });

// function Album(props) {
//   const { classes } = props;
//   const [menuItems, setMenuItems] = useState([]); // 메뉴 데이터 상태 관리

//   useEffect(() => {
//     fetchMenuData(); // 컴포넌트 마운트 시 메뉴 데이터 가져오기
//   }, []);

//   // 메뉴 데이터를 API에서 가져오는 함수
//   const fetchMenuData = async () => {
//     try {
//       const response = await fetch('API_ENDPOINT');
//       const data = await response.json();
//       setMenuItems(data.menuItems); // API 응답에서 메뉴 데이터 설정
//     } catch (error) {
//       console.error('Fetching menu data failed', error);
//     }
//   };

//   return (
//     <React.Fragment>
//       <CssBaseline />
//       <AppBar position="static" className={classes.appBar}>
//         {/* AppBar 내용 생략 */}
//       </AppBar>
//       <main>
//         <div className={classNames(classes.layout, classes.cardGrid)}>
//           {/* 그리드 컨테이너 시작 */}
//           <Grid container spacing={2}>
//             {menuItems.map((item, index) => (
//               <Grid item key={index} sm={6} md={4} lg={3}>
//                 <Card className={classes.card}>
//                   <CardMedia
//                     className={classes.cardMedia}
//                     image={item.imageUrl} // 이미지 URL
//                     title={item.name} // 이미지 제목
//                   />
//                   <CardContent className={classes.cardContent}>
//                     <Typography gutterBottom variant="h5" component="h2">
//                       {item.name} // 메뉴 이름
//                     </Typography>
//                     <Typography>
//                       ₩{item.price} // 가격
//                     </Typography>
//                   </CardContent>
//                   <CardActions>
//                     <Button size="small" color="primary">
//                       View
//                     </Button>
//                     <Button size="small" color="primary">
//                       Edit
//                     </Button>
//                   </CardActions>
//                 </Card>
//               </Grid>
//             ))}
//           </Grid>
//         </div>
//       </main>
//       <footer className={classes.footer}>
//         {/* 푸터 내용 생략 */}
//       </footer>
//     </React.Fragment>
//   );
// }

// Album.propTypes = {
//   classes: PropTypes.object.isRequired,
// };

// export default withStyles(styles)(Album);
