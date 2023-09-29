import { createSlice } from '@reduxjs/toolkit';

let initialState = {
  memberList: [],
  pv: { currentPage: 1 },
  memberSearch: [],
  searchWord: '',
  seachKey: '',
};

const memberSlice = createSlice({
  name: 'user',
  initialState,

  reducers: {
    //멤버 검색하기
    getMemberSearch(state, action) {
      console.log(action);
      state.memberSearch = action.payload.data.aList;
      state.pv = action.payload.data.pv;
    },
  },
});

//export const memberReducers = memberSlice.actions;
// export const memberActions = memberSlice.actions; // 수정된 부분
// export const memberReducers = memberSlice.reducer;

export const userReducers = memberSlice.actions;
export default memberSlice.reducer;
