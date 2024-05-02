import React from 'react';
import { Button, Modal, Typography, List, ListItem, ListItemText, Divider, AppBar, Toolbar, IconButton } from '@material-ui/core';
// import CloseIcon from '@material-ui/icons/Close'

const CartForm = ({ cart, open, handleClose }) => {
  // Calculate total price
  const totalPrice = cart.reduce((acc, item) => acc + parseInt(item.price.replace(/,/g, '').replace('원', '')), 0);

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description"
    >
      <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', backgroundColor: 'white', padding: 20, boxShadow: '0px 2px 10px rgba(0,0,0,0.1)', width: 400 }}>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" style={{ flexGrow: 1 }}>
              Your Cart
            </Typography>
            <IconButton edge="end" color="inherit" onClick={handleClose}>
              {/* <CloseIcon /> Uncomment and import CloseIcon if it's installed */}
            </IconButton>
          </Toolbar>
        </AppBar>
        <List>
          {cart.map((item, index) => (
            <React.Fragment key={index}>
              <ListItem>
                <ListItemText primary={item.title} secondary={`Price: ${item.price}`} />
              </ListItem>
              <Divider />
            </React.Fragment>
          ))}
          <ListItem>
            <ListItemText primary="Total" secondary={`₩${totalPrice.toLocaleString()}`} />
          </ListItem>
        </List>
        <Button variant="contained" color="primary" fullWidth onClick={handleClose}>
          Checkout
        </Button>
      </div>
    </Modal>
  );
}

export default CartForm;
