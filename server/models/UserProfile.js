const mongoose = require('mongoose');

const UserProfileSchema = new mongoose.Schema({
  userId: { 
    type: String, 
    required: true, 
    unique: true,
    index: true 
  },
  // Simple array of ingredient strings
  shoppingList: [{
    item: String,
    completed: { type: Boolean, default: false }
  }],
  // Object mapping days to Recipe IDs/Titles
  mealPlan: {
    monday: { recipeId: String, title: String, calories: Number },
    tuesday: { recipeId: String, title: String, calories: Number },
    wednesday: { recipeId: String, title: String, calories: Number },
    thursday: { recipeId: String, title: String, calories: Number },
    friday: { recipeId: String, title: String, calories: Number },
    saturday: { recipeId: String, title: String, calories: Number },
    sunday: { recipeId: String, title: String, calories: Number },
  }
});

module.exports = mongoose.model('UserProfile', UserProfileSchema);