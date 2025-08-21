import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PrimaryBtn from '../ui/Button';
import Icon from "../ui/Icon";
import eyeIcon from '../../assets/icons/eye-icon.svg';

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
        localStorage.setItem('username', username);
        localStorage.setItem('isLoggedIn', 'true');
        navigate('/board');
    };

    return (
        <form onSubmit={handleSubmit} className="mt-[74px] space-y-[60px] text-lg max-w-[430px] w-full">
            {error && <div className="text-red-500">{error}</div>}
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
                    <Icon name="close" src={eyeIcon} size={34} className={`${showPassword ? 'opacity-50 grayscale' : ''}`} />
                </button>
            </div>
            <PrimaryBtn type="submit" className="bg-[#4186F4] w-full font-semibold text-xl" padding="py-3">Login</PrimaryBtn>
        </form>
    );
};

export default LoginForm;
