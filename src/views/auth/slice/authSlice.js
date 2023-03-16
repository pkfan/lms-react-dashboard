import { createSlice, current } from '@reduxjs/toolkit';

const initialState = {
  auth: { user: {} },
};

export const authSlice = createSlice({
  name: 'authSlice',
  initialState,
  reducers: {
    setAuthUser: (state, action) => {
      // state.value += action.payload;
      state.auth.user = action.payload;
      console.log(' state.auth.user; state', current(state));
      console.log(' state.auth.user; action', action);
    },
  },
});

// Action creators are generated for each case reducer function
export const { setAuthUser } = authSlice.actions;

export default authSlice.reducer;
