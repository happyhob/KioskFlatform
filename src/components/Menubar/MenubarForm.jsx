import * as React from 'react';
import Box from '@mui/material/Box';
import { SimpleTreeView } from '@mui/x-tree-view/SimpleTreeView';
import { TreeItem } from '@mui/x-tree-view/TreeItem';

const MenubarForm=()=> {
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