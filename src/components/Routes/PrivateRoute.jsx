import { selectIsAuth } from '../../redux/auth/authSelector';
import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';

export const PrivateRoute = () => {
    const isAuth = useSelector(selectIsAuth);

    return isAuth ? <Outlet /> : <Navigate to={'/login'} />;
};