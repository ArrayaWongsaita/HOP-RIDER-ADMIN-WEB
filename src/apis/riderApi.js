import axios from '../configs/axios';

const riderApi = {};

riderApi.verify = body => axios.post('', body);

export default riderApi;