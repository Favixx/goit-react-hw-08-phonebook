import { selectIsAuth } from '../../redux/auth/authSelector';
import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';

export const PublicRoute = () => {
    const isAuth = useSelector(selectIsAuth);

    return isAuth ? <Navigate to={'/contacts'} /> : <Outlet />;
};