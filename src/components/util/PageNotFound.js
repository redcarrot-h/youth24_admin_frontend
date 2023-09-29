import { NavLink } from "react-router-dom";

const PageNotFound = () => {
  return (
    <div>
      <h1>
        죄송합니다. 요청하신 페이지를 찾을 수 없습니다.
        <br />
        <br />
        방문하시려는 페이지의 주소가 잘못 입력되었거나,페이지의 주소가 변경 혹은
        삭제되어 요청하신 페이지를 찾을 수 없습니다.
        <br />
        입력하신 주소가 정확한지 다시 한 번 확인해주시기 바랍니다.
      </h1>
      <br />
      <br />

      <NavLink to="/">관리자현황 바로가기</NavLink>
    </div>
  );
};

export default PageNotFound;
