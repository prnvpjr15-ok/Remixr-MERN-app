const express = require('express');
const router = express.Router();
const { getRecipes, saveRecipe, deleteRecipe, likeRecipe } = require('../controllers/recipeController');

router.get('/', getRecipes);
router.post('/', saveRecipe);
router.delete('/:id', deleteRecipe);
router.put('/:id/like', likeRecipe);

module.exports = router;