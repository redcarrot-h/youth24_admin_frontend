import { baseUrl } from '../../apiurl';
import axios from 'axios';
import { userReducers } from '../reducers/user_reducer';

//멤버 전체 리스트 검색하기
function getMemberSearch(currentPage, searchWord, searchKey) {
  console.log('ㄱㄱ');
  return async (dispatch) => {
    const data = await axios
      .get(
        `${baseUrl}/admin/searchUser/${currentPage}?searchWord=${searchWord}&searchKey=${searchKey}`
      )
      .then((response) => response.data);
    console.log(data);
    dispatch(userReducers.getMemberSearch({ data }));
  };
}

export const userActions = {
  getMemberSearch,
  // getUserList,
  //searchUserList,
};
