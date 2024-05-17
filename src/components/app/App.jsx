import { Routes, Route } from 'react-router-dom';
import { lazy } from 'react';
import { SharedLayout } from 'components/layout/SharedLayout';
// import css from './App.module.css';

const Home = lazy(() => import('../../pages/home/Home'));
const Register = lazy(() => import('../../pages/register/Register'));
const Login = lazy(() => import('../../pages/login/Login'));
const Game = lazy(() => import('../../pages/game//Game'));

export const App = () => {
  return (
    <Routes>
      <Route path="/" element={<SharedLayout />}>
        <Route index element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/game" element={<Game />} />
      </Route>
    </Routes>
  );
};
