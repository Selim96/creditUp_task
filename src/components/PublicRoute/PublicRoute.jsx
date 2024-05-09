import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const PublicRoute = ({ children, restricted = false }) => {
  const isAuth = true
  return <>{isAuth && restricted ? <Navigate to="/home" /> : children}</>;
};

export default PublicRoute;
