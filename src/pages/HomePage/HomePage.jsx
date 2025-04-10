import React, { useState, useEffect } from "react";
import RecipeCard from "../../components/RecipeCard/RecipeCard";
import SearchBar from "../../components/SearchBar/SearchBar";
import CategoryFilter from "../../components/CategoryFilter/CategoryFilter";
import "./HomePage.css";

const HomePage = () => {
  const [recipes, setRecipes] = useState([]);
  const [showCategoryFilter, setShowCategoryFilter] = useState(true);
  const [showSearchBar, setShowSearchBar] = useState(true);
  const [showBackButton, setShowBackButton] = useState(false);

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
    setShowCategoryFilter(false); 
    setShowBackButton(true); // Show back button when search is performed
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
    setShowSearchBar(false);
    setShowBackButton(true); // Show back button when category is selected
  };

  const handleBack = () => {
    window.location.reload(); // Reload the page to reset the state
  }

  return (
    <main className="homepage">
      <header>
        {showBackButton && (
          <button onClick={handleBack} className="back-button">
            ← Back
          </button>
        )}
        <h1>Recipe Explorer</h1>
      </header>
      <nav>
        {showSearchBar &&
        <SearchBar onSearch={handleSearch} />}
        {showCategoryFilter && 
        <CategoryFilter onFilter={handleFilterByCategory} />}
      </nav>
      <section className="recipe-list">
        {recipes.length > 0 ? (
          recipes.map((recipe) => <RecipeCard key={recipe.idMeal} recipe={recipe} />)
        ) : (
          <p>No recipes found</p>
        )}
      </section>
    </main>
  );
};

export default HomePage;
