import axios from 'axios'

axios.defaults.baseURL = 'http://192.168.0.110:3000'
// axios.defaults.baseURL = 'http://134.175.223.115:3000'

axios.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    // console.log(config)
    config.params = {
        ...config.params,
    }
    return config;
}, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
});

export default axios
