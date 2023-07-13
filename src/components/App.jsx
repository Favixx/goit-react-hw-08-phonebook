import { useEffect } from 'react';

import { Routes, Route, Navigate } from 'react-router-dom';
import { Register } from '../pages/Register';
import { Login } from '../pages/Login';
import { Contacts } from '../pages/Contacts';
import { useDispatch, useSelector } from 'react-redux';
import { selectIsAuth } from '../redux/auth/authSelector';
import { PrivateRoute } from './Routes/PrivateRoute';
import { PublicRoute } from './Routes/PublicRoute';
import { refreshUser } from '../redux/auth/authOperations'
import { UserMenu } from './UserMenu/UserMenu';
import Navigation from './Navigation/Navigation';
import { ToastContainer } from 'react-toastify';


export const App = () => {
  const isAuth = useSelector(selectIsAuth)
  const dispatch = useDispatch();

  useEffect(() => {
    !isAuth && dispatch(refreshUser())
  }, [dispatch, isAuth])
  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable={false}
        pauseOnHover
        theme="colored"
      />
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