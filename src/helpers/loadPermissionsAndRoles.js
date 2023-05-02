// window.lmsRolesWithPermissions['admin']['approve course']
// 'admin' in window.lmsRolesWithPermissions // true
// 'approve course' in window.lmsRolesWithPermissions['admin'] //true

/****
 * window.lmsRolesWithPermissions is global object
 * set through (authSlice) method (getAuthUser) reducers
 */

export function hasRole(role) {
  return role in window.lmsRolesWithPermissions;
}

export function hasPermission(permission, role) {
  return permission in window.lmsRolesWithPermissions[role];
}
