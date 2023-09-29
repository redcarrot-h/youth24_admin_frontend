import { NavLink, Outlet } from 'react-router-dom';
import AdminLogout from '../admin/AdminLogout';

function BaseLayout() {
  const activeStyle = ({ isActive }) => ({
    color: isActive ? 'green' : '',
    fontSize: isActive ? '1.2rem' : '',
  });

  return (
    <div>
      <nav className='navbar navbar-expand-lg navbar-light bg-light'>
        <div className='container-fluid'>
          <ul className='navbar-nav mr-auto'>
            <li className='nav-item'>
              <NavLink
                className='nav-link text-warning'
                to='/'
                element={<AdminLogout />}
              >
                로그아웃
              </NavLink>
            </li>

            <li className='nav-item'>
              <NavLink className='nav-link' to='admin/searchUser/1'>
                회원관리
              </NavLink>
            </li>
            <li className='nav-item'>
              <NavLink className='nav-link' to='admin/searchAdmin/1'>
                관리자현황
              </NavLink>
            </li>

            <li className='nav-item'>
              <NavLink
                style={activeStyle}
                className='nav-link'
                to='/policy/search2/1'
              >
                정책등록
              </NavLink>
            </li>
            <li className='nav-item'>
              <NavLink
                style={activeStyle}
                className='nav-link'
                to='/policyDB/list/1'
              >
                정책리스트
              </NavLink>
            </li>
            <li className='nav-item'>
              <NavLink
                style={activeStyle}
                className='nav-link'
                to='/board/list/1'
              >
                문의게시판
              </NavLink>
            </li>
          </ul>
        </div>
      </nav>

      <hr />
      <Outlet />
    </div>
  );
}

export default BaseLayout;
