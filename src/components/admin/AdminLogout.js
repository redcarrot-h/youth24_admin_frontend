import { useEffect } from "react";
// import { useNavigate } from "react-router-dom";

const Logout = () => {
  //const navigator = useNavigate();
  useEffect(() => {
    localStorage.removeItem("Authorization");
    localStorage.removeItem("adminName");
    localStorage.removeItem("isLogin");
    localStorage.clear();
    // navigator("/");
    window.location.replace("/");
  });
};

export default Logout;
