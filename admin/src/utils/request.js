import axios from "axios"

export default class Requset {
  static axiosConfigInit() {
    if(process.env.NODE_ENV !== "production") {
      axios.defaults.baseURL = "http://localhost:3001/admin/api";
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
