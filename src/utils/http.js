import axios from 'axios'; // 引入axios
import qs from 'qs'

// 创建axios实例
const service = axios.create({
    // axios中请求配置有baseURL选项，表示请求URL公共部分
    baseURL: process.env.VUE_APP_BASE_API, // baseUrl作用就是给所有请求地址前添加 url，在vue.config.js中 通过此url进行搜索，替换成目标地址
    // 超时
    timeout: 30000,
    // 禁用 Cookie 等信息
    withCredentials: false,
})
axios.defaults.headers['Content-Type'] = 'application/json;charset=utf-8'

// 2.请求拦截器
service.interceptors.request.use(config => {
    //发请求前做的一些处理，数据转化，配置请求头，设置token,设置loading等，根据需求去添加
    config.data = JSON.stringify(config.data); //数据转化,也可以使用qs转换

    //如有需要：注意使用token的时候需要引入cookie方法或者用本地localStorage等方法，推荐js-cookie
    //const token = getCookie('名称');//这里取token之前，你肯定需要先拿到token,存一下
    //if(token){
    //config.params = {'token':token} //如果要求携带在参数中
    //config.headers.token= token; //如果要求携带在请求头中
    //}
    return config
}, error => {
    Promise.reject(error)
})

//响应拦截器
service.interceptors.response.use(response => {
    // console.log(response)
    //获取状态码
    const { status } = response
    // 获取错误信息
    const msg = response.data.msg
    if (status == 200) {
        return response.data;
    }else {
        return Promise.reject(new Error(msg))
    }
}, error => {
    if (error && error.response) {
        return Promise.reject(error)
    }
})

export default service //由于是export default 默认导出 service 在引入的时候可以任意命名 例如 import request from '@/utils/http' 这里的request 可以替换成任何名字