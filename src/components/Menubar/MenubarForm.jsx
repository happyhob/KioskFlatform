// import React, { useContext } from 'react';
// import Box from '@mui/material/Box';
// import { SimpleTreeView } from '@mui/x-tree-view/SimpleTreeView';
// import { TreeItem } from '@mui/x-tree-view/TreeItem';
// import { LoginContext } from '../../Context/LoginContextProvider';
// import { alert } from "../../apis/alert"; // 수정된 import
// import { useNavigate } from "react-router-dom";

// const MenubarForm = () => {
//     const { isLogin, userInfo } = useContext(LoginContext); 
//     const navigate = useNavigate();


//     // Redirects to the registration page if logged in, otherwise prompts login
//     const handleRegistration = () => {
//         if (!isLogin) {

//             alert("로그인이 필요합니다", "로그인 화면으로 이동합니다.", "warning", () => {
//                 navigate("/login");
//             });
//         } else {
//             navigate("/registration");
//         }
//     };

//     return (
//         <Box sx={{ minHeight: 200, flexGrow: 1, maxWidth: 400 }}>
//             <SimpleTreeView disableSelection>
//                 {isLogin ? (
//                     <>
//                         <dir>{userInfo.userName}님 안녕하세요</dir>
//                         <TreeItem onClick={handleRegistration} itemId="grid" label="상품 등록" children={{ fontSize: '100rem' }} style={{ fontSize: '1000px' }}>
//                             <TreeItem itemId="grid-community" label="메뉴1" />
//                             <TreeItem itemId="grid-pro" label="메뉴2" />
//                             <TreeItem itemId="grid-premium" label="메뉴3" />
//                         </TreeItem>
//                         <TreeItem itemId="pickers" label="카테고리 1">
//                             <TreeItem itemId="pickers-community" label="메뉴1" />
//                             <TreeItem itemId="pickers-pro" label="메뉴2" />
//                         </TreeItem>
//                         <TreeItem itemId="charts" label="카테고리 2">
//                             <TreeItem itemId="charts-community" label="메뉴1" />
//                         </TreeItem>
//                         <TreeItem itemId="tree-view" label="카테고리 3">
//                             <TreeItem itemId="tree-view-community" label="메뉴1" />
//                         </TreeItem>
//                     </>
//                 ) : (
//                     <>
//                         <dir>Please Get Login</dir>
//                         <TreeItem itemId="grid" label="상품 등록" onClick={() => navigate("/login")} className='MuiTreeItem-label'>
//                         </TreeItem>
//                         <TreeItem itemId="pickers" label="카테고리 1" onClick={() => navigate("/login")}>
//                         </TreeItem>
//                         <TreeItem itemId="charts" label="카테고리 2" onClick={() => navigate("/login")}>
//                         </TreeItem>
//                         <TreeItem itemId="tree-view" label="카테고리 3" onClick={() => navigate("/login")}>
//                         </TreeItem>
//                     </>
//                 )}
//             </SimpleTreeView>
//         </Box>
//     );
// }

// export default MenubarForm;

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

const MenubarForm = () => {
    const { isLogin, userInfo } = useContext(LoginContext);
    const navigate = useNavigate();
    const [products, setProducts] = useState({});
    const [open, setOpen] = useState({});

    useEffect(() => {
        if (isLogin) {
            const userId = userInfo.userId;
            ProductsByUserId(userId)
                .then((data) => {
                    console.log("Loaded data:", data);
                    const categorizedProducts = data.reduce((acc, item) => {
                        const category = item[4];
                        const product = {
                            id: item[0],
                            title: item[5],
                            price: item[6],
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
        setOpen((prevOpen) => ({
            ...prevOpen,
            [category]: !prevOpen[category],
        }));
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

    return (
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
                                            <ListItem key={item.id} sx={{ pl: 4 }}>
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
    );
};

export default MenubarForm;
