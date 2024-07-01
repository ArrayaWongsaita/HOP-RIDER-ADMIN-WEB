import axios from '../configs/axios';

const authApi = {};

authApi.register = body => axios.post('/auth/rider', body);
authApi.login = body => axios.post('/auth/login/rider', body);
authApi.getCustomerUser = () => axios.get('');

export default authApi;