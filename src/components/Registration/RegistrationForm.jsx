// import React, { useContext, useState } from 'react';
// import { Box, Grid, TextField, Button, Tabs, Tab, Divider, IconButton } from '@mui/material';
// import AddCircleIcon from '@mui/icons-material/AddCircle';
// import DeleteIcon from '@mui/icons-material/Delete'; // 삭제 아이콘을 불러옵니다.
// import axios from 'axios';
// import './RegistrationForm.css';

// const RegistrationForm = () => {
//   const [storeName, setStoreName] = useState('');
//   const [storeAddress, setStoreAddress] = useState('');
//   const [storeType, setStoreType] = useState('');
//   const [selectedTab, setSelectedTab] = useState(0);
//   const [kioskId, setKioskId] = useState(0);
//   const [categories, setCategories] = useState([]);
//   const [newCategoryName, setNewCategoryName] = useState('');
//   const [itemsByCategory, setItemsByCategory] = useState({});

//   const handleTabChange = (event, newValue) => {
//     setSelectedTab(newValue);
//   };

//   const handleAddItem = () => {
//     const currentCategory = categories[selectedTab];
//     const newItem = { name: '', price: '', imageFile: null, previewImage: null, category: currentCategory };

//     // 아이템을 현재 선택된 카테고리에 추가합니다.
//     const updatedCategoryItems = [...(itemsByCategory[currentCategory] || []), newItem];
//     setItemsByCategory({ ...itemsByCategory, [currentCategory]: updatedCategoryItems });
//   };

//   const handleRemoveItem = (category, index) => {
//     const updatedCategoryItems = itemsByCategory[category].filter((_, idx) => idx !== index);
//     setItemsByCategory({ ...itemsByCategory, [category]: updatedCategoryItems });
//   };

//   const handleAddCategory = () => {
//     // 공백을 제거한 새 카테고리 이름
//     const trimmedName = newCategoryName.trim();

//     // 입력된 이름이 비어있지 않은 경우에만 실행
//     if (trimmedName === '') {
//         alert('카테고리 이름을 입력해주세요.');
//         return;
//     }

//     // 이미 존재하는 카테고리 이름인지 체크
//     if (categories.includes(trimmedName)) {
//         alert('이미 존재하는 카테고리입니다.');
//         return;
//     }

//     const updatedCategories = [...categories, trimmedName];
//     setCategories(updatedCategories);
//     setItemsByCategory({ ...itemsByCategory, [trimmedName]: [] });
//     setNewCategoryName('');
//   };


//   const handleImageChange = (category, index) => (event) => {
//     const file = event.target.files[0];
//     if (file) {
//       const reader = new FileReader();
//       reader.onload = (e) => {
//         const updatedItems = [...itemsByCategory[category]];
//         updatedItems[index] = {
//           ...updatedItems[index],
//           imageFile: e.target.result,
//           previewImage: e.target.result
//         };
//         setItemsByCategory({ ...itemsByCategory, [category]: updatedItems });
//       };
//       reader.readAsDataURL(file);
//     }
//   };
  
//   const handleFieldChange = (category, index, field) => (event) => {
//     const updatedItems = [...itemsByCategory[category]];
//     let newValue = event.target.value;

//     if (field === 'price') {
//       newValue = newValue.replace(/[^0-9]/g, '');
//       newValue = newValue ? parseInt(newValue, 10) : '';
//     }

//     updatedItems[index] = {
//       ...updatedItems[index],
//       [field]: newValue,
//     };
//     setItemsByCategory({ ...itemsByCategory, [category]: updatedItems });
//   };

//   //전송 메서드
//   const handleSubmit = async (event) => {
//     event.preventDefault();
//     for (const category of categories) {
//       for (const item of itemsByCategory[category]) {
//         if (!item.name || !item.price || !item.imageFile) {
//           alert('추가하시려는 메뉴의 이름, 가격, 이미지를 입력해주세요.');
//           return;
//         }
//       }
//     }
//     const data = {
//       //추가적으로 userId 보내주기
//       kioskId: parseInt(kioskId, 10),
//       info: {
//         name: storeName,
//         address: storeAddress,
//         type: storeType
//       },
//       data: categories.map(category => ({
//         category: {
//           categoryName: category,
//         },
//         product: itemsByCategory[category].map(item => ({
//           name: item.name,
//           price: item.price,
//           image: item.imageFile,
//         }))
//       }))
//     };
//     console.log('Sending data to server:', data);
//     try {
//       const response = await axios.post('/admin/insert-menu', data, {
//         headers: {
//           'Content-Type': 'application/json',
//         },
//       });
//       console.log('Server response:', response);
//     } catch (error) {
//       console.error('Error posting item data', error);
//     }
//   };

