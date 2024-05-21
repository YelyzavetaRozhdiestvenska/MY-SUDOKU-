import { useDispatch } from 'react-redux';
import { useEffect, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Layout } from '../layout/SharedLayout';
import { PrivateRoute } from '../PrivateRoute';
import { RestrictedRoute } from '../RestrictedRoute';
import { refreshUser } from '../../redux/auth/operations';
import { useAuth } from '../../hooks/useAuth';

const Home = lazy(() => import('../../pages/home/Home'));
const Register = lazy(() => import('../../pages/register/Register'));
const Login = lazy(() => import('../../pages/login/Login'));
const Game = lazy(() => import('../../pages/game//Game'));

export const App = () => {
  const dispatch = useDispatch();
  // Cтан аутентифікації користувача:
  const { isRefreshing } = useAuth();

  // Функціz оновлення користувача:
  useEffect(() => {
    dispatch(refreshUser());
  }, [dispatch]);

  return isRefreshing ? (
    <p>Refreshing user...</p>
  ) : (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route
          path="/register"
          element={
            <RestrictedRoute redirectTo="/game" component={<Register />} />
          }
        />
        <Route
          path="/login"
          element={<RestrictedRoute redirectTo="/game" component={<Login />} />}
        />
        <Route
          path="/game"
          element={<PrivateRoute redirectTo="/login" component={<Game />} />}
        />
      </Route>
      <Route path="*" element={<Home />} />
    </Routes>
  );
};
