import axios, {AxiosRequestConfig, AxiosResponse} from "axios";
import storage from 'store';

const {VITE_APP_BASE_URL} = import.meta.env;

const request = axios.create({
  // API 请求的默认前缀
  baseURL: VITE_APP_BASE_URL,
  timeout: 10000, // 请求超时时间
});
// 添加请求拦截器
axios.interceptors.request.use(function (config: AxiosRequestConfig) {
  // 在发送请求之前做些什么
  if (storage.get('ACCESS_TOKEN')) config.headers.Authorization = `bearer ${storage.get('ACCESS_TOKEN')}`;
  return config;
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error);
});

// 添加响应拦截器
axios.interceptors.response.use(function (response: AxiosResponse) {
  // 2xx 范围内的状态码都会触发该函数。
  // 对响应数据做点什么
  return response;
}, function (error) {
  // 超出 2xx 范围的状态码都会触发该函数。
  // 对响应错误做点什么
  return Promise.reject(error);
});

export default request