//   return (
//     <Box sx={{ mt: 1, width: '100%'}}>
//       <Box component="form" onSubmit={handleSubmit} noValidate>
//         <Grid container spacing={2} alignItems="center">
//           <Box>
//           <Grid item xs>
//             <TextField
//               margin="dense"
//               required
//               fullWidth
//               id="store-name"
//               label="가게 이름"
//               name="storeName"
//               autoComplete="store-name"
//               value={storeName}
//               onChange={(e) => setStoreName(e.target.value)}
//               size="small"
//             />
//           </Grid>
//           <Grid item xs>
//             <TextField
//               margin="dense"
//               required
//               fullWidth
//               id="store-address"
//               label="가게 주소"
//               name="storeAddress"
//               autoComplete="store-address"
//               value={storeAddress}
//               onChange={(e) => setStoreAddress(e.target.value)}
//               size="small"
//             />
//           </Grid>
//           <Grid item xs>
//             <TextField
//               margin="dense"
//               required
//               fullWidth
//               id="store-type"
//               label="가게 업종"
//               name="storeType"
//               autoComplete="store-type"
//               value={storeType}
//               onChange={(e) => setStoreType(e.target.value)}
//               size="small"
//             />
//           </Grid>
//           <Grid item xs>
//             <TextField
//               margin="dense"
//               required
//               fullWidth
//               id="kiosk-id"
//               label="키오스크 ID"
//               name="kioskId"
//               autoComplete="kiosk-id"
//               value={kioskId}
//               onChange={(e) => setKioskId(parseInt(e.target.value) || 0)}
//               type="number"
//               size="small"
//             />
//           </Grid>
//           </Box>
//         </Grid>
//         <Divider sx={{ my: 1 }} />
//         <TextField
//           fullWidth
//           label="새 카테고리 이름"
//           value={newCategoryName}
//           onChange={(e) => setNewCategoryName(e.target.value)}
//           size="small"
//         />
//         <Button startIcon={<AddCircleIcon />} onClick={handleAddCategory}>
//           카테고리 추가
//         </Button>
//         <Tabs value={selectedTab} onChange={handleTabChange} variant="scrollable" scrollButtons="auto">
//           {categories.map((category, index) => (
//             <Tab key={index} label={category} />
//           ))}
//         </Tabs>
//         <Divider sx={{ my: 1 }} />
//         {categories.length > 0 && itemsByCategory[categories[selectedTab]].map((item, index) => (
//           <Grid container spacing={2} key={index}>
//             <Grid item xs={12}>
//               <input
//                 accept="image/*"
//                 type="file"
//                 onChange={handleImageChange(categories[selectedTab], index)}
//                 style={{ display: 'none' }}
//                 id={`image-upload-${index}`}
//               />
//               <label htmlFor={`image-upload-${index}`}>
//                 <Button variant="contained" component="span">
//                   이미지 불러오기
//                 </Button>
//               </label>
//               {item.previewImage && <img src={item.previewImage} alt="Preview" style={{ maxWidth: '100%', display: 'block', marginTop: '10px' }} />}
//             </Grid>
//             <Grid item xs={12} md={2} pb={1}>
//               <TextField
//                 fullWidth
//                 label="음식 이름"
//                 value={item.name}
//                 onChange={handleFieldChange(categories[selectedTab], index, 'name')}
//                 size="small"
//               />
//             </Grid>
//             <Grid></Grid>
//             <Grid item xs={12} md={2}>
//               <TextField
//                 fullWidth
//                 label="음식 가격"
//                 value={item.price}
//                 onChange={handleFieldChange(categories[selectedTab], index, 'price')}
//                 size="small"
//               />
//             </Grid>
//             <Grid item xs={12} md={1}>
//               <IconButton onClick={() => handleRemoveItem(categories[selectedTab], index)} color="error">
//                 <DeleteIcon />
//               </IconButton>
//             </Grid>
//           </Grid>
//         ))}
//         <Button startIcon={<AddCircleIcon />} onClick={handleAddItem}>
//           아이템 추가
//         </Button>
//         <Button type="submit" variant="contained" sx={{ mt: 2 }}>
//           전송
//         </Button>
//       </Box>
//     </Box>
//   );
// };

