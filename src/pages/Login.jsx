import { loginThunk } from '../redux/auth/authOperations';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

export const Login = () => {
    const [email, setEmaitl] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch();

    const handleChange = e => {
        const { name, value } = e.target;
        switch (name) {
            case 'email':
                setEmaitl(value);
                break;
            case 'password':
                setPassword(value);
                break;
            default:
                break;
        }
    };

    const handleSubmit = event => {
        event.preventDefault();
        dispatch(loginThunk({ email, password }));

        setEmaitl('');
        setPassword('');
    };

    return (
        <div className="max-w-sm mx-auto mt-8">
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                        Email
                    </label>
                    <input
                        id="email"
                        name="email"
                        type="email"
                        autoComplete="email"
                        required
                        value={email}
                        onChange={handleChange}
                        className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    />
                </div>

                <div>
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                        Password
                    </label>
                    <input
                        id="password"
                        name="password"
                        type="password"
                        autoComplete="current-password"
                        required
                        value={password}
                        onChange={handleChange}
                        className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    />
                </div>

                <div>
                    <button
                        type="submit"
                        className="w-full px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    >
                        Submit
                    </button>
                </div>
            </form>
        </div>
    );
};