import React, { useState, useEffect } from "react";
import RecipeCard from "../../components/RecipeCard/RecipeCard";
import SearchBar from "../../components/SearchBar/SearchBar";
import CategoryFilter from "../../components/CategoryFilter/CategoryFilter";
import "./HomePage.css";

const HomePage = () => {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    fetchRandomRecipes();
  }, []);

  const fetchRandomRecipes = async () => {
    let fetchedRecipes = [];
    for (let i = 0; i < 6; i++) {
      const response = await fetch("https://www.themealdb.com/api/json/v1/1/random.php");
      const data = await response.json();
      fetchedRecipes.push(data.meals[0]);
    }
    setRecipes(fetchedRecipes);
  };

  const handleSearch = async (query, type) => {
    let url = "";
    if (type === "name") {
      url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`;
    } else if (type === "ingredient") {
      url = `https://www.themealdb.com/api/json/v1/1/filter.php?i=${query}`;
    } else if (type === "letter" && query.length === 1) {
      url = `https://www.themealdb.com/api/json/v1/1/search.php?f=${query}`;
    } else {
      alert("For first letter search, enter only one letter!");
      return;
    }

    const response = await fetch(url);
    const data = await response.json();
    setRecipes(data.meals || []);
  };

  const handleFilterByCategory = async (category) => {
    if (!category) {
      fetchRandomRecipes(); // If no category is selected, fetch random recipes
      return;
    }

    const url = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`;
    const response = await fetch(url);
    const data = await response.json();
    setRecipes(data.meals || []);
  };

  return (
    <div className="homepage">
      <h2>Recipe Explorer</h2>
      <SearchBar onSearch={handleSearch} />
      <CategoryFilter onFilter={handleFilterByCategory} />
      <div className="recipe-list">
        {recipes.length > 0 ? (
          recipes.map((recipe) => <RecipeCard key={recipe.idMeal} recipe={recipe} />)
        ) : (
          <p>No recipes found</p>
        )}
      </div>
    </div>
  );
};

export default HomePage;
