import React, { useState } from 'react';
import axios from 'axios';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Grid from '@mui/material/Grid';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import DeleteIcon from '@mui/icons-material/Delete';


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
      const response = await axios.post('/your-endpoint-url', {
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
