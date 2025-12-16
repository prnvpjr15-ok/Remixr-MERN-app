import React, { useState, useRef, useEffect } from 'react';
import { Plus, X, Camera, Loader, ScanLine, Search } from 'lucide-react';
import { createWorker } from 'tesseract.js';

// Comprehensive list of ingredients for the dropdown
const COMMON_INGREDIENTS = [
  "Avocado", "Bacon", "Basil", "Beans", "Bell Pepper", "Black Pepper", "Bread", "Broccoli", "Broth", "Butter",
  "Carrot", "Cauliflower", "Cheddar", "Cheese", "Chicken Breast", "Chicken Thighs", "Chickpeas", "Coconut Milk", "Corn", "Cream",
  "Cucumber", "Cumin", "Eggs", "Flour", "Garlic", "Ginger", "Ground Beef", "Honey", "Kale", "Lemon",
  "Lentils", "Lettuce", "Lime", "Milk", "Mozzarella", "Mushroom", "Noodles", "Oats", "Olive Oil", "Onion",
  "Oregano", "Paprika", "Parmesan", "Pasta", "Peas", "Pork Chops", "Potatoes", "Quinoa", "Rice", "Salmon",
  "Salt", "Shrimp", "Soy Sauce", "Spaghetti", "Spinach", "Steak", "Stock", "Sugar", "Sweet Potatoes", "Tempeh",
  "Tofu", "Tomato", "Tomato Sauce", "Tortilla", "Tuna", "Vegetable Oil", "Vinegar", "Yogurt", "Zucchini"
].map(i => i.toUpperCase());

const IngredientInput = ({ ingredients, setIngredients }) => {
  const [input, setInput] = useState('');
  const [isScanning, setIsScanning] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [filteredOptions, setFilteredOptions] = useState(COMMON_INGREDIENTS);
  
  const fileInputRef = useRef(null);
  const dropdownRef = useRef(null);
  const inputContainerRef = useRef(null);

  // --- DROPDOWN LOGIC ---
  
  // Filter options as user types
  useEffect(() => {
    if (!input.trim()) {
      setFilteredOptions(COMMON_INGREDIENTS);
    } else {
      const search = input.toUpperCase();
      const filtered = COMMON_INGREDIENTS.filter(item => 
        item.includes(search) && !ingredients.includes(item) // Exclude already added
      );
      setFilteredOptions(filtered);
    }
  }, [input, ingredients]);

  // Handle clicking outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (inputContainerRef.current && !inputContainerRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelectOption = (option) => {
    if (!ingredients.includes(option)) {
      setIngredients([...ingredients, option]);
    }
    setInput('');
    setShowDropdown(false);
  };

  const removeIngredient = (index) => {
    setIngredients(ingredients.filter((_, i) => i !== index));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
  };

  // --- OCR LOGIC (Existing) ---
  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setIsScanning(true);
    try {
      const worker = await createWorker('eng');
      const ret = await worker.recognize(file);
      const text = ret.data.text;
      
      const detectedItems = text
        .split(/\n|,/)
        .map(line => line.replace(/[^a-zA-Z\s]/g, '').trim().toUpperCase())
        .filter(line => line.length > 2 && COMMON_INGREDIENTS.some(ci => ci.includes(line))) // stricter filter
        .filter(line => !ingredients.includes(line));

      if (detectedItems.length > 0) {
        setIngredients([...ingredients, ...detectedItems]);
      } else {
        alert("Could not detect known ingredients.");
      }
      await worker.terminate();
    } catch (err) {
      console.error("OCR Error:", err);
    } finally {
      setIsScanning(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  return (
    <div className="w-full relative" ref={inputContainerRef}>
      {/* Hidden File Input */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleImageUpload}
        accept="image/*"
        className="hidden"
      />

      {/* Input Area */}
      <form onSubmit={handleFormSubmit} className="relative mb-4">
        <div className="relative">
            <input
              type="text"
              value={input}
              onChange={(e) => {
                setInput(e.target.value);
                setShowDropdown(true);
              }}
              onFocus={() => setShowDropdown(true)}
              placeholder="Search ingredients..."
              disabled={isScanning}
              className="w-full pl-12 pr-12 py-4 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-indigo-100 focus:border-indigo-500 outline-none transition-all shadow-sm text-gray-700 disabled:bg-gray-100 disabled:text-gray-400 font-medium uppercase placeholder:normal-case"
            />
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
        </div>
        
        {/* Scan Button (Absolute Right) */}
        <div className="absolute right-2 top-2 bottom-2">
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            disabled={isScanning}
            className={`h-full aspect-square rounded-xl flex items-center justify-center transition-all ${
              isScanning 
                ? 'bg-indigo-100 text-indigo-600' 
                : 'bg-white border border-gray-200 text-gray-500 hover:text-indigo-600 hover:border-indigo-200'
            }`}
            title="Scan Receipt"
          >
            {isScanning ? <Loader size={20} className="animate-spin" /> : <Camera size={20} />}
          </button>
        </div>
      </form>

      {/* DROPDOWN MENU */}
      {showDropdown && (
        <div 
            ref={dropdownRef}
            className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-100 rounded-2xl shadow-xl max-h-60 overflow-y-auto z-50 animate-in fade-in slide-in-from-top-2 duration-200 custom-scrollbar"
        >
            {filteredOptions.length > 0 ? (
                filteredOptions.map((option, idx) => (
                    <button
                        key={idx}
                        onClick={() => handleSelectOption(option)}
                        className="w-full text-left px-5 py-3 hover:bg-indigo-50 hover:text-indigo-700 transition-colors text-sm font-medium border-b border-gray-50 last:border-0 text-gray-600"
                    >
                        {option}
                    </button>
                ))
            ) : (
                <div className="px-5 py-4 text-center text-gray-400 text-sm">
                    No matching ingredients found.
                </div>
            )}
        </div>
      )}

      {/* Scanning Indicator */}
      {isScanning && (
        <div className="mb-4 p-3 bg-indigo-50 border border-indigo-100 rounded-xl flex items-center gap-3 text-sm text-indigo-700 animate-in fade-in">
          <ScanLine className="animate-pulse" size={18} />
          <span>Analyzing image...</span>
        </div>
      )}

      {/* Selected Ingredients Tags */}
      <div className="flex flex-wrap gap-2 min-h-[3rem]">
        {ingredients.length === 0 && !isScanning && !showDropdown && (
          <div className="w-full text-center py-4 text-gray-400 text-sm border-2 border-dashed border-gray-100 rounded-xl">
            Select ingredients from the list or scan a receipt!
          </div>
        )}
        {ingredients.map((ing, idx) => (
          <div key={idx} className="animate-in fade-in zoom-in duration-200 inline-flex items-center pl-4 pr-2 py-1.5 bg-white border border-gray-200 rounded-full shadow-sm text-xs font-bold text-gray-700 tracking-wide">
            {ing}
            <button
              onClick={() => removeIngredient(idx)}
              className="ml-2 p-1 hover:bg-red-50 text-gray-400 hover:text-red-500 rounded-full transition-colors"
            >
              <X size={14} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default IngredientInput;