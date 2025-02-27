import axios from "axios";
import Cookies from 'js-cookie'
import { store } from "../redux/Store";

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

export default userAxiosInstance