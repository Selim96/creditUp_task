import React, {lazy, Suspense, useEffect} from 'react';
import { Route, Routes } from "react-router-dom";
import Header from './components/Header';
import Loader from './components/Loader';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import PublicRoute from './components/PublicRoute/PublicRoute';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';
import { useAppDispatch, useAppSelector } from './redux/hooks';
import { EmailsApi } from './services/api';
import allSelectors from './redux/selectors';
import { Analytics } from '@vercel/analytics/react'

const Login = lazy(() => import('./pages/Login'));
const Register = lazy(()=>import('./pages/Register'));
const Home = lazy(()=>import('./pages/Home'));

const api = new EmailsApi()

function App() {
  const dispatch = useAppDispatch();
  const userData = useAppSelector(allSelectors.getUser)
  useEffect(() => {
    if(userData) {dispatch(api.refresh({username: userData.username, password: userData.password}));}
  }, [dispatch]);
  return (
    <div className="App">
      <Header />
      
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route
            path="/login"
            element={
              <PublicRoute restricted>
                <Login />
              </PublicRoute>
            }
          />
          <Route
            path="/signUp"
            element={
              <PublicRoute restricted>
                <Register />
              </PublicRoute>
            }
          />
          <Route
            path="*"
            element={
              <PrivateRoute>
                <Home />
              </PrivateRoute>
            }
          />
        </Routes>
      </Suspense>
      <ToastContainer/>
      <Analytics/>
    </div>
  );
}

export default App;
