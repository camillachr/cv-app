import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthUser {
  id: string;
  name: string;
  username: string;
  role: string;
}

interface AuthState {
  user: AuthUser | null;
  isAuthenticated: boolean;
}

const loadAuthState = (): AuthState => {
  try {
    const lastAuthState = localStorage.getItem("auth");
    if (lastAuthState === null) return { user: null, isAuthenticated: false };
    return JSON.parse(lastAuthState);
  } catch (e) {
    console.error("Could not load auth state:", e);
    return { user: null, isAuthenticated: false };
  }
};

const saveAuthState = (state: AuthState) => {
  try {
    const lastAuthState = JSON.stringify(state);
    localStorage.setItem("auth", lastAuthState);
  } catch (e) {
    console.error("Could not save auth state:", e);
  }
};

const initialState: AuthState = loadAuthState();

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action: PayloadAction<AuthUser>) => {
      state.user = action.payload;
      state.isAuthenticated = true;
      saveAuthState(state);
    },
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      saveAuthState(state);
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
