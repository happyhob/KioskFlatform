import React, { useContext, useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import { LoginContext } from '../../Context/LoginContextProvider';
import { alert } from "../../apis/alert";
import { useNavigate } from "react-router-dom";
import { ProductsByUserId } from "../../apis/auth.js";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

const MenubarForm = () => {
    const { isLogin, userInfo } = useContext(LoginContext);
    const navigate = useNavigate();
    const [products, setProducts] = useState({});
    const [open, setOpen] = useState({});
    const [selectedCategory, setSelectedCategory] = useState(null);

    useEffect(() => {
        if (isLogin) {
            const userId = userInfo.userId;
            ProductsByUserId(userId)
                .then((data) => {
                    console.log("Loaded data:", data);
                    const categorizedProducts = data.reduce((acc, item) => {
                        const category = item[4];
                        const imagePath = item[7].split('\\').pop(); // 파일명만 추출
                        const product = {
                            id: item[0],
                            title: item[5],
                            price: item[6],
                            image: `/images/${imagePath}` // 서버의 이미지 경로로 설정
                        };
                        if (!acc[category]) {
                            acc[category] = [];
                        }
                        acc[category].push(product);
                        return acc;
                    }, {});
                    setProducts(categorizedProducts);
                })
                .catch((error) => console.error("Error loading products:", error));
        }
    }, [isLogin, userInfo]);

    const handleToggle = (category) => {
        setOpen((prevOpen) => {
            const newOpen = Object.keys(prevOpen).reduce((acc, key) => {
                acc[key] = key === category ? !prevOpen[key] : false;
                return acc;
            }, {});
            return newOpen;
        });
        setSelectedCategory(category);
    };

    const handleRegistration = () => {
        if (!isLogin) {
            alert("로그인이 필요합니다", "로그인 화면으로 이동합니다.", "warning", () => {
                navigate("/login");
            });
        } else {
            navigate("/registration");
        }
    };

    const displayedProducts = selectedCategory ? products[selectedCategory] : [];

    return (
        <Grid container spacing={2} sx={{ marginTop: 2 }}>
            <Grid item xs={12} md={4}>
                <Box sx={{ minHeight: 200, flexGrow: 1, maxWidth: 400 }}>
                    {isLogin ? (
                        <>
                            <div>{userInfo.userName}님 안녕하세요</div>
                            <List component="nav">
                                <ListItem button onClick={handleRegistration}>
                                    <ListItemText primary="상품 등록" />
                                </ListItem>
                                {Object.entries(products).map(([category, items]) => (
                                    <React.Fragment key={category}>
                                        <ListItem button onClick={() => handleToggle(category)}>
                                            <ListItemText primary={category} />
                                            {open[category] ? <ExpandLess /> : <ExpandMore />}
                                        </ListItem>
                                        <Collapse in={open[category]} timeout="auto" unmountOnExit>
                                            <List component="div" disablePadding>
                                                {items.map((item) => (
                                                    <ListItem 
                                                        key={item.id} 
                                                        sx={{ pl: 4 }} 
                                                        button 
                                                        onClick={() => setSelectedCategory(category)}
                                                    >
                                                        <ListItemText primary={`${item.title} - ${item.price}원`} />
                                                    </ListItem>
                                                ))}
                                            </List>
                                        </Collapse>
                                    </React.Fragment>
                                ))}
                            </List>
                        </>
                    ) : (
                        <>
                            <div>Please Get Login</div>
                            <List component="nav">
                                <ListItem button onClick={() => navigate("/login")}>
                                    <ListItemText primary="상품 등록" />
                                </ListItem>
                                <ListItem button onClick={() => navigate("/login")}>
                                    <ListItemText primary="카테고리 1" />
                                </ListItem>
                                <ListItem button onClick={() => navigate("/login")}>
                                    <ListItemText primary="카테고리 2" />
                                </ListItem>
                                <ListItem button onClick={() => navigate("/login")}>
                                    <ListItemText primary="카테고리 3" />
                                </ListItem>
                            </List>
                        </>
                    )}
                </Box>
            </Grid>
            <Grid item xs={12} md={8}>
                <Grid container spacing={2}>
                    {displayedProducts.map((item) => (
                        <Grid item xs={12} sm={6} md={4} key={item.id}>
                            <Card sx={{ maxWidth: 345, height: '100%' }}>
                                <CardMedia
                                    component="img"
                                    height="200"
                                    image={item.image}
                                    alt={item.title}
                                    sx={{ objectFit: 'cover' }}
                                />
                                <CardContent>
                                    <Typography gutterBottom variant="h5" component="div">
                                        {item.title}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        {item.price}원
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </Grid>
        </Grid>
    );
};

export default MenubarForm;
