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

export default RegistrationForm;