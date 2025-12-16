import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { ChefHat, ArrowRight, Loader, RefreshCw, Check, X } from 'lucide-react';

const Signup = ({ switchToLogin }) => {
  const { register } = useAuth();
  
  // Form State
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    captchaInput: ''
  });

  // Validation State
  const [generatedCaptcha, setGeneratedCaptcha] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [passwordCriteria, setPasswordCriteria] = useState({
    length: false,
    upper: false,
    lower: false,
    number: false,
    special: false
  });

  // Generate Captcha on Mount
  useEffect(() => {
    generateNewCaptcha();
  }, []);

  // Update Password Criteria Real-time
  useEffect(() => {
    const p = formData.password;
    setPasswordCriteria({
      length: p.length >= 10,
      upper: /[A-Z]/.test(p),
      lower: /[a-z]/.test(p),
      number: /[0-9]/.test(p),
      special: /[!@#$%^&*(),.?":{}|<>]/.test(p)
    });
  }, [formData.password]);

  const generateNewCaptcha = () => {
    // Removed similar looking characters (I, l, 1, O, 0) to avoid confusion
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZabcdefghjkmnpqrstuvwxyz23456789';
    let result = '';
    for (let i = 0; i < 6; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setGeneratedCaptcha(result);
    setFormData(prev => ({ ...prev, captchaInput: '' }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // 1. Check Captcha
    if (formData.captchaInput !== generatedCaptcha) {
      setError("Incorrect Captcha code. Please try again.");
      generateNewCaptcha(); // Reset to prevent spam
      return;
    }

    // 2. Check Password Match
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    // 3. Check Password Strength
    const allMet = Object.values(passwordCriteria).every(Boolean);
    if (!allMet) {
      setError("Password does not meet security requirements.");
      return;
    }

    setLoading(true);
    // Note: We map 'username' to 'name' because the backend expects 'name'
    const res = await register(formData.username, formData.email, formData.password);
    
    if (!res.success) {
      setError(res.message);
      generateNewCaptcha(); // Reset captcha on server error too
    }
    setLoading(false);
  };

  const PasswordRequirement = ({ met, text }) => (
    <div className={`flex items-center text-xs ${met ? 'text-green-600' : 'text-gray-400'}`}>
      {met ? <Check size={12} className="mr-1" /> : <div className="w-3 h-3 border border-gray-300 rounded-full mr-1"></div>}
      {text}
    </div>
  );

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-[#F8F9FC] py-10">
      <div className="max-w-md w-full bg-white p-8 rounded-[2.5rem] shadow-xl shadow-indigo-100/50 border border-gray-100">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-14 h-14 bg-indigo-50 text-indigo-600 rounded-2xl mb-4">
            <ChefHat size={28} />
          </div>
          <h1 className="text-2xl font-extrabold text-gray-900">Create Account</h1>
          <p className="text-sm text-gray-500">Join the zero-waste movement.</p>
        </div>

        {error && (
          <div className="mb-6 p-3 bg-red-50 text-red-600 text-sm rounded-xl border border-red-100 font-medium flex items-start">
            <X size={16} className="mr-2 mt-0.5 flex-shrink-0" />
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          
          {/* USERNAME */}
          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1.5 ml-1 uppercase tracking-wide">Username</label>
            <input
              type="text"
              required
              className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-indigo-100 outline-none transition-all font-medium text-sm"
              placeholder="ChefRamsey"
              value={formData.username}
              onChange={e => setFormData({...formData, username: e.target.value})}
            />
          </div>

          {/* EMAIL */}
          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1.5 ml-1 uppercase tracking-wide">Email</label>
            <input
              type="email"
              required
              className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-indigo-100 outline-none transition-all font-medium text-sm"
              placeholder="chef@example.com"
              value={formData.email}
              onChange={e => setFormData({...formData, email: e.target.value})}
            />
          </div>

          {/* PASSWORD */}
          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1.5 ml-1 uppercase tracking-wide">Password</label>
            <input
              type="password"
              required
              className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-indigo-100 outline-none transition-all font-medium text-sm"
              placeholder="••••••••••"
              value={formData.password}
              onChange={e => setFormData({...formData, password: e.target.value})}
            />
            {/* Password Criteria Grid */}
            <div className="grid grid-cols-2 gap-1 mt-2 pl-1">
              <PasswordRequirement met={passwordCriteria.length} text="10+ Characters" />
              <PasswordRequirement met={passwordCriteria.upper} text="Uppercase Letter" />
              <PasswordRequirement met={passwordCriteria.lower} text="Lowercase Letter" />
              <PasswordRequirement met={passwordCriteria.number} text="Number (0-9)" />
              <PasswordRequirement met={passwordCriteria.special} text="Symbol (!@#$)" />
            </div>
          </div>

          {/* CONFIRM PASSWORD */}
          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1.5 ml-1 uppercase tracking-wide">Confirm Password</label>
            <input
              type="password"
              required
              className={`w-full px-4 py-3 bg-gray-50 border rounded-xl focus:ring-2 outline-none transition-all font-medium text-sm ${
                 formData.confirmPassword && formData.password !== formData.confirmPassword 
                 ? 'border-red-200 focus:ring-red-100' 
                 : 'border-gray-100 focus:ring-indigo-100'
              }`}
              placeholder="••••••••••"
              value={formData.confirmPassword}
              onChange={e => setFormData({...formData, confirmPassword: e.target.value})}
            />
          </div>

          {/* CAPTCHA */}
          <div className="pt-2">
            <label className="block text-xs font-bold text-gray-700 mb-1.5 ml-1 uppercase tracking-wide">Security Check</label>
            <div className="flex gap-3">
              {/* Captcha Display */}
              <div className="flex-1 bg-gray-100 rounded-xl flex items-center justify-between px-4 border border-gray-200 select-none relative overflow-hidden group">
                 {/* Visual Noise Pattern */}
                 <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/diagmonds-light.png')]"></div>
                 <span className="font-mono text-xl font-bold tracking-widest text-gray-600 z-10 italic" style={{textShadow: '2px 1px 1px rgba(0,0,0,0.1)'}}>
                   {generatedCaptcha}
                 </span>
                 <button 
                   type="button" 
                   onClick={generateNewCaptcha}
                   className="p-1.5 hover:bg-gray-200 rounded-lg text-gray-500 transition-colors z-10"
                   title="Refresh Captcha"
                 >
                   <RefreshCw size={16} />
                 </button>
              </div>
              
              {/* Captcha Input (FIXED: Removed 'uppercase' class) */}
              <input
                type="text"
                required
                className="flex-1 px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-indigo-100 outline-none font-medium text-center text-sm tracking-widest placeholder:normal-case placeholder:tracking-normal"
                placeholder="Enter Code"
                value={formData.captchaInput}
                onChange={e => setFormData({...formData, captchaInput: e.target.value})}
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-bold text-lg shadow-lg shadow-indigo-200 transition-all flex items-center justify-center mt-4"
          >
            {loading ? <Loader className="animate-spin" /> : <>Sign Up <ArrowRight className="ml-2" size={20} /></>}
          </button>
        </form>

        <p className="text-center mt-6 text-gray-500 text-sm">
          Already have an account?{' '}
          <button onClick={switchToLogin} className="text-indigo-600 font-bold hover:underline">
            Log in
          </button>
        </p>
      </div>
    </div>
  );
};

export default Signup;