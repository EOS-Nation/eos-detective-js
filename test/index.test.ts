import { transfers } from "../src"
import Axios from "axios"

/* Debug axios calls */
/*
Axios.interceptors.request.use(function(config) {
  // Do something before request is sent
  console.log(config)
  return config
}, function(error) {
  // Do something with request error
  return Promise.reject(error)
})
*/

transfers(["eosnationftw"], { quantity_min: 1000, count_min: 5 }).then((res) => {
  console.log(res)
})
