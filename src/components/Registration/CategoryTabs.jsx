import React from 'react';
import { Tabs, Tab } from '@mui/material';

const CategoryTabs = ({ categories, selectedTab, onTabChange, onAddCategory }) => {
  return (
    <>
      <Tabs value={selectedTab} onChange={handleTabChange} variant="scrollable" scrollButtons="auto">
      {categories.map((category, index) => (
        <Tab key={index} label={category} />
      ))}
      <Tab label="+" onClick={() => {
        const newCategory = newCategoryName.trim();
        if (newCategory && !categories.includes(newCategory)) {
          setCategories([...categories, newCategory]);
          setItemsByCategory({...itemsByCategory, [newCategory]: []});
          setNewCategoryName('');
        }
      }} />
    </Tabs>
    </>
  );
};

export default CategoryTabs;