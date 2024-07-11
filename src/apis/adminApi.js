import axios from "../configs/axios";

const adminApi = {};

adminApi.fetchRiderApprove = () => axios.get('/admin/approval');
adminApi.fetchRiderPayment = () => axios.get('/admin/payment');
adminApi.approveRider = (body) => axios.patch('/admin/approval', body);
adminApi.approvePayment = (body) => axios.patch('/admin/payment', body);
adminApi.fetchAllChatAdminInfo = () => axios.get("/admin/chat");

export default adminApi;
