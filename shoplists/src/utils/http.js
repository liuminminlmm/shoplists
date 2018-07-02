import Vue from 'vue';
import axios from 'axios';
// console.log(process.env.NODE_ENV); 
//测试服务器
// const testUrl = 'http://localhost:3000';
//在手机上测试的服务端
 const testUrl = 'http://169.254.66.6:3000';
//线上服务器
const onlineUrl = 'http:m.jd.com';
// if(false){

// }

let httpInstance = axios.create({
    // headers: {
    //     "Accept-Content":'application',
    //     //后台写的Access-Control-Allow-Headers数据中的一个变量
    //     "Content-Type": "application/json",
    //     "Authorization": "123"
    // },
    baseURL: process.env.NODE_ENV === 'development' ? testUrl : onlineUrl
})

httpInstance.interceptors.request.use((config) => {
    return config;
}, (err) => {
    return Promise.reject(err);
})

httpInstance.interceptors.response.use((response) => {
    if (response.status === 200) {
        return Promise.resolve(response.data);
    } else {
        return Promise.reject(response);
    }
}, (err) => {
    return Promise.reject(err);
})

let axiosInstance = axios.create({})
export { httpInstance,axiosInstance};
//抛出组件
export default {
    install(Vue) {
        //防止$http被覆盖
        Object.defineProperty(Vue.prototype, '$http', {
            value: httpInstance
        })
    }
}