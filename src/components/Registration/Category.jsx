import React from 'react';

const CategoryTabs = ({ categories, selectedCategory, onSelectCategory, onAddCategory }) => {
  return (
    <div className="category-tabs">
      {categories.map((category) => (
        <button
          key={category}
          className={`category-tab ${selectedCategory === category ? 'active' : ''}`}
          onClick={() => onSelectCategory(category)}
        >
          {category}
        </button>
      ))}
      <button className="category-tab add" onClick={onAddCategory}>
        +
      </button>
    </div>
  );
};

export default CategoryTabs;
