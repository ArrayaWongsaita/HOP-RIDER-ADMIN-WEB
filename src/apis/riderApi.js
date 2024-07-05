import axios from "../configs/axios";

const riderApi = {};

riderApi.verify = (body) => axios.post("", body);
riderApi.checkRiderRoute = () => axios.get("rider/route");

export default riderApi;
