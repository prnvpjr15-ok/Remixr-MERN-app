import React, { useState, useEffect } from 'react';
import RecipeCard from '../components/RecipeCard';
import MealPlanModal from '../components/MealPlanModal';
import { Loader, Heart, AlertCircle } from 'lucide-react';
import { useUser } from '../hooks/useUser';

const Favorites = () => {
  const userId = useUser();
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRecipe, setSelectedRecipe] = useState(null);

  useEffect(() => {
    if (!userId) return;
    const fetchFavorites = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/recipes?type=favorites&userId=${userId}`);
        const data = await res.json();
        
        if (Array.isArray(data)) {
          setRecipes(data);
        } else {
          setRecipes([]); 
        }
      } catch (err) {
        console.error("Error fetching favorites:", err);
        setError("Could not load cookbook.");
      } finally {
        setLoading(false);
      }
    };

    fetchFavorites();
  }, [userId]);

  const handleDelete = async (id) => {
    try {
      await fetch(`http://localhost:5000/api/recipes/${id}`, { method: 'DELETE' });
      setRecipes(recipes.filter(r => r._id !== id));
    } catch (err) {
      console.error("Error deleting:", err);
    }
  };

  const openPlanModal = (recipe) => {
    setSelectedRecipe(recipe);
    setIsModalOpen(true);
  };

  const handleAddToPlan = async (day) => {
    if (!selectedRecipe || !userId) return;

    try {
      await fetch(`http://localhost:5000/api/user/${userId}/mealplan`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          day,
          recipe: {
            recipeId: selectedRecipe._id,
            title: selectedRecipe.title,
            calories: selectedRecipe.calories
          }
        }),
      });
    } catch (err) {
      console.error("Error planning meal:", err);
      alert("Failed to add to meal plan");
    }
  };

  if (loading) return <div className="flex justify-center py-32"><Loader className="animate-spin text-indigo-600" /></div>;

  return (
    <div className="max-w-6xl mx-auto px-4 pt-32 pb-12">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-3xl font-bold text-gray-900">My Cookbook</h2>
        <div className="flex items-center gap-2 text-indigo-600 bg-indigo-50 px-4 py-2 rounded-full font-medium">
          <Heart size={20} className="fill-current" />
          <span>{recipes.length} Saved</span>
        </div>
      </div>

      {error && (
        <div className="bg-red-50 text-red-600 p-4 rounded-lg mb-6 flex items-center">
          <AlertCircle size={20} className="mr-2" />
          {error}
        </div>
      )}

      {recipes.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-3xl border-2 border-dashed border-gray-200">
          <p className="text-gray-500 text-lg">You haven't saved any recipes yet.</p>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8">
          {recipes.map((recipe) => (
            <RecipeCard 
              key={recipe._id} 
              recipe={recipe} 
              isDetailed={true} 
              onDelete={handleDelete}
              onPlan={() => openPlanModal(recipe)}
            />
          ))}
        </div>
      )}

      <MealPlanModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleAddToPlan}
        recipeTitle={selectedRecipe?.title}
      />
    </div>
  );
};

export default Favorites;