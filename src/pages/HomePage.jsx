import React, { useState, useEffect } from "react";
import RecipeCard from "../components/RecipeCard";
import "./HomePage.css";

const HomePage = () => {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    const fetchRandomRecipes = async () => {
      let fetchedRecipes = [];
      for (let i = 0; i < 6; i++) { // 获取 6 个随机食谱
        const response = await fetch("https://www.themealdb.com/api/json/v1/1/random.php");
        const data = await response.json();
        fetchedRecipes.push(data.meals[0]);
      }
      setRecipes(fetchedRecipes);
    };

    fetchRandomRecipes();
  }, []);

  return (
    <div className="homepage">
      <h2>Random Recipes</h2>
      <div className="recipe-list">
        {recipes.map((recipe) => (
          <RecipeCard key={recipe.idMeal} recipe={recipe} />
        ))}
      </div>
    </div>
  );
};

export default HomePage;
