import { selectUser } from '../../redux/auth/authSelector';
import { logoutThunk } from '../../redux/auth/authOperations';
import { useDispatch, useSelector } from 'react-redux';

export const UserMenu = () => {
    const dispatch = useDispatch();
    const handleLogout = () => {
        dispatch(logoutThunk());
    };

    const user = useSelector(selectUser);

    return (
        <div className="flex items-center justify-between">
            <p className="mr-2 text-gray-600 text-xl">{user?.email}</p>
            <button
                onClick={handleLogout}
                type="button"
                className="px-4 py-2 text-white bg-red-500 rounded hover:bg-red-600 focus:outline-none focus:ring focus:border-red-300"
            >
                Logout
            </button>
        </div>
    );
};

