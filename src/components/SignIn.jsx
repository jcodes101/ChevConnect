import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here, you can add your sign-in logic, like checking email and password
    // For now, it will navigate to the '/home' page after submission
    navigate('/hero');  // Change '/home' to wherever you want to navigate
  };

  return (
    <div className="min-h-screen bg-gray-100 pt-32 px-4">
      <div className="max-w-md mx-auto">
        <div className="bg-white rounded-lg shadow-md p-8">
          <div className="flex items-center justify-center mb-8">
            <ChevronRight className="h-8 w-8 text-[#00395D]" />
            <span className="text-2xl font-bold text-[#00395D] ml-2">Sign In</span>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email address
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-[#00395D] focus:outline-none focus:ring-1 focus:ring-[#00395D]"
                required
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-[#00395D] focus:outline-none focus:ring-1 focus:ring-[#00395D]"
                required
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  type="checkbox"
                  className="h-4 w-4 rounded border-gray-300 text-[#00395D] focus:ring-[#00395D]"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
                  Remember me
                </label>
              </div>
              <button type="button" className="text-sm text-[#00395D] hover:text-blue-800">
                Forgot password?
              </button>
            </div>

            <button
              type="submit"
              className="w-full bg-[#00395D] py-2 px-4 text-white rounded-md hover:bg-blue-900 focus:outline-none focus:ring-2 focus:ring-[#00395D] focus:ring-offset-2"
            >
              Sign In
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Don't have an account?{' '}
              <button className="text-[#00395D] hover:text-blue-800 font-medium">
                Sign up
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
