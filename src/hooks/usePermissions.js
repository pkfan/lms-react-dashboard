import { useSelector } from 'react-redux';

export function usePermissions() {
  const rolesPermissions = useSelector((state) => state.authSlice.auth.rolesPermissions);
  console.log('==== usePermissions ====', rolesPermissions);

  const hasPermission = (permission, role) => {
    if (role == 'super admin') {
      return true;
    }

    return permission in rolesPermissions[role];
  };

  return { hasPermission };
}

export default usePermissions;
