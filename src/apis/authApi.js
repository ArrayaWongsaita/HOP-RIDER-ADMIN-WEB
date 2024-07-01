import axios from '../configs/axios';

const authApi = {};

authApi.register = body => axios.post('/auth/register/rider', body);
authApi.login = body => axios.post('/auth/login/riderOrAdmin', body);
authApi.getAuthUser = () => axios.get('/auth/me');

export default authApi;