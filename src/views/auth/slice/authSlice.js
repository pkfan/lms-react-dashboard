import { createSlice, current } from '@reduxjs/toolkit';
import { globalStyles } from './../../../styles/globalStyles';

const initialState = {
  auth: { user: {}, isPasswordConfirm: false, rolesPermissions: {} },
};

export const authSlice = createSlice({
  name: 'authSlice',
  initialState,
  reducers: {
    setAuthUser: (state, action) => {
      /************
       * good idea to set roles and permission on window globalStyles
       * so that we do not have to use auth user slice again and again
       * */
      let lmsRolesWithPermissions = {};

      action.payload.roles.forEach((role) => {
        let permissions = {};
        role.permissions.forEach((permission) => {
          permissions[permission.name] = permission.id;
        });

        // {'role name': {'permission name': id}}
        lmsRolesWithPermissions[role.name] = permissions;
      });

      // state.value += action.payload;
      state.auth.user = action.payload;
      state.auth.rolesPermissions = lmsRolesWithPermissions;
      console.log(' state.auth.user; state', current(state));
      console.log(' state.auth.user; action', action);
    },
    setIsPasswordConfirm: (state, action) => {
      state.auth.isPasswordConfirm = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setAuthUser, setIsPasswordConfirm } = authSlice.actions;

export default authSlice.reducer;
