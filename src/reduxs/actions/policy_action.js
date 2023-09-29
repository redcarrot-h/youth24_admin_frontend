// 어디에 접근해서 어떤 데이터를 가지고 와야 하는지 정의

import axios from 'axios';
import { baseUrl } from '../../apiurl';
import { policyReducers } from '../reducers/policy_reducer';

function getPolicyList(currentPage) {
  // 함수명 없이 바로 사용한다.
  // board_reducer에 있는 친구를 사용한다.
  return async (dispatch) => {
    ////경로를 써준다...백엔드를 요청하고 결과값을 받을때까지 기다린다.(await)
    const data = await axios
      .get(`${baseUrl}/policy/list/${currentPage}`)
      .then((response) => response.data); // 넘겨주는 값을 받을 때는 무조건 response.data를 사용한다.
    console.log(data);
    dispatch(policyReducers.getPolicyList({ data }));
  };
}

function getPolicyDetail(policyId) {
  return async (dispatch) => {
    //data 값을 reduce를 이용해서 store에 저장해야함
    const data = await axios
      .get(`${baseUrl}/policy/view/${policyId}`)
      .then((response) => response.data); // backend에서 /board/view/ 이렇게 요청하도록 되어있어서 이렇게 주소를 써줌 -> 결과값을 받아옴 .then()
    dispatch(policyReducers.getPolicyDetail({ data }));
  };
}

function getPolicySearch(currentPage, query, srchPolyBizSecd) {
  // 함수명 없이 바로 사용한다.
  // board_reducer에 있는 친구를 사용한다.
  return async (dispatch) => {
    ////경로를 써준다...백엔드를 요청하고 결과값을 받을때까지 기다린다.(await)
    const data = await axios
      .get(
        `${baseUrl}/policy/search/${currentPage}?query=${query}&srchPolyBizSecd=${srchPolyBizSecd}`
      )
      .then((response) => response.data); // 넘겨주는 값을 받을 때는 무조건 response.data를 사용한다.
    // console.log(data);
    dispatch(policyReducers.getPolicySearch({ data }));
  };
}

function getPolicyDBList(currentPage) {
  // 함수명 없이 바로 사용한다.
  // board_reducer에 있는 친구를 사용한다.
  return async (dispatch) => {
    ////경로를 써준다...백엔드를 요청하고 결과값을 받을때까지 기다린다.(await)
    const data = await axios
      .get(`${baseUrl}/policyDB/list/${currentPage}`)
      .then((response) => response.data); // 넘겨주는 값을 받을 때는 무조건 response.data를 사용한다.
    // console.log(data);
    dispatch(policyReducers.getPolicyDBList({ data }));
  };
}

function getPolicyDBSearch2(currentPage3, searchWord, searchKey) {
  // 함수명 없이 바로 사용한다.
  // board_reducer에 있는 친구를 사용한다.
  return async (dispatch) => {
    ////경로를 써준다...백엔드를 요청하고 결과값을 받을때까지 기다린다.(await)
    const data = await axios
      .get(
        `${baseUrl}/policyDB/searchlist/${currentPage3}?searchWord=${searchWord}&searchKey=${searchKey}`
      )
      .then((response) => response.data); // 넘겨주는 값을 받을 때는 무조건 response.data를 사용한다.
    console.log(data);
    dispatch(policyReducers.getPolicyDBSearch2({ data }));
  };
}

function getPolicySearch2(currentPage2, query2, srchPolyBizSecd2) {
  // 함수명 없이 바로 사용한다.
  // board_reducer에 있는 친구를 사용한다.
  return async (dispatch) => {
    ////경로를 써준다...백엔드를 요청하고 결과값을 받을때까지 기다린다.(await)
    const data = await axios
      .get(
        `${baseUrl}/policy/search2/${currentPage2}?query=${query2}&srchPolyBizSecd=${srchPolyBizSecd2}`
      )
      .then((response) => response.data); // 넘겨주는 값을 받을 때는 무조건 response.data를 사용한다.
    // console.log(data);
    dispatch(policyReducers.getPolicySearch2({ data }));
  };
}

function getPolicyDBDetail(policyKeynum) {
  return async (dispatch) => {
    //data 값을 reduce를 이용해서 store에 저장해야함
    const data = await axios
      .get(`${baseUrl}/policyDB/view/${policyKeynum}`)
      .then((response) => response.data); // backend에서 /board/view/ 이렇게 요청하도록 되어있어서 이렇게 주소를 써줌 -> 결과값을 받아옴 .then()
    dispatch(policyReducers.getPolicyDBDetail({ data }));
  };
}
//backend에서 결과값을 받아야하니 변수를 선언해주어야함
function getPolicyDownload(policyImages) {
  return async (dispatch) => {
    const data = await axios
      .get(`${baseUrl}/policyDB/download/${policyImages}`, {
        responseType: 'blob', // backend에서 stream을 통해서 받도록 "application/octet-stream" 이렇게 해두어서 이렇게 받아줘야함
      })
      .then((response) => response.data); // data에 담아서 넘겨줌
    // data 값을 reduce에 저장시켜줘야함 -> store에 저장하기 위해서
    //dispatch(boardActions.getBoardDownload(data)); // 이렇게 넘겨줘도 가능
    return data; // store에 저장안하고 일회성으로 할 거면 이렇게 하고 board_view.js에서만 사용하게끔 할 수 있음
  };
}

function getPolicyDelete(policyKeynum) {
  return async (dispatch) => {
    await axios
      .delete(`${baseUrl}/policyDB/delete/${policyKeynum}`)
      .then((response) => response.data);
  };
}

function getPolicyDBUpdate(formData) {
  return async () => {
    await axios
      .put(`${baseUrl}/policyDB/update`, formData)
      .then((response) => response.data);
  };
}

function getPolicyFileDelete(policyKeynum) {
  return async (dispatch) => {
    await axios
      .put(`${baseUrl}/policyDB/fileDelete/${policyKeynum}`)
      .then((response) => response.data);
  };
}

// 어디에 있는거를 호출하는지 이름으로 구분 가능하다. 어느 라이브러리에 있는 어느 함수인지
export const policyActions = {
  getPolicyList,
  getPolicyDetail,
  getPolicySearch,
  getPolicyDBList,
  getPolicySearch2,
  getPolicyDBDetail,
  getPolicyDownload,
  getPolicyDelete,
  getPolicyDBUpdate,
  getPolicyFileDelete,
  getPolicyDBSearch2,
}; // 여기에 등록을 해주어야 외부에서 접근할 수 있음

// 바로 호출할거면
// export const getBoardList; // 이런 식으로 쓰는듯
