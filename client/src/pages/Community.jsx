import React, { useState, useEffect } from 'react';
import RecipeCard from '../components/RecipeCard';
import { Loader, Users, ThumbsUp, AlertCircle } from 'lucide-react';

const Community = () => {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchRecipes();
  }, []);

  const fetchRecipes = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/recipes?type=community');
      const data = await res.json();
      
      if (Array.isArray(data)) {
        setRecipes(data);
      } else {
        setRecipes([]); 
        setError(data.message || "Failed to load feed");
      }
    } catch (err) {
      console.error("Error fetching community feed:", err);
      setError("Could not connect to server");
    } finally {
      setLoading(false);
    }
  };

  const handleLike = async (id) => {
    try {
      const res = await fetch(`http://localhost:5000/api/recipes/${id}/like`, {
        method: 'PUT',
      });
      if (res.ok) {
        const updatedRecipe = await res.json();
        setRecipes(prev => prev.map(r => r._id === id ? updatedRecipe : r));
      }
    } catch (err) {
      console.error("Error liking recipe:", err);
    }
  };

  if (loading) return <div className="flex justify-center py-32"><Loader className="animate-spin text-indigo-600" /></div>;

  if (error) return (
    <div className="text-center py-32 text-red-500">
      <AlertCircle className="mx-auto mb-2" />
      <p>Error: {error}</p>
      <p className="text-sm text-gray-400 mt-2">Check if your Backend Server and Database are running.</p>
    </div>
  );

  return (
    <div className="max-w-6xl mx-auto px-4 pt-32 pb-12">
      <div className="text-center mb-12">
        <div className="inline-flex items-center justify-center p-3 bg-indigo-100 text-indigo-600 rounded-full mb-4">
          <Users size={24} />
        </div>
        <h1 className="text-4xl font-extrabold text-gray-900 mb-4">Community Remixes</h1>
        <p className="text-gray-500 max-w-2xl mx-auto">
          Discover what other chefs are creating with their leftovers. Upvote your favorites!
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {recipes.length > 0 ? recipes.map((recipe) => (
          <div key={recipe._id} className="relative group">
            <RecipeCard recipe={recipe} isDetailed={false} />
            
            <div className="absolute top-4 right-4">
               <button 
                 onClick={() => handleLike(recipe._id)} 
                 className="flex items-center gap-2 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-full shadow-sm hover:bg-indigo-50 hover:text-indigo-600 transition-all text-sm font-bold text-gray-700"
               >
                 <ThumbsUp size={16} /> {recipe.likes || 0}
               </button>
            </div>
          </div>
        )) : (
          <div className="col-span-3 text-center py-12 bg-white rounded-3xl border border-dashed border-gray-200">
            <Users className="mx-auto text-gray-300 mb-2" size={48} />
            <p className="text-gray-500">No community recipes shared yet.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Community;