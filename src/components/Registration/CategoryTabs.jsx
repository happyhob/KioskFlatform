import React from 'react';
import { Tabs, Tab } from '@mui/material';

const CategoryTabs = ({ categories, selectedTab, onTabChange, onAddCategory }) => {
  return (
    <>
      <Tabs value={selectedTab} onChange={onTabChange} variant="scrollable" scrollButtons="auto">
        {categories.map((category, index) => (
          <Tab key={index} label={category} />
        ))}
        <Tab label="+" onClick={onAddCategory} />
      </Tabs>
    </>
  );
};

export default CategoryTabs;