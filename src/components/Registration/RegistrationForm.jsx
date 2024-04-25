<<<<<<< HEAD
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

//컴포넌트 스타일
const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

function RegistrationForm(props) {
  
  const [categories, setCategories] = useState([]);
  const [contents, setContents] = useState({});
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [newCategoryText, setNewCategoryText] = useState('');
  const [newContentText, setNewContentText] = useState('');

  //카테고리 추가
  const handleAddCategoryClick = () => {
    if (newCategoryText.trim() !== '') {            //새 카테고리 텍스트 empty확인
      const newCategories = [...categories, newCategoryText];       //기존 배열 복사 후 새 카테고리 추가
      setCategories(newCategories);                         //새로운 배열 추가
      setContents({ ...contents, [newCategoryText]: [] });  //개존의 context 객체 복사 후, 카테고리 내용 빈배열 초기화
      setNewCategoryText('');           //newCategoryText를 통해 초기화
    }
  };
  //키테고리 삭제
  const handleRemoveCategoryClick = (categoryToRemove) => {
    const newCategories = categories.filter(category => category !== categoryToRemove);
    setCategories(newCategories);

    if (selectedCategory === categoryToRemove) {
      setSelectedCategory(null);
    }

    const newContents = { ...contents };
    delete newContents[categoryToRemove];
    setContents(newContents);
  };
  //content 추가
  const handleAddContentClick = () => {
    if (selectedCategory !== null && newContentText.trim() !== '') {        //제거할 카테고리 필터링
      const newContents = { ...contents };
      newContents[selectedCategory] = [...(newContents[selectedCategory] || []), newContentText];
      setContents(newContents);
      setNewContentText('');
    }
  };
  //content 삭제
  const handleRemoveContentClick = (contentToRemove) => {
    if (selectedCategory !== null && contents[selectedCategory].includes(contentToRemove)) {
      const newContents = { ...contents };
      newContents[selectedCategory] = newContents[selectedCategory].filter(content => content !== contentToRemove);
      setContents(newContents);
    }
  };
  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>
        {/* 가게정보입력 */}
          <Grid item xs={6} md={12}>
            <Item>
              <label style={{ fontSize: '20px', color: 'RGB(150, 120, 100)', fontWeight: 'bold', marginRight: '40px' }}>가게정보입력</label>
              <TextField
                id="standard-multiline-flexible"
                label="가게 이름"
                multilineㅈ
                maxRows={4}
                variant="standard"
                style={{ marginRight: '15px' }} 
              />

              <TextField
                id="standard-multiline-flexible"
                label="가게 주소"
                multiline
                maxRows={4}
                variant="standard"
                style={{ marginRight: '15px' }} 
              />

              <TextField
                id="standard-multiline-flexible"
                label="가게 업종"
                multiline
                maxRows={4}
                variant="standard"
                style={{ marginRight: '15px' }} 
              />
              <TextField
                id="standard-multiline-flexible"
                label="가게 번호(010-xxxx-xxxx)"
                multiline
                maxRows={4}
                variant="standard"
                style={{ marginRight: '15px' }} 
              />

              <Button
                size="large"
                style={{ margin: '10px' }} 
              >등록</Button>
            </Item>
          </Grid>

          <Grid item xs={6} md={12}>
            <Item>
              <TextField
                label="New Category"
                variant="outlined"
                size="small"
                value={newCategoryText}
                onChange={(e) => setNewCategoryText(e.target.value)}
              />
              <Button variant="outlined" style={{ marginRight: '50px', color: 'RGB(150, 100, 0)' }} size="large" onClick={handleAddCategoryClick}>
                Add Category
              </Button>
            </Item>
          </Grid>

          <Grid item xs={6} md={12}>
            <Item>
              {selectedCategory && (
                <Grid item xs={6} md={12}>
                  <Item>
                    <TextField
                      label="New Content"
                      variant="outlined"
                      size="small"
                      value={newContentText}
                      onChange={(e) => setNewContentText(e.target.value)}
                    />
                    <Button variant="outlined" style={{ marginRight: '50px', color: 'RGB(150, 100, 0)' }} size="large" onClick={handleAddContentClick}>
                      Add Content
                    </Button>
                  </Item>
                </Grid>
              )}
            </Item>

            {categories.map((category, index) => (
              <Button key={index} size="large" onClick={() => setSelectedCategory(category)} style={{ backgroundColor: selectedCategory === category ? 'lightblue' : 'white' }}>
                {category}
                <Button size="small" onClick={() => handleRemoveCategoryClick(category)}>X</Button>
              </Button>
            ))}
          </Grid>

          <Grid item xs={6} md={12} container direction="column">
            {selectedCategory && contents[selectedCategory] && contents[selectedCategory].map((content, contentIndex) => (
              <Grid item key={contentIndex}>
                <Button>{content}</Button>
                <Button variant="outlined" style={{ marginLeft: '10px' }} size="small" onClick={() => handleRemoveContentClick(content)}>Remove</Button>
              </Grid>
            ))}
          </Grid>
      </Grid>
    </Box>
    </>

  );
}
=======
import React, { useState } from 'react';
import { Box, Grid, TextField, Button, Tabs, Tab, Divider, IconButton } from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import DeleteIcon from '@mui/icons-material/Delete'; // 삭제 아이콘을 불러옵니다.
import axios from 'axios';

