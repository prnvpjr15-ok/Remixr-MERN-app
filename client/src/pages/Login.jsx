import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { ChefHat, ArrowRight, Loader } from 'lucide-react';

const Login = ({ switchToSignup }) => {
  const { login } = useAuth();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    const res = await login(formData.email, formData.password);
    if (!res.success) setError(res.message);
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-[#F8F9FC]">
      <div className="max-w-md w-full bg-white p-8 rounded-[2.5rem] shadow-xl shadow-indigo-100/50 border border-gray-100">
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-indigo-50 text-indigo-600 rounded-2xl mb-6">
            <ChefHat size={32} />
          </div>
          <h1 className="text-3xl font-extrabold text-gray-900 mb-2">Welcome Back</h1>
          <p className="text-gray-500">Sign in to continue your cooking journey.</p>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-50 text-red-600 text-sm rounded-xl border border-red-100 font-medium text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2 ml-1">Email</label>
            <input
              type="email"
              required
              className="w-full px-5 py-4 bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-indigo-100 outline-none transition-all font-medium"
              placeholder="chef@example.com"
              value={formData.email}
              onChange={e => setFormData({...formData, email: e.target.value})}
            />
          </div>
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2 ml-1">Password</label>
            <input
              type="password"
              required
              className="w-full px-5 py-4 bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-indigo-100 outline-none transition-all font-medium"
              placeholder="••••••••"
              value={formData.password}
              onChange={e => setFormData({...formData, password: e.target.value})}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-bold text-lg shadow-lg shadow-indigo-200 transition-all flex items-center justify-center"
          >
            {loading ? <Loader className="animate-spin" /> : <>Sign In <ArrowRight className="ml-2" size={20} /></>}
          </button>
        </form>

        <p className="text-center mt-8 text-gray-500">
          Don't have an account?{' '}
          <button onClick={switchToSignup} className="text-indigo-600 font-bold hover:underline">
            Create one
          </button>
        </p>
      </div>
    </div>
  );
};

export default Login;