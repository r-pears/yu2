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
  // const navigate = useNavigate();

  useEffect(() => {
    fetchRandomRecipes();
  }, []);

  const fetchRandomRecipes = async () => {
    // error handling with trycatch
    try {
      let fetchedRecipes = [];
      for (let i = 0; i < 6; i++) {
        const response = await fetch(
          "https://www.themealdb.com/api/json/v1/1/random.php"
        );
        // check if the response is ok
        if (!response.ok) {
          throw new Error("Failed to fetch random recipes");
        }
        const data = await response.json();
        fetchedRecipes.push(data.meals[0]);
      }
      setRecipes(fetchedRecipes);
    } catch (error) {
      console.error("Error fetching random recipes:", error);
    }
  };

  const handleSearch = async (query, type) => {
    let url = "";
    // for readability, use a switch statement
    switch (type) {
      case "name":
        url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`;
        break;
      case "ingredient":
        url = `https://www.themealdb.com/api/json/v1/1/filter.php?i=${query}`;
        break;
      case "letter":
        if (query.length === 1) {
          url = `https://www.themealdb.com/api/json/v1/1/search.php?f=${query}`;
        } else {
          alert("For first letter search, enter only one letter!");
          return;
        }
        break;
      default:
        alert("Invalid search type!");
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
    // trycatch for error handling
    try {
      const url = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`;
      const response = await fetch(url);
      // check if the response is ok
      if (!response.ok) {
        throw new Error("Failed to fetch recipes by category");
      }
      const data = await response.json();
      setRecipes(data.meals || []);
      setShowSearchBar(false);
      setShowBackButton(true); // Show back button when category is selected
    } catch (error) {
      console.error("Error fetching recipes by category:", error);
    }
  };

  const handleBack = () => {
    setShowCategoryFilter(true); // Show category filter again
    setShowSearchBar(true); // Show search bar again
    setShowBackButton(false); // Hide back button
  };

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
      {/* this isnt a nav */}
      <section>
        {showSearchBar && <SearchBar onSearch={handleSearch} />}
        {showCategoryFilter && (
          <CategoryFilter onFilter={handleFilterByCategory} />
        )}
      </section>
      <section className="recipe-list">
        {recipes.length > 0 ? (
          recipes.map((recipe) => (
            <RecipeCard key={recipe.idMeal} recipe={recipe} />
          ))
        ) : (
          <p>No recipes found</p>
        )}
      </section>
    </main>
  );
};

export default HomePage;
