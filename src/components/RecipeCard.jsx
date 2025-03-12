import React from "react";
import { Link } from "react-router-dom";
import "./RecipeCard.css";

const RecipeCard = ({ recipe }) => {
  return (
    <div className="recipe-card">
      <img src={recipe.strMealThumb} alt={recipe.strMeal} className="recipe-image" />
      <h3 className="recipe-title">{recipe.strMeal}</h3>
      <Link to={`/recipe/${recipe.idMeal}`} className="details-button">
        View Details
      </Link>
    </div>
  );
};

export default RecipeCard;
