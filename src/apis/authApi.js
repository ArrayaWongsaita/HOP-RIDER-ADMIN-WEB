import axios from '../configs/axios';

const authApi = {};

authApi.register = body => axios.post('', body);
authApi.login = body => axios.post('', body);
authApi.getCustomerUser = () => axios.get('');

export default authApi;