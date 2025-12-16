import React from 'react';
import { Loader } from 'lucide-react';

const PlaceholderPage = ({ title }) => (
  <div className="max-w-4xl mx-auto px-4 py-12 text-center">
    <div className="inline-flex p-4 bg-indigo-50 text-indigo-600 rounded-full mb-6">
      <Loader className="animate-spin" size={32} />
    </div>
    <h2 className="text-2xl font-bold text-gray-900 mb-2">{title} Page</h2>
    <p className="text-gray-500 max-w-md mx-auto">
      This page will connect to our MongoDB database in Step 3. 
      For now, we are focusing on the Remix generation engine.
    </p>
  </div>
);

export default PlaceholderPage;