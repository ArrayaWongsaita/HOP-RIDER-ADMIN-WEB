import axios from "../configs/axios";

const riderApi = {};

riderApi.verify = (body) => axios.patch("/rider/verify", body);
riderApi.checkRiderRoute = () => axios.get("rider/route");
riderApi.subscribe = (body) => axios.post("", body);

export default riderApi;
