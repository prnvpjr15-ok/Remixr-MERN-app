import { Loader, ArrowRight, Filter, AlertCircle, Share2, Settings, ChefHat, Sparkles } from 'lucide-react';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import IngredientInput from '../components/IngredientInput';
import RecipeCard from '../components/RecipeCard';
import { useUser } from '../hooks/useUser';

const Home = () => {
  const [ingredients, setIngredients] = useState(() => {
    const saved = localStorage.getItem('remixr_pantry');
    return saved ? JSON.parse(saved) : [];
  });
  useEffect(() => localStorage.setItem('remixr_pantry', JSON.stringify(ingredients)), [ingredients]);

  const [loading, setLoading] = useState(false);
  const [generatedRecipe, setGeneratedRecipe] = useState(null);
  const [error, setError] = useState(null);
  const userId = useUser();
  const [saveStatus, setSaveStatus] = useState(null);
  const [preferences, setPreferences] = useState({ dietary: 'none', cuisine: 'Any', time: '30', allergies: [] });

  const cuisineOptions = ['Any', 'Italian', 'Mexican', 'Asian', 'Mediterranean', 'Indian', 'American'];
  const allergyOptions = ['Nuts', 'Dairy', 'Eggs', 'Shellfish', 'Soy', 'Gluten'];

  const toggleAllergy = (allergy) => {
    setPreferences(prev => ({
      ...prev,
      allergies: prev.allergies.includes(allergy)
        ? prev.allergies.filter(a => a !== allergy)
        : [...prev.allergies, allergy]
    }));
  };

  const handleRemix = async () => {
    if (ingredients.length === 0) return;
    setLoading(true);
    setGeneratedRecipe(null);
    setError(null);
    setSaveStatus(null);

    // Scroll to results after short delay
    setTimeout(() => {
      window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
    }, 100);

    try {
      const response = await fetch('http://localhost:5000/api/remix/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ingredients, preferences }),
      });

      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.message || 'Failed to generate recipe');
      }

      const data = await response.json();
      setGeneratedRecipe(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSaveAction = async (isPublic) => {
    if (!generatedRecipe || !userId) return;
    try {
      const response = await fetch('http://localhost:5000/api/recipes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...generatedRecipe, ownerId: userId, isPublic }),
      });
      if (response.ok) setSaveStatus(isPublic ? 'shared' : 'saved');
      else alert("Failed to save recipe");
    } catch (err) { alert("Network error while saving"); }
  };

  // --- UI RENDER ---
  return (
    <div className="min-h-screen pt-24 pb-12 px-4 relative">
      
      {/* BACKGROUND DECORATION */}
      <div 
        className="fixed inset-0 -z-10 bg-cover bg-center opacity-[0.03]"
        style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1495195134817-aeb325a55b65?q=80&w=2076&auto=format&fit=crop")' }}
      ></div>
      <div className="fixed inset-0 -z-10 bg-gradient-to-b from-[#F8F9FC] via-[#F8F9FC]/90 to-[#F8F9FC]"></div>

      <div className="max-w-6xl mx-auto">
        
        {/* HERO SECTION */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >

          <h1 className="text-5xl md:text-7xl font-extrabold text-gray-900 mb-6 tracking-tight leading-tight">
            Turn leftovers into <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-600 animate-gradient">Masterpieces.</span>
          </h1>
          <p className="text-xl text-gray-500 max-w-2xl mx-auto leading-relaxed">
            Scan your receipts or type your pantry items. We'll handle the science of flavor to create the perfect meal for you.
          </p>
        </motion.div>

        {/* INPUT GRID */}
        <div className="grid lg:grid-cols-12 gap-8 mb-20">
          
          {/* LEFT: Ingredients (Glass Panel) */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-8 bg-white/70 backdrop-blur-xl rounded-[2.5rem] p-8 shadow-xl shadow-indigo-100/50 border border-white/50"
          >
             <label className="flex items-center gap-3 text-lg font-bold text-gray-800 mb-6">
               <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600">1</div>
               Your Pantry
             </label>
             <IngredientInput ingredients={ingredients} setIngredients={setIngredients} />
          </motion.div>

          {/* RIGHT: Controls (Glass Panel) */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="lg:col-span-4 bg-white/70 backdrop-blur-xl rounded-[2.5rem] p-8 shadow-xl shadow-indigo-100/50 border border-white/50 h-fit"
          >
            <div className="flex items-center gap-2 mb-8 text-gray-800 font-bold text-lg">
              <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600">2</div>
              Preferences
            </div>
            
            <div className="space-y-6">
              {/* Cuisine Dropdown */}
              <div className="group">
                <label className="block text-xs font-bold text-gray-400 mb-2 uppercase tracking-wider">Cuisine Style</label>
                <div className="relative">
                  <select 
                    value={preferences.cuisine}
                    onChange={(e) => setPreferences({...preferences, cuisine: e.target.value})}
                    className="w-full p-4 bg-white border border-gray-100 rounded-2xl focus:ring-4 focus:ring-indigo-50 focus:border-indigo-500 outline-none text-gray-700 font-medium appearance-none shadow-sm transition-all"
                  >
                    {cuisineOptions.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
                    <Settings size={16} />
                  </div>
                </div>
              </div>

              {/* Diet Pills */}
              <div>
                <label className="block text-xs font-bold text-gray-400 mb-2 uppercase tracking-wider">Dietary Goal</label>
                <div className="grid grid-cols-2 gap-2">
                  {['none', 'vegan', 'keto', 'paleo'].map(diet => (
                    <button
                      key={diet}
                      onClick={() => setPreferences({...preferences, dietary: diet})}
                      className={`px-4 py-3 rounded-xl text-sm font-semibold capitalize transition-all duration-200 ${
                        preferences.dietary === diet 
                          ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-200 transform scale-[1.02]' 
                          : 'bg-white text-gray-600 border border-gray-100 hover:bg-gray-50'
                      }`}
                    >
                      {diet}
                    </button>
                  ))}
                </div>
              </div>

              {/* Allergies */}
              <div>
                <label className="block text-xs font-bold text-gray-400 mb-2 uppercase tracking-wider">Allergies</label>
                <div className="flex flex-wrap gap-2">
                  {allergyOptions.map(allergy => (
                    <button
                      key={allergy}
                      onClick={() => toggleAllergy(allergy)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                        preferences.allergies.includes(allergy)
                          ? 'bg-red-50 text-red-600 border border-red-100'
                          : 'bg-white text-gray-400 border border-gray-100 hover:text-gray-600'
                      }`}
                    >
                      {allergy}
                    </button>
                  ))}
                </div>
              </div>
              
              {/* Generate Button */}
              <button
                onClick={handleRemix}
                disabled={ingredients.length === 0 || loading}
                className={`w-full py-5 rounded-2xl font-bold text-lg flex items-center justify-center transition-all duration-300 transform ${
                  ingredients.length === 0 
                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                    : 'bg-gradient-to-r from-gray-900 to-black text-white hover:shadow-2xl hover:shadow-gray-400/50 hover:-translate-y-1 active:scale-95'
                }`}
              >
                {loading ? <Loader className="animate-spin" /> : <><ChefHat className="mr-2" /> Generate Remix</>}
              </button>
            </div>
          </motion.div>
        </div>

        {/* ERROR MESSAGE */}
        <AnimatePresence>
          {error && (
            <motion.div 
              initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
              className="max-w-2xl mx-auto mb-12 bg-red-50 border border-red-100 text-red-600 px-6 py-4 rounded-2xl flex items-center shadow-sm"
            >
              <AlertCircle className="mr-3 flex-shrink-0" /> {error}
            </motion.div>
          )}
        </AnimatePresence>

        {/* RESULT SECTION */}
        <AnimatePresence>
          {generatedRecipe && (
            <motion.div 
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, type: "spring" }}
              className="pb-20"
            >
              <div className="flex items-center justify-between mb-8 px-4">
                <h2 className="text-3xl font-bold text-gray-900">Your Remix</h2>
                {preferences.cuisine !== 'Any' && (
                  <span className="bg-white px-4 py-2 rounded-full border border-gray-200 text-sm font-bold text-indigo-600 shadow-sm">
                    {preferences.cuisine} Style
                  </span>
                )}
              </div>
              
              <RecipeCard recipe={generatedRecipe} isDetailed={true} />
              
              <div className="flex flex-col sm:flex-row gap-4 mt-8 justify-end">
                <button
                  onClick={() => handleSaveAction(false)}
                  disabled={saveStatus === 'saved'}
                  className={`flex-1 sm:flex-none flex items-center justify-center px-8 py-4 rounded-2xl font-bold transition-all ${
                    saveStatus === 'saved' 
                      ? 'bg-green-50 text-green-700 border border-green-200' 
                      : 'bg-white border-2 border-gray-100 text-gray-700 hover:border-gray-300 hover:shadow-lg'
                  }`}
                >
                  {saveStatus === 'saved' ? 'Saved to Cookbook' : 'Save Private'}
                </button>

                <button
                  onClick={() => handleSaveAction(true)}
                  disabled={saveStatus === 'shared'}
                  className={`flex-1 sm:flex-none flex items-center justify-center px-8 py-4 rounded-2xl font-bold text-white transition-all ${
                    saveStatus === 'shared' 
                      ? 'bg-indigo-400' 
                      : 'bg-indigo-600 hover:bg-indigo-700 shadow-xl shadow-indigo-200 hover:-translate-y-1'
                  }`}
                >
                  <Share2 className="mr-2" size={20} />
                  {saveStatus === 'shared' ? 'Shared!' : 'Share to Community'}
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </div>
  );
};

export default Home;