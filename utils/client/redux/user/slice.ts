import { User } from "@/pages/api/user/interface";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface UserSlice {
  user: {
    id: number;
    createdAt: string;
    updatedAt: string;
    name: string;
    username: string;
    password: string;
    admin: boolean;
    description: string;
    note: string;
  };
}

const initialState: UserSlice = {
  user: {
    id: 0,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    name: "",
    username: "",
    password: "",
    description: "",
    note: "",
    admin: false,
  },
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
  },
});

export const { setUser } = userSlice.actions;
