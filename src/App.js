import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './page/adminpage/Home'
import Join from './page/adminpage/Join'
import Login from './page/adminpage/Login'
import Qr from './page/adminpage/Qr'
import MenuBar from './page/adminpage/Menubar';

import Registration from './page/adminpage/Registration'
//import LoginContextProvider from '../Context/LoginContextProvider';
import LoginContextProvider from './Context/LoginContextProvider';
import {BrowserView, MobileView} from "react-device-detect";
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';

function Item(props) {
  return (
    <div class="card">
      <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a3/Eq_it-na_pizza-margherita_sep2005_sml.jpg/640px-Eq_it-na_pizza-margherita_sep2005_sml.jpg" class="card-img-top" alt="..." />
      <div class="card-body">
        <h5 class="card-title">{props.name}</h5>
        <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
        <a href="#" class="btn btn-primary">Go somewhere</a>
      </div>
    </div>

  );
}


function Header(props){
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            News
          </Typography>
          <Button color="inherit">Login</Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}


{/*
<div className="row row-cols-1 row-cols-sm-2 row-colsp-md-3 g-3">
  <Item name="pizza"/>
  <Item/>
</div> > */}

function App() {
  return (
    <Router>
      <LoginContextProvider>
        <Routes>                   
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/registration" element={<Registration />} />
          <Route path="/join" element={<Join />} />
          <Route path="/qr" element={<Qr />} />
          <Route path="/menu" element={<MenuBar />} />
        </Routes>
      </LoginContextProvider>
    </Router>
  );
}

export default App;



// import React, {useState} from 'react';
// import Box from '@mui/material/Box';
// import Card from '@mui/material/Card';
// import CardActions from '@mui/material/CardActions';
// import CardContent from '@mui/material/CardContent';
// import Button from '@mui/material/Button';
// import Typography from '@mui/material/Typography';
// import TextField from '@mui/material/TextField';

// import { styled } from '@mui/material/styles';
// import Paper from '@mui/material/Paper';
// import Grid from '@mui/material/Grid';
// import { Home } from '@mui/icons-material';


// const Item = styled(Paper)(({ theme }) => ({
//   backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
//   ...theme.typography.body2,
//   padding: theme.spacing(1),
//   textAlign: 'center',
//   color: theme.palette.text.secondary,
// }));

// function RegistrationForm(props) {
  
//   const [categories, setCategories] = useState([]);
//   const [contents, setContents] = useState({});
//   const [selectedCategory, setSelectedCategory] = useState(null);
//   const [newCategoryText, setNewCategoryText] = useState('');
//   const [newContentText, setNewContentText] = useState('');

//   const handleAddCategoryClick = () => {
//     if (newCategoryText.trim() !== '') {
//       const newCategories = [...categories, newCategoryText];
//       setCategories(newCategories);
//       setContents({ ...contents, [newCategoryText]: [] });
//       setNewCategoryText('');
//     }
//   };

//   const handleRemoveCategoryClick = (categoryToRemove) => {
//     const newCategories = categories.filter(category => category !== categoryToRemove);
//     setCategories(newCategories);

//     if (selectedCategory === categoryToRemove) {
//       setSelectedCategory(null);
//     }

//     const newContents = { ...contents };
//     delete newContents[categoryToRemove];
//     setContents(newContents);
//   };

//   const handleAddContentClick = () => {
//     if (selectedCategory !== null && newContentText.trim() !== '') {
//       const newContents = { ...contents };
//       newContents[selectedCategory] = [...(newContents[selectedCategory] || []), newContentText];
//       setContents(newContents);
//       setNewContentText('');
//     }
//   };

//   const handleRemoveContentClick = (contentToRemove) => {
//     if (selectedCategory !== null && contents[selectedCategory].includes(contentToRemove)) {
//       const newContents = { ...contents };
//       newContents[selectedCategory] = newContents[selectedCategory].filter(content => content !== contentToRemove);
//       setContents(newContents);
//     }
//   };
//   return (
//     <>
//       <Box sx={{ flexGrow: 1 }}>
//       <Grid container spacing={2}>
//         {/* 가게정보입력 */}
//           <Grid item xs={6} md={12}>
//             <Item>
//               <label style={{ fontSize: '20px', color: 'RGB(150, 120, 100)', fontWeight: 'bold', marginRight: '40px' }}>가게정보입력</label>
//               <TextField
//                 id="standard-multiline-flexible"
//                 label="가게 이름"
//                 multilineㅈ
//                 maxRows={4}
//                 variant="standard"
//                 style={{ marginRight: '15px' }} // 오른쪽 마진 추가
//               />

//               <TextField
//                 id="standard-multiline-flexible"
//                 label="가게 주소"
//                 multiline
//                 maxRows={4}
//                 variant="standard"
//                 style={{ marginRight: '15px' }} // 오른쪽 마진 추가
//               />

//               <TextField
//                 id="standard-multiline-flexible"
//                 label="가게 업종"
//                 multiline
//                 maxRows={4}
//                 variant="standard"
//                 style={{ marginRight: '15px' }} // 오른쪽 마진 추가
//               />
//               <TextField
//                 id="standard-multiline-flexible"
//                 label="가게 번호(010-xxxx-xxxx)"
//                 multiline
//                 maxRows={4}
//                 variant="standard"
//                 style={{ marginRight: '15px' }} // 오른쪽 마진 추가
//               />

//               <Button
//                 size="large"
//                 style={{ margin: '10px' }} // 오른쪽 마진 추가
//               >등록</Button>
//             </Item>
//           </Grid>

//           <Grid item xs={6} md={12}>
//             <Item>
//               <TextField
//                 label="New Category"
//                 variant="outlined"
//                 size="small"
//                 value={newCategoryText}
//                 onChange={(e) => setNewCategoryText(e.target.value)}
//               />
//               <Button variant="outlined" style={{ marginRight: '50px', color: 'RGB(150, 100, 0)' }} size="large" onClick={handleAddCategoryClick}>
//                 Add Category
//               </Button>
//             </Item>
//           </Grid>

//           <Grid item xs={6} md={12}>
//             <Item>
//               {selectedCategory && (
//                 <Grid item xs={6} md={12}>
//                   <Item>
//                     <TextField
//                       label="New Content"
//                       variant="outlined"
//                       size="small"
//                       value={newContentText}
//                       onChange={(e) => setNewContentText(e.target.value)}
//                     />
//                     <Button variant="outlined" style={{ marginRight: '50px', color: 'RGB(150, 100, 0)' }} size="large" onClick={handleAddContentClick}>
//                       Add Content
//                     </Button>
//                   </Item>
//                 </Grid>
//               )}
//             </Item>

//             {categories.map((category, index) => (
//               <Button key={index} size="large" onClick={() => setSelectedCategory(category)} style={{ backgroundColor: selectedCategory === category ? 'lightblue' : 'white' }}>
//                 {category}
//                 <Button size="small" onClick={() => handleRemoveCategoryClick(category)}>X</Button>
//               </Button>
//             ))}
//           </Grid>

//           <Grid item xs={6} md={12} container direction="column">
//             {selectedCategory && contents[selectedCategory] && contents[selectedCategory].map((content, contentIndex) => (
//               <Grid item key={contentIndex}>
//                 <Button>{content}</Button>
//                 <Button variant="outlined" style={{ marginLeft: '10px' }} size="small" onClick={() => handleRemoveContentClick(content)}>Remove</Button>
//               </Grid>
//             ))}
//           </Grid>
//       </Grid>
//     </Box>
//     </>

//   );
// }

// export default RegistrationForm;