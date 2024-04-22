import React, { useState } from 'react';
import { Box, Grid, TextField, Button, Tabs, Tab, Divider } from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';
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
    if (newCategoryName.trim() === '') return;
    setCategories([...categories, newCategoryName]);
    setItemsByCategory({ ...itemsByCategory, [newCategoryName]: [] });
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



// 이미지 API, 일반 데이터 API 구분 생성 (API 2개 사용) (/upload-image , /insert-menu)
// import React, { useState } from 'react';
// import { Box, Grid, TextField, Button, Tabs, Tab, Divider } from '@mui/material';
// import AddCircleIcon from '@mui/icons-material/AddCircle';
// import axios from 'axios';

// const RegistrationForm = () => {
//   const [storeName, setStoreName] = useState('');
//   const [storeAddress, setStoreAddress] = useState('');
//   const [storeType, setStoreType] = useState('');
//   const [selectedTab, setSelectedTab] = useState(0);
//   const [categories, setCategories] = useState([]);
//   const [newCategoryName, setNewCategoryName] = useState('');
//   const [itemsByCategory, setItemsByCategory] = useState({});
//   const [items, setItems] = useState([]);

//   const handleTabChange = (event, newValue) => {
//     setSelectedTab(newValue);
//   };

//   const handleAddItem = () => {
//     setItems([...items, { name: '', price: '', imageFile: null, previewImage: null }]);
//   };

//   const handleItemFieldChange = (category, index, key, value) => {
//     const updatedItems = itemsByCategory[category];
//     updatedItems[index] = { ...updatedItems[index], [key]: value };
//     setItemsByCategory({ ...itemsByCategory, [category]: updatedItems });
//   };

//   const handleAddCategory = () => {
//     if (newCategoryName.trim() === '') return;
//     setCategories([...categories, newCategoryName]);
//     setItemsByCategory({ ...itemsByCategory, [newCategoryName]: [] });
//     setNewCategoryName('');
//   };

//   const handleImageChange = (index) => (event) => {
//     const file = event.target.files[0];
//     if (file) {
//       const newItems = [...items];
//       newItems[index] = {
//         ...newItems[index],
//         imageFile: file,
//         previewImage: URL.createObjectURL(file),
//       };
//       setItems(newItems);
//     }
//   };

//   const handleFieldChange = (index, field) => (event) => {
//     const newItems = [...items];
//     newItems[index] = {
//       ...newItems[index],
//       [field]: event.target.value,
//     };
//     setItems(newItems);
//   };

//   const uploadImage = async (file) => {
//     const formData = new FormData();
//     formData.append('image', file);
//     try {
//       const response = await axios.post('/upload-image', formData, {
//         headers: {
//           'Content-Type': 'multipart/form-data',
//         },
//       });
//       return response.data.imageUrl; // 서버에서 이미지 URL을 반환
//     } catch (error) {
//       console.error('Error uploading image', error);
//       return null; // 실패시 null 반환
//     }
//   };

//   const handleSubmit = async (event) => {
//     event.preventDefault();
//     const imageUploadPromises = items.map(item =>
//       item.imageFile ? uploadImage(item.imageFile) : Promise.resolve(null)
//     );
//     const imageUrls = await Promise.all(imageUploadPromises);

//     const data = {
//       storeName,
//       storeAddress,
//       storeType,
//       categories: categories.map((category, index) => ({
//         name: category,
//         items: itemsByCategory[category].map((item, itemIndex) => ({
//           name: item.name,
//           price: item.price,
//           imageUrl: imageUrls[itemIndex],  // 포함된 이미지 URL
//         }))
//       }))
//     };

//     try {
//       const response = await axios.post('/insert-menu', data, {
//         headers: {
//           'Content-Type': 'application/json',
//         },
//       });
//       console.log('Data submitted successfully', response.data);
//     } catch (error) {
//       console.error('Error posting item data', error);
//     }
//   };

//   return (
//     <Box sx={{ mt: 1, width: '100%' }}>
//       <Box component="form" onSubmit={handleSubmit} noValidate>
//         <Grid container spacing={2} alignItems="center">
//           {/* Store information fields */}
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
//          </Grid>
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
//           <Tab label="+" onClick={handleAddCategory} />
//         </Tabs>
//         {items.map((item, index) => (
//           <Grid container spacing={2} key={index}>
//             <Grid item xs={12}>
//               <input
//                 accept="image/*"
//                 type="file"
//                 onChange={handleImageChange(index)}
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
//             <Grid item xs={12} md={2}>
//               <TextField
//                 fullWidth
//                 label="음식 이름"
//                 value={item.name}
//                 onChange={handleFieldChange(index, 'name')}
//                 size="small"
//               />
//             </Grid>
//             <Grid item xs={12} md={2}>
//               <TextField
//                 fullWidth
//                 label="음식 가격"
//                 value={item.price}
//                 onChange={handleFieldChange(index, 'price')}
//                 size="small"
//               />
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

//multi object 코드
// import React, { useState } from 'react';
// import { Box, Grid, TextField, Button, Tabs, Tab, Divider } from '@mui/material';
// import AddCircleIcon from '@mui/icons-material/AddCircle';
// import axios from 'axios';

