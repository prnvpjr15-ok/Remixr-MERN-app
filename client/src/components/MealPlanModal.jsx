import React, { useState } from 'react';
import { X, Calendar, Check } from 'lucide-react';

const MealPlanModal = ({ isOpen, onClose, onConfirm, recipeTitle }) => {
  const [selectedDay, setSelectedDay] = useState('monday');
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];

  const handleSubmit = async () => {
    setLoading(true);
    await onConfirm(selectedDay);
    setLoading(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl w-full max-w-md shadow-2xl overflow-hidden scale-100">
        
        {/* Header */}
        <div className="bg-indigo-600 p-4 flex justify-between items-center text-white">
          <div className="flex items-center gap-2 font-bold">
            <Calendar size={20} /> Add to Meal Plan
          </div>
          <button onClick={onClose} className="hover:bg-white/20 p-1 rounded-full transition-colors">
            <X size={20} />
          </button>
        </div>

        {/* Body */}
        <div className="p-6">
          <p className="text-gray-600 mb-4 text-sm">
            Select a day to cook <span className="font-bold text-gray-900">{recipeTitle}</span>:
          </p>

          <div className="grid grid-cols-2 gap-2 mb-6">
            {days.map(day => (
              <button
                key={day}
                onClick={() => setSelectedDay(day)}
                className={`p-3 rounded-xl text-sm font-medium capitalize border transition-all text-left flex justify-between items-center ${
                  selectedDay === day
                    ? 'bg-indigo-50 border-indigo-500 text-indigo-700 ring-1 ring-indigo-500'
                    : 'bg-white border-gray-200 text-gray-600 hover:border-gray-400'
                }`}
              >
                {day}
                {selectedDay === day && <Check size={16} className="text-indigo-600" />}
              </button>
            ))}
          </div>

          <button
            onClick={handleSubmit}
            disabled={loading}
            className="w-full bg-indigo-600 text-white py-3 rounded-xl font-bold text-lg hover:bg-indigo-700 transition-colors flex justify-center items-center"
          >
            {loading ? 'Scheduling...' : 'Confirm Schedule'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default MealPlanModal;