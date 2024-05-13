import { Navigate } from "react-router-dom";
import { useAppSelector } from "../../redux/hooks";
import allSelectors from "../../redux/selectors";

const PrivateRoute = ({ children }) => {
  const isAuth = useAppSelector(allSelectors.getLogged);
  // const isAuth = true
  return isAuth ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
