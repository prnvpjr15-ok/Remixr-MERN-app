const UserProfile = require('../models/UserProfile');

const getUserProfile = async (req, res) => {
  try {
    let profile = await UserProfile.findOne({ userId: req.params.userId });
    
    // If no profile exists, create a default one
    if (!profile) {
      profile = await UserProfile.create({
        userId: req.params.userId,
        shoppingList: [],
        mealPlan: {}
      });
    }
    
    res.json(profile);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateShoppingList = async (req, res) => {
  try {
    const { shoppingList } = req.body; // Expects full array
    const profile = await UserProfile.findOneAndUpdate(
      { userId: req.params.userId },
      { shoppingList },
      { new: true, upsert: true }
    );
    res.json(profile);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const updateMealPlan = async (req, res) => {
  try {
    const { day, recipe } = req.body; // e.g. { day: 'monday', recipe: { ... } }
    
    // Use dot notation to update specific day in the map
    const updateField = {};
    updateField[`mealPlan.${day}`] = recipe;

    const profile = await UserProfile.findOneAndUpdate(
      { userId: req.params.userId },
      { $set: updateField },
      { new: true, upsert: true }
    );
    res.json(profile);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = { getUserProfile, updateShoppingList, updateMealPlan };