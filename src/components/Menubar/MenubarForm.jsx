<<<<<<< HEAD
import React, {useState,useEffect, useContext} from 'react';
import Box from '@mui/material/Box';
import { SimpleTreeView } from '@mui/x-tree-view/SimpleTreeView';
import { TreeItem } from '@mui/x-tree-view/TreeItem';
import {LoginContext} from '../../Context/LoginContextProvider'
import Heaser from '../Header/Header'
import './MenubarForm.css'
import * as Swal from "../../apis/alter";
import {useNavigate} from "react-router-dom";

import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';

const MenubarForm=()=> {
    const {isLogin, logout, userInfo} = useContext(LoginContext); 
    const navigate = useNavigate()
    const {open, setOpen} = useState(false);

    const notLogin = () => {
      Swal.alert("로그인이 필요합니다", "로그인 화면으로 이동합니다.", "warning", () => {
          navigate("/login");
      });
  };
  const onRegistration=()=>{
    navigate("/registration")
  }
  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));


  return (
    <>
      <Box sx={{ minHeight: 200, flexGrow: 1, maxWidth: 400 }}>
        {!isLogin ?
          <>
                  <dir>Please Get Login</dir>
            {/* 여기에 로그인이 안되었을 때 */}
            {/* children={{ fontSize: '100rem' }} style={{ fontSize: '1000px' }} */}
            <SimpleTreeView disableSelection>
              <TreeItem itemId="grid" label="상품 등록" onClick={notLogin} className='MuiTreeItem-label'>
              </TreeItem>
              <TreeItem itemId="pickers" label="카테고리 1" onClick={notLogin}>
              </TreeItem>
              <TreeItem itemId="charts" label="카테고리 2" onClick={notLogin}>
              </TreeItem>
              <TreeItem itemId="tree-view" label="카테고리 3" onClick={notLogin}>
              </TreeItem>
            </SimpleTreeView>
            {/* <Stack spacing={2}>
              <Item onClick={notLogin}>Item 1</Item>
              <Item>Item 2</Item>
              <Item>Item 3</Item>
            </Stack> */}
          </>
          :
          <>
          <dir>__님 안녕하세요</dir>
            <SimpleTreeView disableSelection>
              <TreeItem onClick={onRegistration} itemId="grid" label="상품 등록" children={{ fontSize: '100rem' }} style={{ fontSize: '1000px' }}>
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
            </SimpleTreeView>
          </>}      
          </Box>
          </>
        
    
  );
=======
import React, { useContext } from 'react';
import Box from '@mui/material/Box';
import { SimpleTreeView } from '@mui/x-tree-view/SimpleTreeView';
import { TreeItem } from '@mui/x-tree-view/TreeItem';
import { LoginContext } from '../../Context/LoginContextProvider';
import { alert } from "../../apis/alter"; // 수정된 import
import { useNavigate } from "react-router-dom";

const MenubarForm = () => {
    const { isLogin } = useContext(LoginContext); 
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
                        <dir>__님 안녕하세요</dir>
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
>>>>>>> jong
}

export default MenubarForm;


//수정 전
// import React, {useState,useEffect, useContext} from 'react';
// import Box from '@mui/material/Box';
// import { SimpleTreeView } from '@mui/x-tree-view/SimpleTreeView';
// import { TreeItem } from '@mui/x-tree-view/TreeItem';
// import {LoginContext} from '../../Context/LoginContextProvider'
// import Heaser from '../Header/Header'
// import './MenubarForm.css'
// import * as Swal from "../../apis/alter";
// import {useNavigate} from "react-router-dom";

// import Paper from '@mui/material/Paper';
// import Stack from '@mui/material/Stack';
// import { styled } from '@mui/material/styles';

// const MenubarForm=()=> {
//     const {isLogin, logout, userInfo} = useContext(LoginContext); 
//     const navigate = useNavigate()
//     const {open, setOpen} = useState(false);

//     const notLogin = () => {
//       Swal.alert("로그인이 필요합니다", "로그인 화면으로 이동합니다.", "warning", () => {
//           navigate("/login");
//       });
//   };
//   const onRegistration=()=>{
//     navigate("/registration")
//   }
//   const Item = styled(Paper)(({ theme }) => ({
//     backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
//     ...theme.typography.body2,
//     padding: theme.spacing(1),
//     textAlign: 'center',
//     color: theme.palette.text.secondary,
//   }));


//     return (
//     <>
//         <Box sx={{ minHeight: 200, flexGrow: 1, maxWidth: 400 }}>
//             {!isLogin ?
//                 <>
//                   <dir>Please Get Login</dir>
//             {/* 여기에 로그인이 안되었을 때 */}
//             {/* children={{ fontSize: '100rem' }} style={{ fontSize: '1000px' }} */}
//                 <SimpleTreeView disableSelection>
//                     <TreeItem itemId="grid" label="상품 등록" onClick={notLogin} className='MuiTreeItem-label'>
//                     </TreeItem>
//                     <TreeItem itemId="pickers" label="카테고리 1" onClick={notLogin}>
//                     </TreeItem>
//                     <TreeItem itemId="charts" label="카테고리 2" onClick={notLogin}>
//                     </TreeItem>
//                     <TreeItem itemId="tree-view" label="카테고리 3" onClick={notLogin}>
//                     </TreeItem>
//                 </SimpleTreeView>
//             {/* <Stack spacing={2}>
//               <Item onClick={notLogin}>Item 1</Item>
//               <Item>Item 2</Item>
//               <Item>Item 3</Item>
//             </Stack> */}
//                 </>
//           :
//                 <>
//                 <dir>__님 안녕하세요</dir>
//                 <SimpleTreeView disableSelection>
//                   <TreeItem onClick={onRegistration} itemId="grid" label="상품 등록" children={{ fontSize: '100rem' }} style={{ fontSize: '1000px' }}>
//                     <TreeItem itemId="grid-community" label="메뉴1" />
//                     <TreeItem itemId="grid-pro" label="메뉴2" />
//                     <TreeItem itemId="grid-premium" label="메뉴3" />
//                   </TreeItem>
//                   <TreeItem itemId="pickers" label="카테고리 1">
//                     <TreeItem itemId="pickers-community" label="메뉴1" />
//                     <TreeItem itemId="pickers-pro" label="메뉴2" />
//                   </TreeItem>
//                   <TreeItem itemId="charts" label="카테고리 2">
//                     <TreeItem itemId="charts-community" label="메뉴1" />
//                   </TreeItem>
//                   <TreeItem itemId="tree-view" label="카테고리 3">
//                     <TreeItem itemId="tree-view-community" label="메뉴1" />
//                   </TreeItem>
//                 </SimpleTreeView>
//             </>}      
//         </Box>
//           </>
        
    
//     );
// }

// export default MenubarForm