import { Navigate } from "react-router-dom";
import { useAppSelector } from "../../redux/hooks";
import allSelectors from "../../redux/selectors";

const PublicRoute = ({ children, restricted = false }) => {
  const isAuth = useAppSelector(allSelectors.getLogged);
  return <>{isAuth && restricted ? <Navigate to="/" /> : children}</>;
};

export default PublicRoute;
