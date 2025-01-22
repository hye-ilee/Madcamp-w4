// src/redux/slices/userSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface UserData {
  _id?: string;
  email: string;
  password: string;
  name: string;
  studentid: string;
  major: string;
  resume: string;
  interests: string[];
}

/**
 * Redux로 관리할 slice state 형식.
 * 로그인 여부 + 사용자 정보
 */
export interface UserState {
  isLoggedIn: boolean;
  userData: UserData | null;
}

const initialState: UserState = {
  isLoggedIn: false,
  userData: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    // 로그인 성공 시, 사용자 정보를 저장
    setUserData: (state, action: PayloadAction<UserData>) => {
      state.isLoggedIn = true;
      state.userData = action.payload;
    },
    // 로그아웃 처리
    clearUserData: (state) => {
      state.isLoggedIn = false;
      state.userData = null;
    },
  },
});

export const { setUserData, clearUserData } = userSlice.actions;

export default userSlice.reducer;