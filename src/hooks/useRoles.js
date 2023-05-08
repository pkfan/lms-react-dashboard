import { useSelector } from 'react-redux';

export function useRoles() {
  const rolesPermissions = useSelector((state) => state.authSlice.auth.rolesPermissions);
  console.log('==== useRoles ====', rolesPermissions);

  const hasRole = (role) => {
    return role in rolesPermissions;
  };

  return { hasRole };
}

export default useRoles;
