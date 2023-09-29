import { createSlice } from '@reduxjs/toolkit';

let initialState = {
  policyList: [],
  pv: { currentPage: 1 },
  policyDetail: {},
  policySearch: [],
  query: '',
  srchPolyBizSecd: '',
  policyDBDetail: {},
  policySearch2: [],
  policyDBSearch2: [],
  query2: '',
  srchPolyBizSecd2: '',
  pv2: { currentPage2: 1 },
  policyFile: null,
  pv3: { currentPage3: 1 },
};

//변수명
const policySlice = createSlice({
  //외부에서 사용할 수 있도록 밑에 Export함
  //createSlice를 이용해서 reduce를 설정할 것
  name: 'policy',
  initialState, //사용할 reduce 이름/initialState 이렇게 하면 초기값 설정됨

  reducers: {
    getPolicyList(state, action) {
      //state에 값을 넣고 이걸 store에 저장시킴
      //위에 initailState 안에 있는 요소들에 값 넣어줌
      // console.log(action);
      state.policyList = action.payload.data.aList; //넘겨준 값을 받아옴
      state.pv = action.payload.data.pv;
    },
    getPolicyDetail(state, action) {
      // console.log(action);
      state.policyDetail = action.payload.data;
    },
    getPolicySearch(state, action) {
      // console.log(action);
      state.policySearch = action.payload.data.aList;
      state.pv = action.payload.data.pv;
    },
    getPolicyDBList(state, action) {
      //state에 값을 넣고 이걸 store에 저장시킴
      //위에 initailState 안에 있는 요소들에 값 넣어줌
      // console.log(action);
      state.policyDBList = action.payload.data.aList; //넘겨준 값을 받아옴
      state.pv = action.payload.data.pv;
    },
    getPolicyDBSearch2(state, action) {
      console.log(action);
      state.policyDBSearch2 = action.payload.data.aList;
      state.pv3 = action.payload.data.pv;
    },
    getPolicyDBDetail(state, action) {
      // console.log('action', action);
      state.policyDBDetail = action.payload.data;
    },
    getPolicySearch2(state, action) {
      // console.log(action);
      state.policySearch2 = action.payload.data.aList;
      state.pv2 = action.payload.data.pv;
    },
    getPolicyDownload(state, action) {
      state.policyFile = action.payload.data;
    },
  },
});

//이걸을 이용해서 함수명 자동완성을 할 수 있다.
export const policyReducers = policySlice.actions; // boardReducers.getBoardList 이렇게 호출함
export default policySlice.reducer;
