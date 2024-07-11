import axios from "../configs/axios";

const adminApi = {};

adminApi.fetchAllRider = () => axios.post("");
adminApi.fetchAllChatAdminInfo = () => axios.get("/admin/chat");

export default adminApi;
