import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';

import { jobsApi } from '@/views/jobs/api';
import { authApi } from '@/views/auth/api';
import { textEditorApi } from '@/views/tip-tap-editor/api';
import { adminApi } from '@/views/roles/admin/api';
import { instructorApi } from '@/views/roles/instructor/api';
import { baseApi } from '@/api/base';
import jobsReducer from '@/views/jobs/jobsSlice';

export const store = configureStore({
  reducer: {
    jobs: jobsReducer,
    // Add the generated reducer as a specific top-level slice
    [baseApi.reducerPath]: baseApi.reducer,
    [jobsApi.reducerPath]: jobsApi.reducer,
    [authApi.reducerPath]: authApi.reducer,
    [textEditorApi.reducerPath]: textEditorApi.reducer,
    [adminApi.reducerPath]: adminApi.reducer,
    [instructorApi.reducerPath]: instructorApi.reducer,
  },
  // Adding the api middleware enables caching, invalidation, polling,
  // and other useful features of `rtk-query`.
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      baseApi.middleware,
      jobsApi.middleware,
      authApi.middleware,
      textEditorApi.middleware,
      adminApi.middleware,
      instructorApi.middleware,
    ),
});

// optional, but required for refetchOnFocus/refetchOnReconnect behaviors
// see `setupListeners` docs - takes an optional callback as the 2nd arg for customization
setupListeners(store.dispatch);
