// 어디에 접근해서 어떤 데이터를 가지고 와야 하는지 정의

import axios from 'axios';
import { baseUrl } from '../../apiurl';
import { boardReducers } from '../reducers/board_reducer';
//
function getBoardList(currentPage) {
  // 함수명 없이 바로 사용한다.
  // board_reducer에 있는 친구를 사용한다.
  return async (dispatch) => {
    ////경로를 써준다...백엔드를 요청하고 결과값을 받을때까지 기다린다.(await)
    const data = await axios
      .get(`${baseUrl}/board/list/${currentPage}`)
      .then((response) => response.data); // 넘겨주는 값을 받을 때는 무조건 response.data를 사용한다.
    // console.log(data);
    dispatch(boardReducers.getBoardList({ data }));
  };
}

function getBoardDetail(qnaKeynum) {
  return async (dispatch) => {
    //data 값을 reduce를 이용해서 store에 저장해야함
    const data = await axios
      .get(`${baseUrl}/board/view/${qnaKeynum}`)
      .then((response) => response.data); // backend에서 /board/view/ 이렇게 요청하도록 되어있어서 이렇게 주소를 써줌 -> 결과값을 받아옴 .then()
    console.log(data);
    dispatch(boardReducers.getBoardDetail({ data }));
  };
}

function getBoardDelete(qnaKeynum) {
  return async (dispatch) => {
    await axios
      .put(`${baseUrl}/board/delete/${qnaKeynum}`)
      .then((response) => response.data);
  };
}

function getBoardWrite(formData) {
  return async () => {
    await axios
      .post(`${baseUrl}/board/write`, formData)
      .then((response) => response.data);
  };
}

function getBoardUpdate(formData) {
  return async () => {
    await axios
      .put(`${baseUrl}/board/update`, formData)
      .then((response) => response.data);
  };
}

function getBoardRealDelete(qnaKeynum) {
  return async (dispatch) => {
    await axios
      .delete(`${baseUrl}/board/realDelete/${qnaKeynum}`)
      .then((response) => response.data);
  };
}
function getBoardSearch(currentPage2, searchWord, searchKey) {
  // 함수명 없이 바로 사용한다.
  // board_reducer에 있는 친구를 사용한다.
  return async (dispatch) => {
    ////경로를 써준다...백엔드를 요청하고 결과값을 받을때까지 기다린다.(await)
    const data = await axios
      .get(
        `${baseUrl}/board/searchlist/${currentPage2}?searchWord=${searchWord}&searchKey=${searchKey}`
      )
      .then((response) => response.data); // 넘겨주는 값을 받을 때는 무조건 response.data를 사용한다.
    console.log(data);
    dispatch(boardReducers.getBoardSearch({ data }));
  };
}

function getBoardAdminWrite(formData) {
  return async () => {
    await axios
      .post(`${baseUrl}/board/adminWrite`, formData)
      .then((response) => response.data);
  };
}
function getBoardAdminDetail(qnaKeynum) {
  return async (dispatch) => {
    //data 값을 reduce를 이용해서 store에 저장해야함
    const data = await axios
      .get(`${baseUrl}/board/adminview/${qnaKeynum}`)
      .then((response) => response.data); // backend에서 /board/view/ 이렇게 요청하도록 되어있어서 이렇게 주소를 써줌 -> 결과값을 받아옴 .then()
    console.log(data);
    dispatch(boardReducers.getBoardAdminDetail({ data }));
  };
}
function getBoardAdminDelete(qnaKeynum) {
  return async (dispatch) => {
    await axios
      .put(`${baseUrl}/board/adminDelete/${qnaKeynum}`)
      .then((response) => response.data);
  };
}

// 어디에 있는거를 호출하는지 이름으로 구분 가능하다. 어느 라이브러리에 있는 어느 함수인지
export const boardActions = {
  getBoardList,
  getBoardDetail,
  getBoardDelete,
  getBoardWrite,
  getBoardUpdate,
  getBoardRealDelete,
  getBoardSearch,
  getBoardAdminWrite,
  getBoardAdminDetail,
  getBoardAdminDelete,
}; // 여기에 등록을 해주어야 외부에서 접근할 수 있음

// 바로 호출할거면
// export const getBoardList; // 이런 식으로 쓰는듯
