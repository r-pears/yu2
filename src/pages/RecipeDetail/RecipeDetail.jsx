import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./RecipeDetail.css";

const RecipeDetail = () => {
  const { id } = useParams(); // Get URL parameters
  const navigate = useNavigate();
  const [recipe, setRecipe] = useState(null);

  useEffect(() => {
    const fetchRecipeDetail = async () => {
      const response = await fetch(
        `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
      );
      const data = await response.json();
      if (data.meals) {
        setRecipe(data.meals[0]);
      }
    };

    fetchRecipeDetail();
  }, [id]);

  if (!recipe) {
    return <p>Loading...</p>;
  }

  return (
    <article className="recipe-detail">
      <header>
        <button onClick={() => navigate(-1)} className="back-button">
          ← Back
        </button>
        <h2>{recipe.strMeal}</h2>
      </header>

      <section>
        <h3><strong>Area:</strong> {recipe.strArea}</h3>
        <img src={recipe.strMealThumb} alt={recipe.strMeal} className="recipe-image" />
      </section>

      <section>
        <h3>Ingredients</h3>
        <ul>
          {Array.from({ length: 20 }, (_, i) => i + 1)
            .map((i) => recipe[`strIngredient${i}`]?.trim())
            .filter(Boolean)
            .map((ingredient, index) => (
              <li key={index}>{ingredient}</li>
            ))}
        </ul>
      </section>

      <section>
        <h3>Instructions</h3>
        <p>{recipe.strInstructions}</p>
      </section>
    </article>
  );
};

export default RecipeDetail;
