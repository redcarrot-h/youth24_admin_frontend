import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Route, Routes } from 'react-router-dom';
import BaseLayout from './components/layout/BaseLayout';
import PolicySearch2 from './components/policy/policy_search2';
import PolicyViewUP from './components/policy/policy_viewUP';
import PolicyDBList from './components/policy/policyDB_list';
import PolicyViewDB from './components/policy/policy_viewDB';
import BoardList from './components/board/board_list';
import BoardView from './components/board/board_view';
import BoardWrite from './components/board/board_write';
import BoardUpdate from './components/board/board_update';
import PrivateRoute from './access/PrivateRoute';
import AdminHome from './components/admin/AdminHome';
import Logout from './components/admin/AdminLogout';
import AdminUserList from './components/admin/AdminUserList';
import AdminAdmin from './components/admin/AdminAdmin';
import MemberView from './components/admin/member_view';
import AdminView from './components/admin/admin_view';

function App() {
  return (
    <div className='container'>
      <h3>Admin :: 청년24</h3>
      <Routes>
        <Route path='/' element={<BaseLayout />}>
          {/* 비로그인 시 메인 : 로그인&회원가입 */}
          <Route index element={<AdminHome />} />
          {/* 로그아웃 */}
          <Route
            path='logout'
            element={<PrivateRoute isAuth={true} RouteComponent={Logout} />}
          />
          {/* 로그인 시 메인 : 회원관리 */}
          <Route
            path='admin/searchUser/:currentPage'
            element={
              <PrivateRoute isAuth={true} RouteComponent={AdminUserList} />
            }
          />
          {/* user 상세보기 */}
          <Route path='admin/userview/:userKeynum' element={<MemberView />} />
          {/* 관리자 현황 */}
          <Route
            path='admin/searchAdmin/:currentPage'
            element={<PrivateRoute isAuth={true} RouteComponent={AdminAdmin} />}
          />
          {/* 관리자 상세보기 */}
          <Route path='admin/adminview/:adminKeynum' element={<AdminView />} />
          <Route
            path='policy/search2/:currentPage2'
            element={<PolicySearch2 />}
          />
          <Route path='policy/viewUP/:policyId' element={<PolicyViewUP />} />
          <Route path='policyDB/list/:currentPage' element={<PolicyDBList />} />
          <Route
            path='policyDB/view/:policyKeynum'
            element={<PolicyViewDB />}
          />
          <Route
            path='policyDB/searchlist/:currentPage'
            element={<PolicyDBList />}
          />
          <Route path='board/list/:currentPage' element={<BoardList />} />
          <Route path='board/view/:qnaKeynum' element={<BoardView />} />
          <Route path='board/write' element={<BoardWrite />} />
          <Route path='board/write/:qnaKeynum' element={<BoardWrite />} />
          <Route path='board/update/:qnaKeynum' element={<BoardUpdate />} />/
        </Route>
      </Routes>
    </div>
  );
}

export default App;
