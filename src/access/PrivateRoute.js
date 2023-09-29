import { Navigate, useLocation } from "react-router-dom";

const PrivateRoute = ({ isAuth, RouteComponent }) => {
  const location = useLocation();
  //localStorage.clear();
  const isLogin = localStorage.getItem("isLogin");
  console.log(isAuth, isLogin);
  // 인증이 반드시 필요한 페이지이고 인증이 된 페이지
  if (isAuth && isLogin) {
    return <RouteComponent />;
  }

  // 인증이 반드시 필요한 페이지이고 인증이 안 된 페이지
  else if (isAuth && !isLogin) {
    return <Navigate to="/admin/searchUser/1" />;
  }

  // 인증된 상태의 로그인 회원가입페이지 진입
  else if (
    (location.pathname.startsWith("/") ||
      location.pathname === "/" ||
      location.pathname.startsWith("/")) &&
    isLogin
  ) {
    return <Navigate to="/" />;
  }

  //인증이 필요하지 않은 페이지
  else {
    return <RouteComponent />;
  }

  // return <Navigate to='/' />;
};

export default PrivateRoute;
