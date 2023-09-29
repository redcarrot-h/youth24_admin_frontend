import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { adminActions } from '../../reduxs/actions/admin_action';

const AdminView = () => {
  const { adminKeynum } = useParams();
  const dispatch = useDispatch();
  const Navigate = useNavigate();

  //멤버리스트 상세 가져오기
  const adminDetail = useSelector((state) => state.admin.adminDetail);

  //삭제 후 검색 리스트 페이지 번호 가져오기
  const pv = useSelector((state) => state.admin.pv);

  //삭제 기능
  const handleDelete = (e) => {
    e.preventDefault();
    dispatch(adminActions.getAdminDelete(adminKeynum));
    console.log('adminKeynum', adminKeynum);
    // navigator(`/board/list/${pv.currentPage}`);
    //안되면 window.location.replace 쓰기
    window.location.replace(`/admin/searchAdmin/${pv.currentPage}`);
    //navigator(`/member/searchlist/${pv.currentPage}`);
  };

  //렌더링 처리
  useEffect(() => {
    dispatch(adminActions.getAdminDetail(adminKeynum));
    console.log('view', adminKeynum);
    console.log('adminDetail', adminDetail);
  }, [dispatch, adminKeynum]);

  return (
    <>
      <table className='table table-stribed' style={{ marginTop: 20 }}>
        <tbody>
          <tr>
            <th width='20%'>관리자번호</th>
            <td colSpan='5'>{adminKeynum}</td>
          </tr>
          <tr>
            <th width='20%'>관리자아이디</th>
            <td colSpan='5'>{adminDetail.adminId}</td>
          </tr>
          <tr>
            <th width='20%'>이름</th>
            <td colSpan='5'>{adminDetail.adminName}</td>
          </tr>
          <tr>
            <th width='20%'>관리자상태</th>
            <td colSpan='5'>
              {adminDetail.adminStatus === 0 ? '활성화' : '탈퇴'}
            </td>
          </tr>
        </tbody>
      </table>

      <button className='btn btn-primary' onClick={handleDelete}>
        탈퇴
      </button>
      <button
        className='btn btn-outline-secondary'
        onClick={() => Navigate(-1)}
      >
        리스트
      </button>
    </>
  );
};

export default AdminView;