// export default RegistrationForm;

import React, { useState } from 'react';
import { Box, Grid, TextField, Button, Tabs, Tab, Divider, IconButton, Typography } from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import DeleteIcon from '@mui/icons-material/Delete';
import axios from 'axios';
import './RegistrationForm.css';

const RegistrationForm = () => {
  const [storeName, setStoreName] = useState('');
  const [storeAddress, setStoreAddress] = useState('');
  const [storeType, setStoreType] = useState('');
  const [selectedTab, setSelectedTab] = useState(0);
  const [kioskId, setKioskId] = useState(0);
  const [categories, setCategories] = useState([]);
  const [newCategoryName, setNewCategoryName] = useState('');
  const [itemsByCategory, setItemsByCategory] = useState({});

  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

  const handleAddItem = () => {
    const currentCategory = categories[selectedTab];
    const newItem = { name: '', price: '', imageFile: null, previewImage: null, category: currentCategory };

    const updatedCategoryItems = [...(itemsByCategory[currentCategory] || []), newItem];
    setItemsByCategory({ ...itemsByCategory, [currentCategory]: updatedCategoryItems });
  };

  const handleRemoveItem = (category, index) => {
    const updatedCategoryItems = itemsByCategory[category].filter((_, idx) => idx !== index);
    setItemsByCategory({ ...itemsByCategory, [category]: updatedCategoryItems });
  };

  const handleAddCategory = () => {
    const trimmedName = newCategoryName.trim();

    if (trimmedName === '') {
      alert('카테고리 이름을 입력해주세요.');
      return;
    }

    if (categories.includes(trimmedName)) {
      alert('이미 존재하는 카테고리입니다.');
      return;
    }

    const updatedCategories = [...categories, trimmedName];
    setCategories(updatedCategories);
    setItemsByCategory({ ...itemsByCategory, [trimmedName]: [] });
    setNewCategoryName('');
  };

  const handleImageChange = (category, index) => (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const updatedItems = [...itemsByCategory[category]];
        updatedItems[index] = {
          ...updatedItems[index],
          imageFile: e.target.result,
          previewImage: e.target.result,
        };
        setItemsByCategory({ ...itemsByCategory, [category]: updatedItems });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleFieldChange = (category, index, field) => (event) => {
    const updatedItems = [...itemsByCategory[category]];
    let newValue = event.target.value;

    if (field === 'price') {
      newValue = newValue.replace(/[^0-9]/g, '');
      newValue = newValue ? parseInt(newValue, 10) : '';
    }

    updatedItems[index] = {
      ...updatedItems[index],
      [field]: newValue,
    };
    setItemsByCategory({ ...itemsByCategory, [category]: updatedItems });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    for (const category of categories) {
      for (const item of itemsByCategory[category]) {
        if (!item.name || !item.price || !item.imageFile) {
          alert('추가하시려는 메뉴의 이름, 가격, 이미지를 입력해주세요.');
          return;
        }
      }
    }
    const data = {
      kioskId: parseInt(kioskId, 10),
      info: {
        name: storeName,
        address: storeAddress,
        type: storeType,
      },
      data: categories.map((category) => ({
        category: {
          categoryName: category,
        },
        product: itemsByCategory[category].map((item) => ({
          name: item.name,
          price: item.price,
          image: item.imageFile,
        })),
      })),
    };
    console.log('Sending data to server:', data);
    try {
      const response = await axios.post('/admin/insert-menu', data, {
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
    <Box sx={{ mt: 3, p: 3, bgcolor: 'white', borderRadius: 1, boxShadow: 3, maxWidth: '800px', margin: 'auto' }}>
      <Typography variant="h4" component="h1" gutterBottom textAlign="center">
        메뉴 등록
      </Typography>
      <Box component="form" onSubmit={handleSubmit} noValidate>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
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
          <Grid item xs={12} sm={6}>
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
          <Grid item xs={12} sm={6}>
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
          <Grid item xs={12} sm={6}>
            <TextField
              margin="dense"
              required
              fullWidth
              id="kiosk-id"
              label="키오스크 ID"
              name="kioskId"
              autoComplete="kiosk-id"
              value={kioskId}
              onChange={(e) => setKioskId(parseInt(e.target.value) || 0)}
              type="number"
              size="small"
            />
          </Grid>
        </Grid>
        <Divider sx={{ my: 2 }} />
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={10}>
            <TextField
              fullWidth
              label="새 카테고리 이름"
              value={newCategoryName}
              onChange={(e) => setNewCategoryName(e.target.value)}
              size="small"
            />
          </Grid>
          <Grid item xs={2}>
            <Button
              startIcon={<AddCircleIcon />}
              onClick={handleAddCategory}
              sx={{
                background: 'linear-gradient(45deg, #333 30%, #555 90%)',
                borderRadius: 3,
                border: 0,
                color: 'white',
                height: 60,
                boxShadow: '0 3px 5px 2px rgba(50, 50, 50, .3)',
              }}
            >
              카테고리 추가
            </Button>
          </Grid>
        </Grid>
        <Tabs value={selectedTab} onChange={handleTabChange} variant="scrollable" scrollButtons="auto">
          {categories.map((category, index) => (
            <Tab key={index} label={category} />
          ))}
        </Tabs>
        <Divider sx={{ my: 2 }} />
        {categories.length > 0 &&
          itemsByCategory[categories[selectedTab]].map((item, index) => (
            <Grid container spacing={2} key={index} alignItems="center">
              <Grid item xs={12} sm={3}>
                <input
                  accept="image/*"
                  type="file"
                  onChange={handleImageChange(categories[selectedTab], index)}
                  style={{ display: 'none' }}
                  id={`image-upload-${index}`}
                />
                <label htmlFor={`image-upload-${index}`}>
                  <Button 
                  variant="contained" 
                  component="span" 
                  sx={{
                  background: 'linear-gradient(45deg, #333 30%, #555 90%)',
                  borderRadius: 3,
                  border: 0,
                  color: 'white',
                  height: 40,
                  boxShadow: '0 3px 5px 2px rgba(50, 50, 50, .3)',
                  }}>
                    이미지 불러오기
                  </Button>
                </label>
                {item.previewImage && (
                  <img
                    src={item.previewImage}
                    alt="Preview"
                    style={{ maxWidth: '100%', display: 'block', marginTop: '10px' }}
                  />
                )}
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField
                  fullWidth
                  label="음식 이름"
                  value={item.name}
                  onChange={handleFieldChange(categories[selectedTab], index, 'name')}
                  size="small"
                />
              </Grid>
              <Grid item xs={12} sm={3}>
                <TextField
                  fullWidth
                  label="음식 가격"
                  value={item.price}
                  onChange={handleFieldChange(categories[selectedTab], index, 'price')}
                  size="small"
                />
              </Grid>
              <Grid item xs={12} sm={2}>
                <IconButton onClick={() => handleRemoveItem(categories[selectedTab], index)} color="error">
                  <DeleteIcon />
                </IconButton>
              </Grid>
            </Grid>
          ))}
        <Divider sx={{ my: 2 }} />
        <Grid container spacing={2} justifyContent="space-between">
          <Grid item>
            <Button
              startIcon={<AddCircleIcon />}
              onClick={handleAddItem}
              sx={{
                background: 'linear-gradient(45deg, #333 30%, #555 90%)',
                borderRadius: 3,
                border: 0,
                color: 'white',
                height: 40,
                boxShadow: '0 3px 5px 2px rgba(50, 50, 50, .3)',
                marginBottom: 2,
              }}
            >
              아이템 추가
            </Button>
          </Grid>
          <Grid item>
            <Button
              type="submit"
              variant="contained"
              sx={{
                background: 'linear-gradient(45deg, #333 30%, #555 90%)',
                borderRadius: 3,
                border: 0,
                color: 'white',
                height: 40,
                boxShadow: '0 3px 5px 2px rgba(50, 50, 50, .3)',
              }}
            >
              전송
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default RegistrationForm;

