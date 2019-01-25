import * as path from "path"
import * as detective from "../src"
import Axios from "axios"

// Private Settings;
require("dotenv").config(path.join(__dirname, "..", ".env"))
const token = process.env.DETECTIVE_TOKEN || ""
const endpoint = process.env.DETECTIVE_ENDPOINT

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
  console.log(error)
  // Do something with request error
  return Promise.reject(error)
})
*/

detective.config(token, { endpoint })


detective.profile("eosnationftw")
  .then(res => {
    console.log("onsuccess")
    console.log(res)
  })
  .catch(reason => {
    console.log("onerror")
    console.log(reason)
  })

detective.accounts("system")
  .then(res => {
    console.log("onsuccess")
    console.log(res)
  })
  .catch(reason => {
    console.log("onerror")
    console.log(reason)
  })


detective.transfers(["eosnationftw"], { quantity_min: 10 })
  .then(res => {
    console.log("onsuccess")
    console.log(res)
  })
  .catch(reason => {
    console.log("onerror")
    console.log(reason)
  })

/*
detective.transfers(["eosnationftw"], {
  // quantity_min: 1000,
  accumulated: false,
  quantity_max: 1,
  time_min: new Date("2018-06-22T22:17:50.500Z")
  // time_max: new Date("2018-06-28T22:18:43.000Z")
  // time_max: new Date(Date.UTC(2018, 5, 28, 22, 18, 43))
}).then((res) => {
  console.log(res)
})*/
