import axios from '../configs/axios';

const adminApi = {};

adminApi.fetchAllRider = () => axios.post('');
adminApi.approveRider = (id) => axios.patch('', id);
adminApi.denyRider = (id, data) => axios.patch('', id, data);
adminApi.approvePayment = (id) => axios.patch('', id);
adminApi.denyPayment = (id, data) => axios.patch('', id, data);

export default adminApi;