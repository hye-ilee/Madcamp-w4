// src/redux/slices/userSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface StudentData {
    userid: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    name: { type: String, required: true },
    studentid: { type: String, required: true },
    major: { type: String, required: true },
    resume: { type: String, required: true },
    interests: { type: [String], required: true }
} 

interface LabData {
    userid: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    major: { type: String, enum: ['CS', 'ID'], required: true },
    name: { type: String, required: true }  
}

interface UserState {
  accountType: "student" | "lab" | null;
  data: StudentData | LabData | undefined;
}

const initialState: UserState = {
  accountType: null,
  data: undefined,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setStudentData: (state, action: PayloadAction<StudentData>) => {
        state.accountType = "student";
        state.data = action.payload;
    },
    setLabData: (state, action: PayloadAction<LabData>) => {
        state.accountType = "lab";
        state.data = action.payload;
    },
    clearData: (state) => {
        state.accountType = null;
        state.data = undefined;
    },
  },
});

export const { setStudentData, setLabData, clearData } = userSlice.actions;

export default userSlice.reducer;

  