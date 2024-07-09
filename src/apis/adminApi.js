import axios from '../configs/axios';

const adminApi = {};

// adminApi.fetchAllRider = () => axios.get('');
adminApi.fetchRiderApprove = () => axios.get('/admin/approval');
adminApi.fetchRiderPayment = () => axios.get('/admin/payment');
adminApi.approveRider = (body) => axios.patch('/admin/approval', body);
// adminApi.denyRider = (id, data) => axios.patch('', id, data);
adminApi.approvePayment = (body) => axios.patch('/admin/payment', body);
// adminApi.denyPayment = (id, data) => axios.patch('', id, data);

export default adminApi;