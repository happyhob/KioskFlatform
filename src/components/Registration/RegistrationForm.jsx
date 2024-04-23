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
  
  const handleFieldChange = (index, field) => (event) => {
    // items 배열 업데이트
    const newItems = [...items];
    const updatedItem = {
      ...newItems[index],
      [field]: event.target.value,
    };
    newItems[index] = updatedItem;
    setItems(newItems);
    
    // itemsByCategory 업데이트
    const category = newItems[index].category; // 카테고리를 가져옵니다
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

export default RegistrationForm;