const RegistrationForm = () => {
  const [storeName, setStoreName] = useState('');
  const [storeAddress, setStoreAddress] = useState('');
  const [storeType, setStoreType] = useState('');
  const [selectedTab, setSelectedTab] = useState(0);
  const [categories, setCategories] = useState([]);
  const [newCategoryName, setNewCategoryName] = useState('');
  const [itemsByCategory, setItemsByCategory] = useState({});
  const [items, setItems] = useState([]);

  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

  const handleAddItem = () => {
    const currentCategory = categories[selectedTab];
    const newItem = { name: '', price: '', imageFile: null, previewImage: null, category: currentCategory };
    setItems([...items, newItem]);
    
    // itemsByCategory 업데이트
    const updatedCategoryItems = [...(itemsByCategory[currentCategory] || []), newItem];
    setItemsByCategory({ ...itemsByCategory, [currentCategory]: updatedCategoryItems });
  };

  const handleAddCategory = () => {
    // 공백을 제거한 새 카테고리 이름
    const trimmedName = newCategoryName.trim();

    // 입력된 이름이 비어있지 않은 경우에만 실행
    if (trimmedName === '') {
        alert('카테고리 이름을 입력해주세요.');
        return;
    }

    // 이미 존재하는 카테고리 이름인지 체크
    if (categories.includes(trimmedName)) {
        alert('이미 존재하는 카테고리입니다.');
        return;
    }

    // 새로운 카테고리 배열 생성
    const updatedCategories = [...categories, trimmedName];

    // 새로운 카테고리에 대한 아이템 배열 초기화
    const updatedItemsByCategory = { 
        ...itemsByCategory, 
        [trimmedName]: [] 
    };

    // 카테고리 상태 업데이트
    setCategories(updatedCategories);

    // 카테고리별 아이템 상태 업데이트
    setItemsByCategory(updatedItemsByCategory);

    // 입력 필드 초기화
    setNewCategoryName('');
  };


  const handleImageChange = (index) => (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const newItems = [...items];
        const updatedItem = {
          ...newItems[index],
          imageFile: e.target.result, // Base64 인코딩된 이미지 문자열
          previewImage: e.target.result // 여기서 이미지 미리보기를 설정합니다.
        };
        newItems[index] = updatedItem;
        setItems(newItems);
  
        // 선택한 카테고리가 있다면 itemsByCategory도 업데이트합니다.
        const category = newItems[index].category;
        if (category) {
          const updatedCategoryItems = itemsByCategory[category].map((item, idx) =>
            idx === index ? updatedItem : item
          );
          setItemsByCategory({ ...itemsByCategory, [category]: updatedCategoryItems });
        }
      };
      reader.readAsDataURL(file);
    }
  };
  
  // const handleFieldChange = (index, field) => (event) => {
  //   // items 배열 업데이트
  //   const newItems = [...items];
  //   const updatedItem = {
  //     ...newItems[index],
  //     [field]: event.target.value,
  //   };
  //   newItems[index] = updatedItem;
  //   setItems(newItems);
    
  //   // itemsByCategory 업데이트
  //   const category = newItems[index].category; // 카테고리를 가져옵니다
  //   if (category) {
  //     const updatedCategoryItems = itemsByCategory[category].map((item, idx) =>
  //       idx === index ? updatedItem : item
  //     );
  //     setItemsByCategory({ ...itemsByCategory, [category]: updatedCategoryItems });
  //   }
  // };
  const handleFieldChange = (index, field) => (event) => {
    // items 배열 업데이트
    const newItems = [...items];
    let newValue = event.target.value;
    
    // price 필드의 경우, 입력값을 정수로 변환
    if (field === 'price') {
      newValue = newValue.replace(/[^0-9]/g, '');  // 숫자만 허용
      newValue = newValue ? parseInt(newValue, 10) : '';
    }
    
    const updatedItem = {
      ...newItems[index],
      [field]: newValue,
    };
    newItems[index] = updatedItem;
    setItems(newItems);
  
    // itemsByCategory 업데이트
    const category = newItems[index].category;
    if (category) {
      const updatedCategoryItems = itemsByCategory[category].map((item, idx) =>
        idx === index ? updatedItem : item
      );
      setItemsByCategory({ ...itemsByCategory, [category]: updatedCategoryItems });
    }
  };


  const handleRemoveItem = (category, index) => {
    // 해당 카테고리에서 index에 해당하는 아이템을 제거합니다.
    const updatedCategoryItems = itemsByCategory[category].filter((item, idx) => idx !== index);
    setItemsByCategory({ ...itemsByCategory, [category]: updatedCategoryItems });

    // 전역 아이템 목록에서도 해당 아이템을 제거합니다.
    const newItems = items.filter((item, idx) => idx !== index);
    setItems(newItems);
  };

  //전송 메서드
  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = {
      info: {
        name: storeName,
        address: storeAddress,
        type: storeType
      },
      data: categories.map(category => ({
        category: {
          categoryName: category,
        },
        product: itemsByCategory[category].map(item => ({
          name: item.name,
          price: item.price,
          image: item.imageFile, // 여기서 이미지 파일은 Base64 인코딩된 문자열로 가정합니다.
        }))
      }))
    };
    console.log('Sending data to server:', data);
    try {
      const response = await axios.post('/insert-menu', data, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      console.log('Server response:', response);
    } catch (error) {
      console.error('Error posting item data', error);
    }
  };

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
        <Divider sx={{ my: 1 }} />
        <TextField
          fullWidth
          label="새 카테고리 이름"
          value={newCategoryName}
          onChange={(e) => setNewCategoryName(e.target.value)}
          size="small"
        />
        <Button startIcon={<AddCircleIcon />} onClick={handleAddCategory}>
          카테고리 추가
        </Button>
        <Tabs value={selectedTab} onChange={handleTabChange} variant="scrollable" scrollButtons="auto">
          {categories.map((category, index) => (
            <Tab key={index} label={category} />
          ))}
          <Tab label="+" onClick={handleAddCategory} />
        </Tabs>
        {items.map((item, index) => (
          <Grid container spacing={2} key={index}>
            <Grid item xs={12}>
              <input
                accept="image/*"
                type="file"
                onChange={handleImageChange(index)}
                style={{ display: 'none' }}
                id={`image-upload-${index}`}
              />
              <label htmlFor={`image-upload-${index}`}>
              <Divider sx={{ my: 1 }} />
                <Button variant="contained" component="span">
                  이미지 불러오기
                </Button>
              </label>
              {item.previewImage && <img src={item.previewImage} alt="Preview" style={{ maxWidth: '100%', display: 'block', marginTop: '10px' }} />}
            </Grid>
            <Grid item xs={12} md={2}>
              <TextField
                fullWidth
                label="음식 이름"
                value={item.name}
                onChange={handleFieldChange(index, 'name')}
                size="small"
              />
            </Grid>
            <Grid item xs={12} md={2}>
              <TextField
                fullWidth
                label="음식 가격"
                value={item.price}
                onChange={handleFieldChange(index, 'price')}
                size="small"
              />
            </Grid>
            <Grid item xs={12} md={1}>
            <IconButton onClick={() => handleRemoveItem(item.category, index)} color="error">
              <DeleteIcon />
            </IconButton>
            </Grid>
          </Grid>
        ))}
        <Button startIcon={<AddCircleIcon />} onClick={handleAddItem}>
          아이템 추가
        </Button>
        <Button type="submit" variant="contained" sx={{ mt: 2 }}>
          전송
        </Button>
      </Box>
    </Box>
  );
};
>>>>>>> jong

export default RegistrationForm;