import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { adminActions } from '../../reduxs/actions/admin_action';

const MemberView = () => {
  const { userKeynum } = useParams();
  const dispatch = useDispatch();
  const Navigate = useNavigate();

  //멤버리스트 상세 가져오기
  const memberDetail = useSelector((state) => state.admin.memberDetail);

  //삭제 후 검색 리스트 페이지 번호 가져오기
  const pv = useSelector((state) => state.admin.pv);

  //삭제 기능
  const handleDelete = (e) => {
    e.preventDefault();
    dispatch(adminActions.getMemberDelete(userKeynum));
    // navigator(`/board/list/${pv.currentPage}`);
    //안되면 window.location.replace 쓰기
    window.location.replace(`/admin/searchUser/${pv.currentPage}`);
    //navigator(`/member/searchlist/${pv.currentPage}`);
  };

  //렌더링 처리
  useEffect(() => {
    dispatch(adminActions.getMemberDetail(userKeynum));
    console.log('view', userKeynum);
    console.log('memberDetail', memberDetail);
  }, [dispatch, userKeynum]);

  return (
    <>
      <table className='table table-stribed' style={{ marginTop: 20 }}>
        <tbody>
          <tr>
            <th width='20%'>회원번호</th>
            <td colSpan='5'>{userKeynum}</td>
          </tr>
          <tr>
            <th width='20%'>회원아이디</th>
            <td colSpan='5'>{memberDetail.userId}</td>
          </tr>
          <tr>
            <th width='20%'>이름</th>
            <td colSpan='5'>{memberDetail.userName}</td>
          </tr>
          <tr>
            <th width='20%'>생년월일</th>
            <td colSpan='5'>
              {memberDetail.userBirthdate === undefined
                ? ''
                : memberDetail.userBirthdate.substr(0, 10)}
            </td>
          </tr>
          <tr>
            <th width='20%'>성별</th>
            <td colSpan='5'>{memberDetail.userGender}</td>
          </tr>
          <tr>
            <th width='20%'>주소</th>
            <td colSpan='5'>{memberDetail.userAddress}</td>
          </tr>

          <tr>
            <th width='20%'>연락처</th>
            <td colSpan='5'>{memberDetail.userPhone}</td>
          </tr>

          <tr>
            <th width='20%'>학력</th>
            <td colSpan='5'>{memberDetail.userEducation}</td>
          </tr>
          <tr>
            <th width='20%'>취업상태</th>
            <td colSpan='5'>{memberDetail.userEmpstatus}</td>
          </tr>
          <tr>
            <th width='20%'>회원상태</th>
            <td colSpan='5'>{memberDetail.userStatus}</td>
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

export default MemberView;
