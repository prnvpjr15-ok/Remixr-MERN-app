import React, { useState } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import { Loader } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// Components
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Favorites from './pages/Favorites';
import Community from './pages/Community';
import Tools from './pages/Tools';
import About from './pages/About';
import Login from './pages/Login';
import Signup from './pages/Signup';

// --- ANIMATION VARIANTS ---
const pageVariants = {
  initial: { opacity: 0, y: 10, scale: 0.98 },
  animate: { opacity: 1, y: 0, scale: 1 },
  exit: { opacity: 0, y: -10, scale: 0.98 }
};

const transitionSpec = {
  type: "spring",
  stiffness: 260,
  damping: 20
};

const MainLayout = () => {
  const { user, loading } = useAuth();
  
  // Default to 'about'
  const [activePage, setActivePage] = useState('about'); 
  const [authView, setAuthView] = useState('login'); // 'login' or 'signup'

  // Helper to wrap pages with animation
  const AnimatedPage = ({ children, pageKey }) => (
    <motion.div
      key={pageKey}
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={transitionSpec}
      className="w-full h-full"
    >
      {children}
    </motion.div>
  );

  // 1. LOADING STATE
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F8F9FC]">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <Loader className="animate-spin text-indigo-600" size={40} />
        </motion.div>
      </div>
    );
  }

  // 2. AUTHENTICATION SCREENS (Login / Signup)
  if (!user) {
    return (
      <div className="min-h-screen bg-[#F8F9FC] relative overflow-hidden">
        <AnimatePresence mode="wait">
          {authView === 'login' ? (
            <motion.div
              key="login"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 50 }}
              transition={{ duration: 0.3 }}
              className="w-full h-full"
            >
              <Login switchToSignup={() => setAuthView('signup')} />
            </motion.div>
          ) : (
            <motion.div
              key="signup"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.3 }}
              className="w-full h-full"
            >
              <Signup switchToLogin={() => setAuthView('login')} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  }

  // 3. MAIN APPLICATION
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-[#F8F9FC] font-sans text-gray-900 selection:bg-indigo-100 selection:text-indigo-900 flex flex-col"
    >
      <Navbar activePage={activePage} setActivePage={setActivePage} />
      
      <main className="flex-grow relative">
        <AnimatePresence mode="wait">
          {activePage === 'about' && (
            <AnimatedPage pageKey="about">
              <About />
            </AnimatedPage>
          )}
          {activePage === 'home' && (
            <AnimatedPage pageKey="home">
              <Home />
            </AnimatedPage>
          )}
          {activePage === 'remix' && (
            <AnimatedPage pageKey="remix">
              <Home />
            </AnimatedPage>
          )}
          {activePage === 'favorites' && (
            <AnimatedPage pageKey="favorites">
              <Favorites />
            </AnimatedPage>
          )}
          {activePage === 'community' && (
            <AnimatedPage pageKey="community">
              <Community />
            </AnimatedPage>
          )}
          {activePage === 'tools' && (
            <AnimatedPage pageKey="tools">
              <Tools />
            </AnimatedPage>
          )}
        </AnimatePresence>
      </main>

      <footer className="bg-white border-t border-gray-200 mt-auto py-12 z-10 relative">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-gray-400 text-sm">
            © Remixr App.
          </p>
        </div>
      </footer>
    </motion.div>
  );
};

export default function App() {
  return (
    <AuthProvider>
      <MainLayout />
    </AuthProvider>
  );
}