import React, { useContext } from 'react';
import Box from '@mui/material/Box';
import { SimpleTreeView } from '@mui/x-tree-view/SimpleTreeView';
import { TreeItem } from '@mui/x-tree-view/TreeItem';
import { LoginContext } from '../../Context/LoginContextProvider';
import { alert } from "../../apis/alert"; // 수정된 import
import { useNavigate } from "react-router-dom";

const MenubarForm = () => {
    const { isLogin, userInfo } = useContext(LoginContext); 
    const navigate = useNavigate();


    // Redirects to the registration page if logged in, otherwise prompts login
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
            <SimpleTreeView disableSelection>
                {isLogin ? (
                    <>
                        <dir>{userInfo.userName}님 안녕하세요</dir>
                        <TreeItem onClick={handleRegistration} itemId="grid" label="상품 등록" children={{ fontSize: '100rem' }} style={{ fontSize: '1000px' }}>
                            <TreeItem itemId="grid-community" label="메뉴1" />
                            <TreeItem itemId="grid-pro" label="메뉴2" />
                            <TreeItem itemId="grid-premium" label="메뉴3" />
                        </TreeItem>
                        <TreeItem itemId="pickers" label="카테고리 1">
                            <TreeItem itemId="pickers-community" label="메뉴1" />
                            <TreeItem itemId="pickers-pro" label="메뉴2" />
                        </TreeItem>
                        <TreeItem itemId="charts" label="카테고리 2">
                            <TreeItem itemId="charts-community" label="메뉴1" />
                        </TreeItem>
                        <TreeItem itemId="tree-view" label="카테고리 3">
                            <TreeItem itemId="tree-view-community" label="메뉴1" />
                        </TreeItem>
                    </>
                ) : (
                    <>
                        <dir>Please Get Login</dir>
                        <TreeItem itemId="grid" label="상품 등록" onClick={() => navigate("/login")} className='MuiTreeItem-label'>
                        </TreeItem>
                        <TreeItem itemId="pickers" label="카테고리 1" onClick={() => navigate("/login")}>
                        </TreeItem>
                        <TreeItem itemId="charts" label="카테고리 2" onClick={() => navigate("/login")}>
                        </TreeItem>
                        <TreeItem itemId="tree-view" label="카테고리 3" onClick={() => navigate("/login")}>
                        </TreeItem>
                    </>
                )}
            </SimpleTreeView>
        </Box>
    );
}

export default MenubarForm;