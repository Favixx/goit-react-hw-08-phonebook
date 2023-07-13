import { useEffect } from 'react';

import { Routes, Route, Navigate } from 'react-router-dom';
import { Register } from '../pages/Register';
import { Login } from '../pages/Login';
import { Contacts } from '../pages/Contacts';
import { useDispatch, useSelector } from 'react-redux';
import { selectIsAuth } from '../redux/auth/authSelector';
import { PrivateRoute } from './Routes/PrivateRoute';
import { PublicRoute } from './Routes/PublicRoute';
import { getUserThunk } from '../redux/auth/authOperations'
import { UserMenu } from './UserMenu/UserMenu';
import Navigation from './Navigation/Navigation';
import { setToken } from 'redux/auth/authSlice';


export const App = () => {
  const isAuth = useSelector(selectIsAuth)
  const dispatch = useDispatch();
  const token = localStorage.getItem('token');
  if (token) {
    dispatch(setToken(token));
  }
  useEffect(() => {
    !isAuth && dispatch(getUserThunk())
  }, [dispatch, isAuth])
  return (
    <>
      {isAuth ? (<UserMenu />) : (
        <Navigation />
      )}
      <Routes>
        <Route path="/" element={<PrivateRoute />}>
          <Route index element={<Navigate to="/contacts" />} />
          <Route path="/contacts" element={<Contacts />} />
        </Route>
        <Route path="/" element={<PublicRoute />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>
      </Routes>
    </>
  );
};