import React from "react";

import IngredientsList from "./IngredientsList";
import ClaudeRecipe from "./ClaudeRecipe";
import { getRecipeFromMistral } from "../ai";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

export default function Main() {
  const [ingredients, setIngredients] = React.useState([]);

  // "chicken",
  // "all the main spices",
  // "corn",
  // "heavy cream",
  // "pasta",

  const [recipe, setRecipe] = React.useState("");
  const [loading, setLoading] = React.useState(false); // Add loading state

  const recipeSection = React.useRef(null);

  React.useEffect(() => {
    if (recipe && recipeSection.current) {
      recipeSection.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [recipe]);

  async function getRecipe() {
    setLoading(true); // Set loading to true when fetching

    const recipeMarkdown = await getRecipeFromMistral(ingredients);
    setRecipe(recipeMarkdown);
    setLoading(false); // Set loading to false after recipe is fetched
  }

  function addIngredient(formData) {
    const newIngredient = formData.get("ingredient");
    setIngredients((prevIngredients) => [...prevIngredients, newIngredient]);
  }

  return (
    <main>
      <p>
        Please provide 4 or more ingredients for our AI chef to suggest a
        recipe.
      </p>

      <form action={addIngredient} className="add-ingredient-form">
        <input
          type="text"
          placeholder="e.g. oregano"
          aria-label="Add ingredient"
          name="ingredient"
        />
        <button type="submit">Add ingredient</button>
      </form>

      {ingredients.length > 0 && (
        <IngredientsList
          ingredients={ingredients}
          getRecipe={getRecipe}
          ref={recipeSection}
        />
      )}
      {loading && (
        <div class="loading-spinner">
          <FontAwesomeIcon icon={faSpinner} spinPulse />
        </div>
      )}

      {recipe && <ClaudeRecipe recipe={recipe} />}
    </main>
  );
}
