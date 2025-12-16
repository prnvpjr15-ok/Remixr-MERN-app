const mongoose = require('mongoose');

const RecipeSchema = new mongoose.Schema({
  ownerId: { type: String, required: true, index: true },
  isPublic: { type: Boolean, default: false },
  
  title: { type: String, required: true },
  description: String,
  ingredients: [String],
  instructions: [String],
  
  // New Structured Data
  nutrition: {
    protein: Number, // in grams
    carbs: Number,
    fats: Number
  },
  calories: Number,
  
  // New Sustainability Metrics
  ecoScore: { type: Number, default: 80 }, // 0-100 (100 is best)
  savedWaste: { type: Boolean, default: true },
  
  time: String,
  likes: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Recipe', RecipeSchema);