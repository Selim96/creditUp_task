import React, {lazy, Suspense} from 'react';
import { Route, Routes } from "react-router-dom";
import Header from './components/Header';
import Loader from './components/Loader';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import PublicRoute from './components/PublicRoute/PublicRoute';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';

const Login = lazy(() => import('./pages/Login'));
const Register = lazy(()=>import('./pages/Register'));
const Home = lazy(()=>import('./pages/Home'));

function App() {
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
    </div>
  );
}

export default App;
