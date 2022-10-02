import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../store";

// Next.js runs server side, so access localStorage
// only if window is defined (when code runs client-side)
/*
const getLocalToken = (): string | null => {
  if (typeof window !== undefined) {
    return window.localStorage.getItem("libercord-token");
  } else return null;
};
const setLocalToken = (value: string): void => {
  if (typeof window !== undefined) {
    window.localStorage.setItem("libercord-token", value);
  }
};
const removeLocalToken = (): void => {
  if (typeof window !== undefined) {
    window.localStorage.removeItem("libercord-token");
  }
};
*/
/*
the sense im getting is that i need to set the token within a component
in order to use the window!==undefined to check for client side

its because redux is isolated from next
so it always runs server side

*/

interface UserState {
  loading: boolean;
  token: string | null;
}

const initialState: UserState = {
  loading: false,
  token: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
    },
    clearToken: (state) => {
      state.token = null;
    },
  },
});

export const { setLoading, setToken, clearToken } = userSlice.actions;
export const selectUser = (state: RootState) => state.user;
export default userSlice.reducer;
