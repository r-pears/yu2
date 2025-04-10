import React, { useEffect, useState } from "react";
import "./CategoryFilter.css";

const CategoryFilter = ({ onFilter }) => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    const response = await fetch("https://www.themealdb.com/api/json/v1/1/categories.php");
    const data = await response.json();
    setCategories(data.categories);
  };

  return (
    <section className="category-filter">
      <select onChange={(e) => onFilter(e.target.value)}>
        <option value="">All Categories</option>
        {categories.map((category) => (
          <option 
            key={category.idCategory} 
            value={category.strCategory}>
            {category.strCategory}
          </option>
        ))}
      </select>
    </section>
  );
};

export default CategoryFilter;
