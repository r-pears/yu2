import React from "react";
import { Link } from "react-router-dom";
import "./RecipeCard.css";

const RecipeCard = ({ recipe }) => {
  return (
    <article className="recipe-card">
      <figure>
        <img 
          src={recipe.strMealThumb} 
          alt={recipe.strMeal} 
          className="recipe-image" 
        />
      </figure>
      <figcaption className="recipe-title">{recipe.strMeal}</figcaption>
      <Link to={`/recipe/${recipe.idMeal}`} className="details-button">
        View Details
      </Link>
    </article>
  );
};

export default RecipeCard;
