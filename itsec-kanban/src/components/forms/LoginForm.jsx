import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import iconEye from '../../assets/icons/eye.png';
import PrimaryBtn from '../ui/Button';

const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!username || !password) {
      setError('Please enter both username and password.');
      return;
    }
    setError('');
    navigate('/board');
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <input
          type="text"
          value={username}
          placeholder="Username"
          onChange={e => setUsername(e.target.value)}
          className="w-full border-b border-gray-800 focus:outline-none focus:border-gray-500 py-2 bg-transparent transition-colors duration-300"
        />
      </div>
      <div className="relative">
        <input
          type={showPassword ? "text" : "password"}
          value={password}
          placeholder="Password"
          onChange={e => setPassword(e.target.value)}
          className="w-full border-b border-gray-800 focus:outline-none focus:border-indigo-500 py-2 bg-transparent transition-colors duration-300"
        />
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-0 top-0 h-full flex items-center px-2 bg-transparent border-none cursor-pointer focus:outline-none"
          tabIndex={-1}
          aria-label={showPassword ? "Hide password" : "Show password"}
        >
          <img
            src={iconEye}
            alt={showPassword ? "Hide password" : "Show password"}
            className={`w-5 h-5 ${showPassword ? 'opacity-50 grayscale' : ''}`}
          />
        </button>
      </div>
      {error && <div className="text-red-500">{error}</div>}
      <PrimaryBtn type="submit">Login</PrimaryBtn>
    </form>
  );
};

export default LoginForm;