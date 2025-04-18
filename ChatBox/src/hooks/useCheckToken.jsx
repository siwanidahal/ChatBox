import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router";
const publicRoute = ["/", "/signup"]
const useCheckAuth = (ifLoginTo) => {
  const to = ifLoginTo || "/chat";
  const navigate = useNavigate();
  const location = useLocation()
  console.log(location)
  useEffect(() => {
    const HasToken = localStorage.getItem("token");
    if (!HasToken) {
        if(!publicRoute.includes(location.pathname)){
            navigate("/");
        }
    } else {
      navigate(to);
    }
  }, []);
  return true;
};
export default useCheckAuth;
