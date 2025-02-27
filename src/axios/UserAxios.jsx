import axios from "axios";
import Cookies from 'js-cookie'
import { store } from "../redux/Store";
// import { decryptToken, isTokenExpired, refreshAccessToken, } from '../utils/TokenUtils'
// import { toast } from "sonner";
// import { handleLogout } from "../utils/TokenUtils";
// import { env } from "@/utils/env";
// import { getConfig } from './config';
// let { VITE_gateway_svc } = getConfig();

const env = import.meta.env;
const baseUrl = env.VITE_baseURL

const userAxiosInstance = axios.create({
  baseURL: baseUrl,
  withCredentials: true,
});

userAxiosInstance.interceptors.request.use(
  config => {
    const state = store.getState()
    const tokenFromState = state.token

    const csrfToken = Cookies.get('csrftoken');
    console.log('accessToken before sending request: ', tokenFromState)
    console.log('CSRF token before sending request: ', csrfToken)

    if (tokenFromState) {
      config.headers['Authorization'] = `Token ${tokenFromState}`;
    }
    else {
      console.warn('CSRF token missing!')
    }

    if (csrfToken) {
      config.headers['X-CSRFToken'] = csrfToken
    } else {
      console.warn('CSRF token missing!')
    }

    return config;
  }, error => {
    return Promise.reject(error);
  }
);


// userAxiosInstance.interceptors.response.use(
//   response => response,
//   async (error) => {
//     const originalRequest = error.config;
//     console.log(error)

    
//     if (error.response && error.response.status === 401 && !originalRequest._retry) {
//       originalRequest._retry = true;

//       // Call refresh token endpoint

//       const state = store.getState()
//       const { accessToken, refreshToken } = state;
//       const decryptedAccessToken = decryptToken(accessToken)
//       const decryptedRefreshToken = decryptToken(refreshToken)

//       console.log('setting tokens for refresh:', decryptedAccessToken, decryptedRefreshToken)

//       if (decryptedAccessToken && isTokenExpired(decryptedAccessToken)) {
//         console.log('Access token is expired. Attempting to refresh it.');

//         try {
//           const newAccessToken = await refreshAccessToken(decryptedRefreshToken);

//           if (newAccessToken) {
//             console.log('Access token refreshed successfully. Retrying the original request.');
//             originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;

//             return userAxiosInstance(originalRequest);
//           }
//           else {
//             console.error('Failed to refresh access token. Logging out.');
//             console.error('token refresh failed')
//             // await handleLogout();
//             return Promise.reject(error);
//           }
//         } catch (refreshError) {
//           console.error('Error during token refresh:', refreshError);
//           console.error('token refresh failed')
//           // await handleLogout();
//           return Promise.reject(refreshError);
//         }

//       }
//       else {
//         console.warn('No access token found or token is not valid. Logging out.');
//         console.error('token refresh failed')
//         // await handleLogout();
//         return Promise.reject(error);
//       }

//     }
//     return Promise.reject(error);
//   }
// );

export default userAxiosInstance