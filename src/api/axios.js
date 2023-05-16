import axios from 'axios';
import {
  // ReasonPhrases,
  StatusCodes,
  // getReasonPhrase,
  // getStatusCode,
} from 'http-status-codes';
import { redirectTo } from '@/helpers';
// import set_csrf_token_in_cookie from './set_csrf_token_in_cookie';

// async function loginTest() {
//   try {
//     // await set_csrf_token_in_cookie();
//     const result = await axios({
//       url: 'http://127.0.0.1:8000/api/login',
//       method: "POST",
//       data:,
//       params,
//       withCredentials: true,
//     });
//     return { data: result.data };
//   } catch (axiosError) {
//     let err = axiosError;
//     return {
//       error: {
//         status: err.response?.status,
//         data: err.response?.data || err.message,
//       },
//     };
//   }
// }

const axiosBaseQuery =
  ({ baseUrl } = { baseUrl: '' }) =>
  async ({ url, method, data, params }) => {
    try {
      if (method && method.toLowerCase().trim() != 'get') {
        await axios.get(`${baseUrl}/csrf-cookie`);
      }
      const result = await axios({
        url: baseUrl + url,
        method,
        data,
        params,
        withCredentials: true,
      });
      return { data: result.data };
    } catch (axiosError) {
      let err = axiosError;

      console.log('axios err ========== : ', err);

      if (err.response?.status == StatusCodes.UNAUTHORIZED) {
        redirectTo('/lms/login');
      }

      return {
        error: {
          status: err.response?.status,
          data: err.response?.data || err.message,
        },
      };
    }
  };

export { axiosBaseQuery };
export default axiosBaseQuery;
