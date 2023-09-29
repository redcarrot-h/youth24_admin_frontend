import { createSlice } from '@reduxjs/toolkit';

let initialState = {
  adminList: [],
  pv: { currentPage: 1 },
  adminSearch: [],
  searchWord: '',
  seachKey2: '',
  memberDetail: {},
  adminDetail: {},
};

const adminSlice = createSlice({
  name: 'admin',
  initialState,

  reducers: {
    //멤버 검색하기
    getAdminSearch(state, action) {
      console.log(action);
      state.adminSearch = action.payload.data.aList;
      state.pv = action.payload.data.pv;
    },
    getMemberDetail(state, action) {
      console.log('action', action);
      state.memberDetail = action.payload.data;
    },
    getAdminDetail(state, action) {
      console.log('action', action);
      state.adminDetail = action.payload.data;
    },
  },
});

//export const memberReducers = memberSlice.actions;
// export const memberActions = memberSlice.actions; // 수정된 부분
// export const memberReducers = memberSlice.reducer;

export const adminReducers = adminSlice.actions;
export default adminSlice.reducer;