// const RegistrationForm = () => {
//   const [storeName, setStoreName] = useState('');
//   const [storeAddress, setStoreAddress] = useState('');
//   const [storeType, setStoreType] = useState('');
//   const [selectedTab, setSelectedTab] = useState(0);
//   const [categories, setCategories] = useState([]);
//   const [newCategoryName, setNewCategoryName] = useState(''); // 사용자 입력을 위한 새 state 추가
//   const [itemsByCategory, setItemsByCategory] = useState({});
//   const [items, setItems] = useState([]);

//   const handleTabChange = (event, newValue) => {
//     setSelectedTab(newValue);
//   };

//   const handleAddItem = () => {
//     setItems([...items, { name: '', price: '', imageFile: null, previewImage: null }]);
//   };

//   const handleItemFieldChange = (category, index, key, value) => {
//     const updatedItems = [...itemsByCategory[category]];
//     updatedItems[index] = { ...updatedItems[index], [key]: value };
//     setItemsByCategory({ ...itemsByCategory, [category]: updatedItems });
//   };

//   const handleAddCategory = () => {
//     if (newCategoryName.trim() === '') return; // 빈 문자열 방지
//     setCategories([...categories, newCategoryName]);
//     setItemsByCategory({ ...itemsByCategory, [newCategoryName]: [] });
//     setNewCategoryName(''); // 카테고리 추가 후 입력 필드 초기화
//   };

//   const handleImageChange = (index) => (event) => {
//     const file = event.target.files[0];
//     if (file) {
//       const newItems = [...items];
//       newItems[index] = {
//         ...newItems[index],
//         imageFile: file,
//         previewImage: URL.createObjectURL(file),
//       };
//       setItems(newItems);
//     }
//   };

//   const handleFieldChange = (index, field) => (event) => {
//     const newItems = [...items];
//     newItems[index] = {
//       ...newItems[index],
//       [field]: event.target.value,
//     };
//     setItems(newItems);
//   };


//   const handleSubmit = async (event) => {
//     event.preventDefault();
//     const formData = new FormData();
//     items.forEach((item, index) => {
//       formData.append(`items[${index}][name]`, item.name);
//       formData.append(`items[${index}][price]`, item.price);
//       formData.append(`items[${index}][image]`, item.imageFile);
//     });
//     for (let [key, value] of formData.entries()) {
//       console.log(`${key}: ${value}`);
//     }
//     try {
//       const response = await axios.post('/insert-menu', formData, {
//         headers: {
//           'Content-Type': 'multipart/form-data',
//         },
//       });
//       console.log(response.data);
//     } catch (error) {
//       console.error('Error posting item data', error);
//     }
//   };


//   const selectedCategory = categories[selectedTab];
//   const selectedCategoryItems = itemsByCategory[selectedCategory] || [];

//   return (
//     <Box sx={{ mt: 1, width: '100%' }}>
//       <Box component="form" onSubmit={handleSubmit} noValidate>
//         <Grid container spacing={2} alignItems="center">
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
//         </Grid>
//         <Divider sx={{ my: 1 }} /> {/* 구분선 추가 */}
//         <TextField
//           fullWidth
//           label="새 카테고리 이름"
//           value={newCategoryName}
//           onChange={(e) => setNewCategoryName(e.target.value)}
//           size="small"
//         />
//         {/* 카테고리 추가 버튼 - 이미지 상에서 '+' 탭 대신 사용될 수 있습니다. */}
//         <Button startIcon={<AddCircleIcon />} onClick={handleAddCategory}>
//           카테고리 추가
//         </Button>
//         <Tabs value={selectedTab} onChange={handleTabChange} variant="scrollable" scrollButtons="auto">
//           {categories.map((category, index) => (
//             <Tab key={index} label={category} />
//           ))}
//           <Tab label="+" onClick={handleAddCategory} />
//         </Tabs>

//         {items.map((item, index) => (
//           <Grid container spacing={2} key={index}>
//             {/* 이미지 업로드와 미리보기 */}
//             <Grid item xs={12}>
//               <input
//                 accept="image/*"
//                 type="file"
//                 onChange={handleImageChange(index)}
//                 style={{ display: 'none' }}
//                 id={`image-upload-${index}`}
//               />
//               <label htmlFor={`image-upload-${index}`}>
//               <Divider sx={{ my: 2 ,borderColor: 'rgba(0, 0, 0, 0.8)'}} /> {/* 구분선 추가 */}
//                 <Button variant="contained" component="span">
//                   이미지 불러오기
//                 </Button>
//               </label>
//               {item.previewImage && <img src={item.previewImage} alt="Preview" style={{ maxWidth: '100%', display: 'block', marginTop: '10px' }} />}
//             </Grid>
//             {/* 음식 이름 입력 필드 */}
//             <Grid item xs={12} md={2} >
//               <TextField
//                 fullWidth
//                 label="음식 이름"
//                 value={item.name}
//                 onChange={handleFieldChange(index, 'name')}
//                 size="small"
//               />
//             </Grid>
//             {/* 음식 설명 입력 필드 */}
//             <Grid item xs={12} md={2}>
//               <TextField
//                 fullWidth
//                 label="음식 가격"
//                 value={item.price}
//                 onChange={handleFieldChange(index, 'price')}
//                 size="small"
//               />
//             </Grid>
//           </Grid>
//       ))}
//       <Button startIcon={<AddCircleIcon />} onClick={handleAddItem}>
//           아이템 추가
//       </Button>
//       <Button type="submit" variant="contained" sx={{ mt: 2 }}>
//         전송
//       </Button>
//       </Box>
//     </Box>
//   );
// };

// export default RegistrationForm;