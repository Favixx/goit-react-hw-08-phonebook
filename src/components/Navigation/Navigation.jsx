import { NavLink } from 'react-router-dom';

const Navigation = () => {
    return (
        <nav className="flex items-center py-4 gap-4">
            <NavLink
                to="/login"
                className="text-gray-600 hover:text-blue-500 px-4 py-2 text-sm font-medium"
            >
                Login
            </NavLink>
            <NavLink
                to="/register"
                className="text-gray-600 hover:text-blue-500 px-4 py-2 text-sm font-medium"
            >
                Register
            </NavLink>
        </nav>
    );
};

export default Navigation;
