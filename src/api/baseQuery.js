// import { fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import axiosBaseQuery from './axios';
import config from '@/config';

// export default fetchBaseQuery({ baseUrl: config.baseUrl });
export default axiosBaseQuery({ baseUrl: config.baseUrl, csrfUrl: config.csrfUrl });
