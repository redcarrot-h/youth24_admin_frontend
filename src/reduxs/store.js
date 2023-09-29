import { configureStore } from '@reduxjs/toolkit';
import boardReducers from './reducers/board_reducer';
import policyReducers from './reducers/policy_reducer';
import adminReducers from './reducers/admin_reducer';
import userReducers from './reducers/user_reducer';

const store = configureStore({
  reducer: {
    policy: policyReducers,
    board: boardReducers,
    admin: adminReducers,
    user: userReducers,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
  //기본 값이 true지만 배포할 때 코드를 숨기기 위해 false로 변환하기 쉽게 설정을 해놓는다.
});

export default store;
