import React, { useState } from 'react';
import { Box, Grid, TextField, Button, Tabs, Tab, Divider, IconButton } from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import DeleteIcon from '@mui/icons-material/Delete';
import axios from 'axios';

const RegistrationForm = () => {
  const [storeName, setStoreName] = useState('');
  const [storeAddress, setStoreAddress] = useState('');
  const [storeType, setStoreType] = useState('');
  const [selectedTab, setSelectedTab] = useState(0);
  const [categories, setCategories] = useState([]);
  const [newCategoryName, setNewCategoryName] = useState(''); // 사용자 입력을 위한 새 state 추가
  const [itemsByCategory, setItemsByCategory] = useState({});
  const [imageFile, setImageFile] = useState('');
  const [previewImage, setPreviewImage] = useState('');

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

  const handleAddCategory = () => {
    if (newCategoryName.trim() === '') return; // 빈 문자열 방지
    setCategories([...categories, newCategoryName]);
    setItemsByCategory({ ...itemsByCategory, [newCategoryName]: [] });
    setNewCategoryName(''); // 카테고리 추가 후 입력 필드 초기화
  };

  const handleDeleteItem = (category, index) => {
    const newItems = itemsByCategory[category].filter((_, i) => i !== index);
    setItemsByCategory({ ...itemsByCategory, [category]: newItems });
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      // 선택된 파일에 대한 URL을 생성해 미리보기 이미지로 설정합니다.
      setPreviewImage(URL.createObjectURL(file));
      setImageFile(file);
    }
  };

  const handleUpload = async () => {
    if (!imageFile) {
      alert('이미지를 선택해 주세요.');
      return;
    }

    const formData = new FormData();
    formData.append('image', imageFile);

    try {
      const response = await axios.post('/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log(response.data);
      alert('이미지가 업로드되었습니다.');
    } catch (error) {
      console.error('업로드 중 에러가 발생했습니다', error);
      alert('이미지 업로드에 실패했습니다.');
    }
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
        <TextField
          fullWidth
          label="새 카테고리 이름"
          value={newCategoryName}
          onChange={(e) => setNewCategoryName(e.target.value)}
          size="small"
        />
        {/* 카테고리 추가 버튼 - 이미지 상에서 '+' 탭 대신 사용될 수 있습니다. */}
        <Button startIcon={<AddCircleIcon />} onClick={handleAddCategory}>
          카테고리 추가
        </Button>
        <Tabs value={selectedTab} onChange={handleTabChange} variant="scrollable" scrollButtons="auto">
          {categories.map((category, index) => (
            <Tab key={index} label={category} />
          ))}
          <Tab label="+" onClick={handleAddCategory} />
        </Tabs>

        {selectedCategoryItems.map((item, index) => (
          <Grid container spacing={1} key={index}>
            <Grid item xs={10} >
              <TextField
                fullWidth
                label="음식 이름"
                value={item.name}
                onChange={(e) => handleItemFieldChange(selectedCategory, index, 'name', e.target.value)}
                size="small"
              />
            </Grid>
            {/* "음식 설명" 필드 위치 변경 */}
            <Grid item xs={10} >
              <TextField
                fullWidth
                label="음식 설명"
                value={item.description}
                onChange={(e) => handleItemFieldChange(selectedCategory, index, 'description', e.target.value)}
                size="small"
              />
            </Grid>
            {/* "이미지 URL" 필드 위치 변경 */}
            <Grid item xs={10}>
              <input
                accept="image/*"
                type="file"
                onChange={handleImageChange}
                id="image-upload"
                style={{ display: 'none' }}
              />
              <label htmlFor="image-upload">
                <Button variant="contained" color="primary" component="span">
                  이미지 선택
                </Button>
              </label>
            </Grid>
            {previewImage && (
              <Grid item xs={12}>
                <img src={previewImage} alt="Preview" style={{ maxWidth: '100%' }} />
              </Grid>
            )}
            <Button onClick={handleUpload} variant="contained" color="primary">
              업로드
            </Button>
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