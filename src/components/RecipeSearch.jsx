import { useState } from "react";
import { data } from "../utils/data";
import { RecipeList } from "./RecipeList";
import { Box, Flex } from "@chakra-ui/react";
import { Toggle } from "./ui/Toggle";
import { InputUI } from "./ui/InputUI";

export const RecipeSearch = ({ recipeClick }) => {
  const [searchField, setSearchField] = useState("");
  const [isVegan, setIsVegan] = useState(false);
  const [isVegetarian, setIsVegetarian] = useState(false);

  const matchedRecipes = data.hits.filter((recipe) =>
    recipe.recipe.label.toLowerCase().includes(searchField.toLowerCase())
  );

  const filteredRecipes = matchedRecipes.filter(
    (recipe) =>
      (isVegan ? recipe.recipe.healthLabels.includes("Vegan") : true) &&
      (isVegetarian ? recipe.recipe.healthLabels.includes("Vegetarian") : true)
  );

  const handleChange = (event) => {
    setSearchField(event.target.value);
  };
  const handleVeganToggle = (isVegan) => {
    setIsVegan(isVegan);
  };
  const handleVegetarianToggle = (isVegetarian) => {
    setIsVegetarian(isVegetarian);
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent={"center"}
      mt={8}
    >
      <InputUI
        value={searchField}
        onChange={handleChange}
        placeholder="Search..."
        mb={8}
      />
      <Flex justifyContent={"space-around"} width="300px" mb={8}>
        <Toggle
          text="Vegetarian"
          changeFn={handleVegetarianToggle}
          colorScheme="green"
        ></Toggle>
        <Toggle
          text="Vegan"
          changeFn={handleVeganToggle}
          colorScheme="green"
        ></Toggle>
      </Flex>
      <RecipeList recipeClick={recipeClick} recipes={filteredRecipes} />
    </Box>
  );
};
