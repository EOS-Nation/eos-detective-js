import { transfers, config } from "../src"
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

const token = "L9MVfwaeoPxNFaMxDEf6hbbpxjEdR5nHTLK2c4f9iNnxcmYj"
const endpoint = "http://localhost:8529/_db/eosdetective"

config(token, endpoint)

transfers(["eosnationftw"], {
  quantity_min: 1000,
  accumulated: false,
  time_min: new Date("2018-06-28T00:17:50.500Z"),
  time_max: new Date("2018-06-28T23:18:43.000Z")
}).then((res) => {
  console.log(res)
})
