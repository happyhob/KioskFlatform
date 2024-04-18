import React, {useState} from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';

import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { Home } from '@mui/icons-material';
import axios from 'axios';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import DeleteIcon from '@mui/icons-material/Delete';

// //컴포넌트 스타일
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

//   //카테고리 추가
//   const handleAddCategoryClick = () => {
//     if (newCategoryText.trim() !== '') {            //새 카테고리 텍스트 empty확인
//       const newCategories = [...categories, newCategoryText];       //기존 배열 복사 후 새 카테고리 추가
//       setCategories(newCategories);                         //새로운 배열 추가
//       setContents({ ...contents, [newCategoryText]: [] });  //개존의 context 객체 복사 후, 카테고리 내용 빈배열 초기화
//       setNewCategoryText('');           //newCategoryText를 통해 초기화
//     }
//   };
//   //키테고리 삭제
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
//   //content 추가
//   const handleAddContentClick = () => {
//     if (selectedCategory !== null && newContentText.trim() !== '') {        //제거할 카테고리 필터링
//       const newContents = { ...contents };
//       newContents[selectedCategory] = [...(newContents[selectedCategory] || []), newContentText];
//       setContents(newContents);
//       setNewContentText('');
//     }
//   };
//   //content 삭제
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
//                 style={{ marginRight: '15px' }} 
//               />

//               <TextField
//                 id="standard-multiline-flexible"
//                 label="가게 주소"
//                 multiline
//                 maxRows={4}
//                 variant="standard"
//                 style={{ marginRight: '15px' }} 
//               />

//               <TextField
//                 id="standard-multiline-flexible"
//                 label="가게 업종"
//                 multiline
//                 maxRows={4}
//                 variant="standard"
//                 style={{ marginRight: '15px' }} 
//               />
//               <TextField
//                 id="standard-multiline-flexible"
//                 label="가게 번호(010-xxxx-xxxx)"
//                 multiline
//                 maxRows={4}
//                 variant="standard"
//                 style={{ marginRight: '15px' }} 
//               />

//               <Button
//                 size="large"
//                 style={{ margin: '10px' }} 
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

const RegistrationForm = () => {
  const [storeName, setStoreName] = useState('');
  const [storeAddress, setStoreAddress] = useState('');
  const [storeType, setStoreType] = useState('');
  const [selectedTab, setSelectedTab] = useState(0);
  const [categories, setCategories] = useState(['카테고리 1', '카테고리 2']);
  const [itemsByCategory, setItemsByCategory] = useState({
    '카테고리 1': [],
    '카테고리 2': [],   
  });

  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

  const handleAddItem = (category) => {
    const newItems = itemsByCategory[category].concat({ name: '', description: '', image: '' });
    setItemsByCategory({ ...itemsByCategory, [category]: newItems });
  };

  const handleItemFieldChange = (category, index, key, value) => {
    const updatedItems = [...itemsByCategory[category]];
    updatedItems[index] = { ...updatedItems[index], [key]: value };
    setItemsByCategory({ ...itemsByCategory, [category]: updatedItems });
  };


  const handleDeleteItem = (category, index) => {
    const newItems = itemsByCategory[category].filter((_, i) => i !== index);
    setItemsByCategory({ ...itemsByCategory, [category]: newItems });
  };

  const handleAddCategory = () => {
    const newCategoryName = `카테고리 ${categories.length + 1}`;
    setCategories(categories.concat(newCategoryName));
    setItemsByCategory({ ...itemsByCategory, [newCategoryName]: [] });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('/new', {
        storeName,
        storeAddress,
        storeType,
        itemsByCategory,
      });
      console.log(response.data);
    } catch (error) {
      console.error('Error posting store data', error);
    }
  };

  const selectedCategory = categories[selectedTab];
  const selectedCategoryItems = itemsByCategory[selectedCategory] || [];

  return (
    <Box sx={{ mt: 1, width: '100%' }}>
      <Box component="form" onSubmit={handleSubmit} noValidate>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs>
            <TextField
              margin="dense"
              required
              fullWidth
              id="store-name"
              label="가게 이름"
              name="storeName"
              autoComplete="store-name"
              value={storeName}
              onChange={(e) => setStoreName(e.target.value)}
              size="small"
            />
          </Grid>
          <Grid item xs>
            <TextField
              margin="dense"
              required
              fullWidth
              id="store-address"
              label="가게 주소"
              name="storeAddress"
              autoComplete="store-address"
              value={storeAddress}
              onChange={(e) => setStoreAddress(e.target.value)}
              size="small"
            />
          </Grid>
          <Grid item xs>
            <TextField
              margin="dense"
              required
              fullWidth
              id="store-type"
              label="가게 업종"
              name="storeType"
              autoComplete="store-type"
              value={storeType}
              onChange={(e) => setStoreType(e.target.value)}
              size="small"
            />
          </Grid>
        </Grid>
        <Divider sx={{ my: 2 }} /> {/* 구분선 추가 */}
        <Tabs value={selectedTab} onChange={handleTabChange} variant="scrollable" scrollButtons="auto">
          {categories.map((category, index) => (
            <Tab key={index} label={category} />
          ))}
          <Tab label="+" onClick={handleAddCategory} />
        </Tabs>

        {selectedCategoryItems.map((item, index) => (
          <Grid container spacing={2} key={index}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="음식 이름"
                value={item.name}
                onChange={(e) => handleItemFieldChange(selectedCategory, index, 'name', e.target.value)}
                size="small"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="음식 설명"
                value={item.description}
                onChange={(e) => handleItemFieldChange(selectedCategory, index, 'description', e.target.value)}
                size="small"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="이미지 URL"
                value={item.image}
                onChange={(e) => handleItemFieldChange(selectedCategory, index, 'image', e.target.value)}
                size="small"
              />
            </Grid>
            <Grid item xs={12}>
              <IconButton onClick={() => handleDeleteItem(selectedCategory, index)}>
                <DeleteIcon />
              </IconButton>
            </Grid>
          </Grid>
        ))}
        <Button startIcon={<AddCircleIcon />} onClick={() => handleAddItem(categories[selectedTab])}>
          아이템 추가
        </Button>

        <Button type="submit" variant="contained" sx={{ mt: 2 }}>
          저장
        </Button>
      </Box>
    </Box>
  );
};

export default RegistrationForm;