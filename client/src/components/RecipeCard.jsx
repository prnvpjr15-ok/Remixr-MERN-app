import React, { useRef, useState } from 'react';
import { Heart, Clock, Flame, Leaf, Trash2, Calendar, Download, Loader, ChefHat } from 'lucide-react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';
import html2canvas from 'html2canvas';

const RecipeCard = ({ recipe, isDetailed = false, onSave, onDelete, onPlan, isSaved = false }) => {
  const cardRef = useRef(null);
  const [isDownloading, setIsDownloading] = useState(false);

  if (!recipe) return null;

  const ingredients = recipe.ingredients || [];
  const instructions = recipe.instructions || [];
  const title = recipe.title || "Untitled";
  const ecoScore = recipe.ecoScore || 80;

  // Chart Data Colors (Soft Pastels)
  const nutData = [
    { name: 'Protein', value: recipe.nutrition?.protein || 10, color: '#6366f1' }, // Indigo
    { name: 'Carbs', value: recipe.nutrition?.carbs || 30, color: '#f59e0b' },   // Amber
    { name: 'Fats', value: recipe.nutrition?.fats || 10, color: '#ec4899' }      // Pink
  ];

  const handleDownload = async () => {
    if (!cardRef.current) return;
    setIsDownloading(true);
    try {
      const canvas = await html2canvas(cardRef.current, { scale: 2, backgroundColor: '#ffffff', useCORS: true });
      const link = document.createElement("a");
      link.href = canvas.toDataURL("image/png");
      link.download = `${title.replace(/\s+/g, '_')}_Remix.png`;
      link.click();
    } catch (err) { console.error(err); } 
    finally { setIsDownloading(false); }
  };

  return (
    <div ref={cardRef} className={`bg-white rounded-[2rem] overflow-hidden transition-all duration-500 border border-gray-100 ${!isDetailed ? 'hover:-translate-y-2 hover:shadow-2xl hover:shadow-indigo-500/10 cursor-pointer shadow-lg' : 'shadow-2xl shadow-indigo-500/10'}`}>
      
      {/* HEADER: Gradient & Title */}
      <div className="relative bg-white p-8 pb-12">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-50/50 via-purple-50/30 to-white/0 opacity-60"></div>
        
        <div className="relative z-10 flex justify-between items-start">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-100/50 text-indigo-700 text-xs font-bold uppercase tracking-wider mb-4">
              <ChefHat size={12} /> Chef's Recommendation
            </div>
            <h2 className={`font-extrabold text-gray-900 leading-tight ${isDetailed ? 'text-4xl' : 'text-2xl'}`}>
              {title}
            </h2>
          </div>

          {/* Action Bar */}
          <div data-html2canvas-ignore className="flex gap-2">
            {isDetailed && (
              <button onClick={handleDownload} disabled={isDownloading} className="p-2.5 bg-gray-50 text-gray-500 rounded-xl hover:bg-gray-100 transition-colors">
                {isDownloading ? <Loader size={20} className="animate-spin" /> : <Download size={20} />}
              </button>
            )}
            {onPlan && (
              <button onClick={() => onPlan(recipe)} className="p-2.5 bg-gray-50 text-gray-500 rounded-xl hover:bg-indigo-50 hover:text-indigo-600 transition-colors">
                <Calendar size={20} />
              </button>
            )}
            {onSave && (
              <button onClick={onSave} disabled={isSaved} className={`p-2.5 rounded-xl transition-colors ${isSaved ? 'bg-red-50 text-red-500' : 'bg-gray-50 text-gray-500 hover:text-red-500'}`}>
                <Heart size={20} className={isSaved ? "fill-current" : ""} />
              </button>
            )}
            {onDelete && (
              <button onClick={() => onDelete(recipe._id)} className="p-2.5 bg-gray-50 text-gray-500 rounded-xl hover:bg-red-50 hover:text-red-500 transition-colors">
                <Trash2 size={20} />
              </button>
            )}
          </div>
        </div>

        {/* Metrics Bar */}
        <div className="relative z-10 flex flex-wrap gap-4 mt-6">
          <div className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-100 rounded-full shadow-sm text-sm font-semibold text-gray-600">
            <Clock size={16} className="text-indigo-500" /> {recipe.time || '30 mins'}
          </div>
          <div className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-100 rounded-full shadow-sm text-sm font-semibold text-gray-600">
            <Flame size={16} className="text-orange-500" /> {recipe.calories || 300} kcal
          </div>
          <div className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-100 rounded-full shadow-sm text-sm font-semibold text-gray-600">
            <Leaf size={16} className={ecoScore >= 80 ? "text-green-500" : "text-yellow-500"} /> 
            Eco Score: <span className={ecoScore >= 80 ? "text-green-600 font-bold" : "text-gray-600"}>{ecoScore}/100</span>
          </div>
        </div>
      </div>

      {/* CONTENT BODY */}
      <div className="px-8 pb-8">
        <div className="grid md:grid-cols-12 gap-12">
          
          {/* LEFT: Ingredients (4 Cols) */}
          <div className="md:col-span-5 space-y-8">
            <div className="bg-gray-50 rounded-3xl p-6">
              <h3 className="text-xs font-extrabold text-gray-400 uppercase tracking-widest mb-6">Ingredients</h3>
              <ul className="space-y-3">
                {ingredients.map((ing, i) => (
                  <li key={i} className="flex items-start text-sm font-medium text-gray-700 group">
                    <span className="w-2 h-2 bg-indigo-400 rounded-full mt-2 mr-3 group-hover:scale-125 transition-transform" />
                    {ing}
                  </li>
                ))}
              </ul>
            </div>

            {isDetailed && (
              <div className="border border-gray-100 rounded-3xl p-6">
                <h3 className="text-xs font-extrabold text-gray-400 uppercase tracking-widest mb-4 text-center">Nutrition</h3>
                <div className="h-32">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie data={nutData} innerRadius={35} outerRadius={55} paddingAngle={4} dataKey="value">
                        {nutData.map((entry, index) => <Cell key={`cell-${index}`} fill={entry.color} stroke="none" />)}
                      </Pie>
                      <Tooltip 
                        contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }} 
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="flex justify-center gap-3 text-[10px] font-bold uppercase tracking-wide text-gray-500 mt-2">
                   <div className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-indigo-500"></div>Pro</div>
                   <div className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-amber-400"></div>Carb</div>
                   <div className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-pink-500"></div>Fat</div>
                </div>
              </div>
            )}
          </div>

          {/* RIGHT: Instructions (8 Cols) */}
          {isDetailed && (
             <div className="md:col-span-7">
              <h3 className="text-xs font-extrabold text-gray-400 uppercase tracking-widest mb-6">Method</h3>
              <div className="space-y-8">
                {instructions.map((step, i) => (
                  <div key={i} className="flex gap-5 group">
                    <div className="flex-shrink-0 w-8 h-8 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center text-sm font-bold group-hover:bg-indigo-600 group-hover:text-white transition-all duration-300 shadow-sm">
                      {i + 1}
                    </div>
                    <p className="text-gray-600 leading-relaxed text-[15px] pt-1">{step}</p>
                  </div>
                ))}
              </div>
              
              <div className="mt-12 pt-6 border-t border-gray-100 flex items-center justify-between text-xs text-gray-400">
                <span>Generated by Remixr AI</span>
                <span>{new Date().toLocaleDateString()}</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RecipeCard;