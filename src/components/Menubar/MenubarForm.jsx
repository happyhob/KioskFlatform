import * as React from 'react';
import Box from '@mui/material/Box';
import { SimpleTreeView } from '@mui/x-tree-view/SimpleTreeView';
import { TreeItem } from '@mui/x-tree-view/TreeItem';

const MenubarForm=()=> {
<<<<<<< Updated upstream
=======
  const { isLogin, userInfo } = useContext(LoginContext);
  const navigate = useNavigate();
  const {open, setOpen} = useState(false);

  const notLogin = () => {
    // 로그인 페이지로 이동하는 함수
    Swal.alert("로그인이 필요합니다", "로그인 화면으로 이동합니다.", "warning", () => {
      navigate("/login");
    });
  };

  const onRegistration = () => {
    if (isLogin) {
      // 로그인 상태일 때 상품 등록 페이지로 이동하는 로직
      navigate("/registration");
    } else {
      // 로그인 상태가 아닐 때 로그인 페이지로 이동하는 로직
      notLogin();
    }
  };
  // const Item = styled(Paper)(({ theme }) => ({
  //   backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  //   ...theme.typography.body2,
  //   padding: theme.spacing(1),
  //   textAlign: 'center',
  //   color: theme.palette.text.secondary,
  // }));


>>>>>>> Stashed changes
  return (
    <Box sx={{ minHeight: 200, flexGrow: 1, maxWidth: 400 }}>
    <dir>
        Categorys
    </dir>
      <SimpleTreeView disableSelection>
        <TreeItem itemId="grid" label="상품 등록">
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
    </Box>
  );
}

export default MenubarForm