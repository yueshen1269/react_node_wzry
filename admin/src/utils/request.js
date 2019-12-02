import axios from "axios"
import { message } from "antd";
import { BrowserRouter as Router } from 'react-router-dom'
const router = new Router();

class Request {
  static axiosConfigInit() {
    if(process.env.NODE_ENV !== "production") {
      axios.defaults.baseURL = "http://localhost:3001/admin/api";
      axios.interceptors.request.use(function (config) {
        // Do something before request is sent
        if (localStorage.token) {
          config.headers.Authorization = 'Bearer ' + localStorage.token
        }
        return config;
      }, function (error) {
        // Do something with request error
        return Promise.reject(error);
      });

      axios.interceptors.response.use(res => {
        return res
      }, err => {
        if (err.response.data.message) {
          message.error(err.response.data.message);
          if (err.response.status === 401) {
            // router.history.push('/login');
            window.location.pathname = '/login';
          }
        }
        console.log("err: dd", err);
        return Promise.reject(err)
      })

    }

  }

  static async axios(method="get", url, params={}) {
    const handleMethod = method === "get" && params ? { params } : params;
    return new Promise((resolve, reject) => {
      const index = new Date().getSeconds();
      console.log("%d,请求地址为：%s,params：%o", index, url, handleMethod);

      axios[method](url, handleMethod).then((res) => {
        const response = typeof res.data === "object" ? res.data : JSON.parse(res.data);
        resolve(response);
        console.log("%d,收到响应数据：%o",index, response);
      }).catch((error) => {
        if(error.response) {
          reject(error.response.data);
        } else {
          reject(error);
        }
      })
    })
  }
}

export default Request;
