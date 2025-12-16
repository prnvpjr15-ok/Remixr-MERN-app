import React, { useState, useEffect } from 'react';
import { useUser } from '../hooks/useUser';
import { ShoppingCart, Calendar, Trash2, Plus, Check, Loader } from 'lucide-react';

const Tools = () => {
  const userId = useUser();
  const [activeTab, setActiveTab] = useState('shopping');
  const [loading, setLoading] = useState(true);
  
  const [shoppingList, setShoppingList] = useState([]);
  const [mealPlan, setMealPlan] = useState({});
  const [newItem, setNewItem] = useState('');

  useEffect(() => {
    if (!userId) return;
    const fetchData = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/user/${userId}`);
        const data = await res.json();
        setShoppingList(data.shoppingList || []);
        setMealPlan(data.mealPlan || {});
      } catch (err) {
        console.error("Error fetching tools:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [userId]);

  const saveList = async (newList) => {
    setShoppingList(newList);
    try {
      await fetch(`http://localhost:5000/api/user/${userId}/shopping`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ shoppingList: newList }),
      });
    } catch (err) { console.error(err); }
  };

  const addItem = (e) => {
    e.preventDefault();
    if (!newItem.trim()) return;
    const newList = [...shoppingList, { item: newItem, completed: false }];
    saveList(newList);
    setNewItem('');
  };

  const toggleItem = (index) => {
    const newList = [...shoppingList];
    newList[index].completed = !newList[index].completed;
    saveList(newList);
  };

  const removeItem = (index) => {
    const newList = shoppingList.filter((_, i) => i !== index);
    saveList(newList);
  };

  const days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];

  const clearDay = async (day) => {
    const newPlan = { ...mealPlan };
    delete newPlan[day];
    setMealPlan(newPlan);
    
    try {
      await fetch(`http://localhost:5000/api/user/${userId}/mealplan`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ day, recipe: null }),
      });
    } catch (err) { console.error(err); }
  };

  if (loading) return <div className="flex justify-center py-32"><Loader className="animate-spin text-indigo-600" /></div>;

  return (
    <div className="max-w-4xl mx-auto px-4 pt-32 pb-12">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-extrabold text-gray-900 mb-2">Kitchen Tools</h1>
        <p className="text-gray-500">Plan your week and manage your groceries.</p>
      </div>

      <div className="flex justify-center mb-8">
        <div className="bg-white p-1 rounded-xl shadow-sm border border-gray-100 inline-flex">
          <button
            onClick={() => setActiveTab('shopping')}
            className={`flex items-center px-6 py-2.5 rounded-lg font-medium transition-all ${
              activeTab === 'shopping' ? 'bg-indigo-600 text-white shadow-md' : 'text-gray-500 hover:bg-gray-50'
            }`}
          >
            <ShoppingCart size={18} className="mr-2" /> Shopping List
          </button>
          <button
            onClick={() => setActiveTab('planning')}
            className={`flex items-center px-6 py-2.5 rounded-lg font-medium transition-all ${
              activeTab === 'planning' ? 'bg-indigo-600 text-white shadow-md' : 'text-gray-500 hover:bg-gray-50'
            }`}
          >
            <Calendar size={18} className="mr-2" /> Meal Planner
          </button>
        </div>
      </div>

      {activeTab === 'shopping' && (
        <div className="bg-white rounded-3xl p-6 md:p-8 shadow-xl shadow-gray-200/50 border border-gray-100">
          <form onSubmit={addItem} className="relative mb-6">
            <input
              type="text"
              value={newItem}
              onChange={(e) => setNewItem(e.target.value)}
              placeholder="Add item (e.g., Milk, Avocados)"
              className="w-full pl-5 pr-14 py-4 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-indigo-100 outline-none"
            />
            <button type="submit" className="absolute right-2 top-2 bottom-2 aspect-square bg-indigo-600 text-white rounded-xl flex items-center justify-center">
              <Plus size={20} />
            </button>
          </form>

          <div className="space-y-3">
            {shoppingList.length === 0 && <p className="text-center text-gray-400 py-8">Your list is empty.</p>}
            {shoppingList.map((item, idx) => (
              <div key={idx} className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-xl group transition-colors">
                <div className="flex items-center gap-3 cursor-pointer" onClick={() => toggleItem(idx)}>
                  <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${item.completed ? 'bg-green-500 border-green-500 text-white' : 'border-gray-300'}`}>
                    {item.completed && <Check size={14} />}
                  </div>
                  <span className={`text-lg ${item.completed ? 'text-gray-400 line-through' : 'text-gray-700'}`}>{item.item}</span>
                </div>
                <button onClick={() => removeItem(idx)} className="text-gray-300 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Trash2 size={18} />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'planning' && (
        <div className="grid gap-4">
          <div className="bg-indigo-50 p-4 rounded-xl text-indigo-800 text-sm mb-4">
            <span className="font-bold">Pro Tip:</span> To add meals here, go to your <b>Cookbook</b> or <b>Remix</b> result and click the Calendar icon.
          </div>

          {days.map(day => {
            const meal = mealPlan[day];
            return (
              <div key={day} className="bg-white p-5 rounded-2xl border border-gray-100 flex flex-col md:flex-row md:items-center justify-between shadow-sm">
                <div className="mb-2 md:mb-0">
                  <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider">{day}</h3>
                  {meal ? (
                    <div className="font-bold text-lg text-gray-800 flex items-center mt-1">
                      {meal.title}
                      <span className="ml-3 text-xs font-normal bg-orange-100 text-orange-700 px-2 py-0.5 rounded-full">
                        {meal.calories} kcal
                      </span>
                    </div>
                  ) : (
                    <span className="text-gray-400 italic text-sm">No meal planned</span>
                  )}
                </div>
                
                {meal && (
                  <button 
                    onClick={() => clearDay(day)}
                    className="text-sm text-red-500 hover:bg-red-50 px-3 py-1.5 rounded-lg transition-colors"
                  >
                    Clear Slot
                  </button>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Tools;