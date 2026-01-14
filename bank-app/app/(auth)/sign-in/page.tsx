// File: app/auth/signin/page.tsx

'use client';

import { useState, ChangeEvent, FormEvent } from 'react';
import { Eye, EyeOff, Lock, Mail, AlertCircle } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';

interface SignInFormData {
  email: string;
  password: string;
}

interface FormErrors {
  email?: string;
  password?: string;
  submit?: string;
}

// --- AUTHORIZED GROUP DEFINITION ---
const AUTHORIZED_CREDENTIALS = [
  { email: 'admin@tddbank.com', password: '123456', name: 'Admin User' },
  { email: 'user@tddbank.com', password: 'password', name: 'Test User' },
  { email: 'manager@tddbank.com', password: 'bankmanager', name: 'Operations Manager' }
];

export default function SignIn() {
  const { login } = useAuth();
  const router = useRouter();
  
  const [formData, setFormData] = useState<SignInFormData>({
    email: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [errors, setErrors] = useState<FormErrors>({});
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: FormEvent): void => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsLoading(true);
    // Clear previous submission errors
    setErrors(prev => ({ ...prev, submit: '' }));
    
    // Simulate network latency
    setTimeout(() => {
      // Logic to limit access to specific group
      const authorizedUser = AUTHORIZED_CREDENTIALS.find(
        user => user.email === formData.email && user.password === formData.password
      );

      if (authorizedUser) {
        // SUCCESS: Credential matches the group
        const bankUser = {
          name: authorizedUser.name,
          email: authorizedUser.email,
          mobile: '+912441139***',
          address: '21 Baker Street, Lodon, UK ',
          is2FAEnabled: true
        };

        localStorage.setItem('bankUser', JSON.stringify(bankUser));
        localStorage.setItem('isLoggedIn', 'true');
        
        login(authorizedUser.name);
        setIsLoading(false);
        router.push('/dashboard');
      } else {
        // FAILURE: Credentials not in the authorized group
        setIsLoading(false);
        setErrors(prev => ({
          ...prev,
          submit: 'Access Denied: This account is not part of the authorized banking group.'
        }));
      }
    }, 1200);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4 font-sans">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-8">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-600 rounded-full mb-4 shadow-lg shadow-blue-200">
            <Lock className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900">Welcome Back</h1>
          <p className="text-gray-600 mt-2">Sign in to your banking account</p>
        </div>

        {/* This block displays the Access Denied message */}
        {errors.submit && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl flex items-start gap-3 animate-in fade-in slide-in-from-top-2 duration-300">
            <AlertCircle className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" />
            <p className="text-sm text-red-800 leading-relaxed font-medium">{errors.submit}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
              Email Address
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={`w-full pl-10 pr-4 py-3 border ${
                  errors.email ? 'border-red-500 bg-red-50/30' : 'border-gray-300'
                } rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition text-black placeholder-gray-400`}
                placeholder="Enter your email"
              />
            </div>
            {errors.email && (
              <p className="mt-1 text-sm text-red-600 font-medium">{errors.email}</p>
            )}
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-semibold text-gray-700 mb-2">
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className={`w-full pl-10 pr-12 py-3 border ${
                  errors.password ? 'border-red-500 bg-red-50/30' : 'border-gray-300'
                } rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition text-black placeholder-gray-400`}
                placeholder="Enter your password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
            {errors.password && (
              <p className="mt-1 text-sm text-red-600 font-medium">{errors.password}</p>
            )}
          </div>

          <div className="flex items-center justify-between">
            <label className="flex items-center cursor-pointer">
              <input
                type="checkbox"
                className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 cursor-pointer"
              />
              <span className="ml-2 text-sm text-gray-600 select-none">Remember me</span>
            </label>
            <a href="#" className="text-sm text-blue-600 hover:text-blue-700 font-semibold transition-colors">
              Forgot password?
            </a>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-bold hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all active:scale-[0.98] disabled:bg-blue-400 disabled:cursor-not-allowed shadow-lg shadow-blue-200"
          >
            {isLoading ? (
              <div className="flex items-center justify-center gap-2">
                <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                Verifying...
              </div>
            ) : 'Sign In'}
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-gray-600 text-sm">
            Don't have an account?{' '}
            <a href="/sign-up" className="text-blue-600 hover:text-blue-700 font-bold underline-offset-4 hover:underline">
              Request Access
            </a>
          </p>
        </div>

        <div className="mt-8 pt-6 border-t border-gray-100">
          <p className="text-[10px] uppercase tracking-widest text-center text-gray-400 font-bold">
            Secure Bank Level Encryption
          </p>
        </div>
      </div>
    </div>
  );
}