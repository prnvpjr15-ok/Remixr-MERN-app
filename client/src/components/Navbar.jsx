import React, { useState } from 'react';
import { ChefHat, LogOut } from 'lucide-react';
import { motion, useScroll, useMotionValueEvent } from 'framer-motion';
import { useAuth } from '../context/AuthContext';

const Navbar = ({ activePage, setActivePage }) => {
  const { logout, user } = useAuth();
  const [hidden, setHidden] = useState(false);
  const { scrollY } = useScroll();

  // Detect Scroll Direction
  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious();
    
    // If scrolling DOWN and we are past the top (150px), hide navbar
    if (latest > previous && latest > 150) {
      setHidden(true);
    } 
    // If scrolling UP, show navbar
    else {
      setHidden(false);
    }
  });

  return (
    <motion.nav 
      variants={{
        visible: { y: 0 },
        hidden: { y: "-120%" }, // Slide completely out of view
      }}
      initial="visible"
      animate={hidden ? "hidden" : "visible"}
      transition={{ duration: 0.35, ease: "easeInOut" }}
      className="fixed top-0 left-0 right-0 z-50 px-4 py-4"
    >
      <div className="max-w-7xl mx-auto bg-white/80 backdrop-blur-md border border-white/40 shadow-lg shadow-black/5 rounded-2xl px-6">
        <div className="flex justify-between h-16 items-center">
          {/* Logo Section */}
          <div 
            className="flex items-center gap-3 cursor-pointer group" 
            onClick={() => setActivePage('about')}
          >
            <div className="bg-gradient-to-tr from-indigo-600 to-violet-600 p-2.5 rounded-xl text-white shadow-lg shadow-indigo-500/30 group-hover:scale-105 transition-transform duration-300">
              <ChefHat size={24} />
            </div>
            <span className="text-2xl font-extrabold tracking-tight text-gray-900">
              Remixr<span className="text-indigo-600">.</span>
            </span>
          </div>
          
          {/* Navigation Links */}
          <div className="hidden md:flex items-center gap-1">
            {['About', 'Remix', 'Favorites', 'Community', 'Tools'].map((item) => (
              <button
                key={item}
                onClick={() => setActivePage(item.toLowerCase())}
                className={`relative px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-300 ${
                  activePage === item.toLowerCase()
                    ? 'text-indigo-600 bg-indigo-50'
                    : 'text-gray-500 hover:text-gray-900 hover:bg-gray-50'
                }`}
              >
                {item}
                {activePage === item.toLowerCase() && (
                  <motion.div 
                    layoutId="activeTab"
                    className="absolute inset-0 bg-indigo-100/50 rounded-xl -z-10" 
                  />
                )}
              </button>
            ))}
            
            <div className="h-6 w-px bg-gray-200 mx-2"></div>

            <div className="flex items-center gap-3 pl-2">
              <span className="text-sm font-bold text-gray-700 hidden lg:block">
                Hi, {user?.name ? user.name.split(' ')[0] : 'Chef'}
              </span>
              <button 
                onClick={logout}
                className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-colors"
                title="Logout"
              >
                <LogOut size={20} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;