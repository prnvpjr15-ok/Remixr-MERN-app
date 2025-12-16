import React from 'react';
import { motion } from 'framer-motion';
import { Leaf, ChefHat, Heart, Zap, Users, ShoppingCart, Calendar, BookOpen, Search } from 'lucide-react';

const About = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <div className="min-h-screen pt-28 pb-12 px-4 relative overflow-hidden">
      {/* Background Decor */}
      <div className="fixed inset-0 -z-10 bg-gradient-to-b from-[#F8F9FC] via-white to-[#F8F9FC]"></div>
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-indigo-100/30 rounded-full blur-3xl -z-10"></div>

      <div className="max-w-6xl mx-auto">
        
        {/* HERO SECTION */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-indigo-100 text-indigo-600 text-sm font-bold shadow-sm mb-6">
            <ChefHat size={16} />
            <span>Welcome to Remixr</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-extrabold text-gray-900 mb-6 tracking-tight">
            The Smart Kitchen <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">Operating System.</span>
          </h1>
          <p className="text-xl text-gray-500 max-w-2xl mx-auto leading-relaxed">
            A comprehensive platform designed to reduce food waste, simplify meal planning, and ignite culinary creativity using the power of AI.
          </p>
        </motion.div>

        {/* FEATURE ECOSYSTEM */}
        <div className="mb-24">
          <div className="flex items-center gap-4 mb-8">
            <div className="h-px bg-gray-200 flex-1"></div>
            <span className="text-sm font-bold text-gray-400 uppercase tracking-widest">Explore the Features</span>
            <div className="h-px bg-gray-200 flex-1"></div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            
            {/* Feature 1: The Generator */}
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-white p-8 rounded-[2rem] border border-gray-100 shadow-xl shadow-indigo-100/20 relative overflow-hidden group"
            >
              <div className="absolute top-0 right-0 p-24 bg-indigo-50 rounded-full blur-2xl group-hover:bg-indigo-100 transition-colors"></div>
              <div className="relative z-10">
                <div className="w-12 h-12 bg-indigo-600 text-white rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-indigo-500/30">
                  <Zap size={24} />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">AI Recipe Remix</h3>
                <p className="text-gray-500 mb-4 leading-relaxed">
                  The core engine. Input or scan your ingredients, set strict dietary filters (Vegan, Keto, etc.), and generate unique recipes instantly.
                </p>
                <ul className="text-sm text-gray-600 space-y-2">
                  <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-indigo-400 rounded-full"></div> Smart OCR Receipt Scanning</li>
                  <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-indigo-400 rounded-full"></div> Allergy & Cuisine Filters</li>
                  <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-indigo-400 rounded-full"></div> Eco-Score & Macro Analysis</li>
                </ul>
              </div>
            </motion.div>

            {/* Feature 2: Community */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-white p-8 rounded-[2rem] border border-gray-100 shadow-xl shadow-purple-100/20 relative overflow-hidden group"
            >
              <div className="absolute top-0 right-0 p-24 bg-purple-50 rounded-full blur-2xl group-hover:bg-purple-100 transition-colors"></div>
              <div className="relative z-10">
                <div className="w-12 h-12 bg-purple-600 text-white rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-purple-500/30">
                  <Users size={24} />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">Global Community</h3>
                <p className="text-gray-500 mb-4 leading-relaxed">
                  A social hub for zero-waste chefs. Share your best creations publicly or browse the feed for inspiration from other users.
                </p>
                <ul className="text-sm text-gray-600 space-y-2">
                  <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-purple-400 rounded-full"></div> Public Recipe Feed</li>
                  <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-purple-400 rounded-full"></div> Upvote & Save Favorites</li>
                  <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-purple-400 rounded-full"></div> Discover Trending Dishes</li>
                </ul>
              </div>
            </motion.div>

            {/* Feature 3: Kitchen Tools */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-white p-8 rounded-[2rem] border border-gray-100 shadow-xl shadow-emerald-100/20 relative overflow-hidden group"
            >
              <div className="absolute top-0 right-0 p-24 bg-emerald-50 rounded-full blur-2xl group-hover:bg-emerald-100 transition-colors"></div>
              <div className="relative z-10">
                <div className="w-12 h-12 bg-emerald-600 text-white rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-emerald-500/30">
                  <Calendar size={24} />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">Kitchen Tools</h3>
                <p className="text-gray-500 mb-4 leading-relaxed">
                  Your digital kitchen assistant. Organize your week and your groceries in one unified interface.
                </p>
                <div className="flex gap-4">
                  <div className="flex-1 bg-white/50 rounded-xl p-3 border border-emerald-100">
                    <div className="flex items-center gap-2 font-bold text-emerald-800 mb-1"><ShoppingCart size={14}/> Shopping List</div>
                    <p className="text-xs text-emerald-600">Persistent checklist for your pantry needs.</p>
                  </div>
                  <div className="flex-1 bg-white/50 rounded-xl p-3 border border-emerald-100">
                    <div className="flex items-center gap-2 font-bold text-emerald-800 mb-1"><Calendar size={14}/> Meal Planner</div>
                    <p className="text-xs text-emerald-600">Drag generated recipes into your weekly slots.</p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Feature 4: Cookbook */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-white p-8 rounded-[2rem] border border-gray-100 shadow-xl shadow-amber-100/20 relative overflow-hidden group"
            >
              <div className="absolute top-0 right-0 p-24 bg-amber-50 rounded-full blur-2xl group-hover:bg-amber-100 transition-colors"></div>
              <div className="relative z-10">
                <div className="w-12 h-12 bg-amber-500 text-white rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-amber-500/30">
                  <BookOpen size={24} />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">My Cookbook</h3>
                <p className="text-gray-500 mb-4 leading-relaxed">
                  Your personal recipe repository. Save private experiments or successful remixes for future cooking sessions.
                </p>
                <ul className="text-sm text-gray-600 space-y-2">
                  <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-amber-400 rounded-full"></div> Save Private Recipes</li>
                  <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-amber-400 rounded-full"></div> Download as Image/PDF</li>
                  <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-amber-400 rounded-full"></div> Edit & Manage Collections</li>
                </ul>
              </div>
            </motion.div>

          </div>
        </div>

        {/* MISSION STATEMENT */}
        <motion.div 
           initial={{ opacity: 0, scale: 0.95 }}
           whileInView={{ opacity: 1, scale: 1 }}
           viewport={{ once: true }}
           className="bg-indigo-900 text-white rounded-[2.5rem] p-12 relative overflow-hidden text-center"
        >
          <div className="absolute top-0 right-0 p-40 bg-white opacity-5 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 p-40 bg-indigo-500 opacity-20 rounded-full blur-3xl"></div>
          
          <div className="relative z-10">
            <Leaf className="mx-auto mb-6 text-green-400" size={48} />
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Why we built this.</h2>
            <p className="text-indigo-200 text-lg max-w-2xl mx-auto mb-8 leading-relaxed">
              We believe that creativity is the solution to food waste. By making it effortless to visualize meals from "random" ingredients, we empower home cooks to save money and the planet, one meal at a time.
            </p>
          </div>
        </motion.div>

      </div>
    </div>
  );
};

export default About;