const express = require('express');
const router = express.Router();
const { getUserProfile, updateShoppingList, updateMealPlan } = require('../controllers/userController');

router.get('/:userId', getUserProfile);
router.put('/:userId/shopping', updateShoppingList);
router.put('/:userId/mealplan', updateMealPlan);

module.exports = router;