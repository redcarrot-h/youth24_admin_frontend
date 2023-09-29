import { baseUrl } from '../../apiurl';
import axios from 'axios';
import { adminReducers } from '../reducers/admin_reducer';

//멤버 전체 리스트 검색하기
function getAdminSearch(currentPage, searchWord, searchKey2) {
  console.log('ㄱㄱ');
  return async (dispatch) => {
    const data = await axios
      .get(
        `${baseUrl}/admin/searchAdmin/${currentPage}?searchWord=${searchWord}&searchKey=${searchKey2}`
      )
      .then((response) => response.data);
    console.log(data);
    dispatch(adminReducers.getAdminSearch({ data }));
  };
}
//멤버 상세리스트 가져오기
function getMemberDetail(userKeynum) {
  return async (dispatch) => {
    const data = await axios
      .get(`${baseUrl}/admin/userview/${userKeynum}`)
      .then((response) => response.data); // backend에서 /board/view/ 이렇게 요청하도록 되어있어서 이렇게 주소를 써줌 -> 결과값을 받아옴 .then()
    dispatch(adminReducers.getMemberDetail({ data }));
  };
}

//멤버 탈퇴 처리
function getMemberDelete(userKeynum) {
  return async (dispatch) => {
    await axios
      .put(`${baseUrl}/userDelete/${userKeynum}`)
      .then((response) => response.data);
  };
}

//관리자 상세리스트 가져오기
function getAdminDetail(adminKeynum) {
  return async (dispatch) => {
    const data = await axios
      .get(`${baseUrl}/admin/adminview/${adminKeynum}`)
      .then((response) => response.data); // backend에서 /board/view/ 이렇게 요청하도록 되어있어서 이렇게 주소를 써줌 -> 결과값을 받아옴 .then()
    dispatch(adminReducers.getAdminDetail({ data }));
  };
}

//멤버 탈퇴 처리
function getAdminDelete(adminKeynum) {
  return async (dispatch) => {
    await axios
      .put(`${baseUrl}/adminDelete/${adminKeynum}`)
      .then((response) => response.data);
  };
}
export const adminActions = {
  getAdminSearch,
  getMemberDetail,
  getMemberDelete,
  getAdminDetail,
  getAdminDelete,
  // getUserList,
  //searchUserList,
};
