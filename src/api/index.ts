import request from '@/libs/request';
// import request from '@/libs/userRequest';

export const onLogin = (data) => request<any>({
  method: 'POST',
  url: '/admin/login',
  data
});

export const getUserInfo = () => request<any>({
  method: 'GET',
  url: '/admin/user/info',
});

export const Logout = () => request<any>({method: 'get', url: '/api/logout'});
