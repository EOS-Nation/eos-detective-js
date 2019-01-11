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

/*
Axios.interceptors.response.use(function(config) {
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
  time_min: new Date("2017-06-22T22:17:50.500Z")
  // time_max: new Date("2018-06-28T22:18:43.000Z")
  // time_max: new Date(Date.UTC(2018, 5, 28, 22, 18, 43))
}).then((res) => {
  console.log(res)
})
