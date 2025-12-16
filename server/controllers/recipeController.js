const Recipe = require('../models/Recipe');

const getRecipes = async (req, res) => {
  try {
    const { type, userId } = req.query;
    let query = {};

    if (type === 'favorites') {
      if (!userId) return res.status(400).json({ message: "User ID required" });
      query = { ownerId: userId };
    } else {
      query = { isPublic: true };
    }

    const recipes = await Recipe.find(query).sort({ createdAt: -1 });
    res.status(200).json(recipes);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

const saveRecipe = async (req, res) => {
  try {
    // We expect ownerId and isPublic from the frontend now
    const recipe = new Recipe(req.body);
    const savedRecipe = await recipe.save();
    res.status(201).json(savedRecipe);
  } catch (error) {
    console.error("Save Error:", error);
    res.status(400).json({ message: "Error saving recipe" });
  }
};

const deleteRecipe = async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id);
    if (!recipe) return res.status(404).json({ message: 'Recipe not found' });
    await recipe.deleteOne();
    res.status(200).json({ message: 'Recipe removed' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const likeRecipe = async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id);
    if (!recipe) return res.status(404).json({ message: 'Recipe not found' });
    recipe.likes = (recipe.likes || 0) + 1;
    const updatedRecipe = await recipe.save();
    res.status(200).json(updatedRecipe);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getRecipes, saveRecipe, deleteRecipe, likeRecipe };