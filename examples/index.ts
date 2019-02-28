import * as path from "path"
import * as detective from ".."
import Axios from "axios"

/* Debug axios calls */

Axios.interceptors.request.use(function (config) {
    // Do something before request is sent
    console.log(config);
    return config;
}, function (error) {
    // Do something with request error
    return Promise.reject(error);
});


Axios.interceptors.response.use(function (config) {
    // Do something before request is sent
    console.log(config);
    return config;
}, function (error) {
    console.log(error);
    // Do something with request error
    return Promise.reject(error);
});


// TO-DO add ava testing
detective.config(path.join(__dirname, "..", ".env"));

detective.stats({chain: "bos"})
    .then((response) => console.log(response.data))
    .catch((err) => console.error(err));


/*
  detective.stats()
    .then(res => {
      console.log("onsuccess")
      console.log(res)
    })
    .catch(reason => {
      console.log("onerror")
      console.log(reason)
    })

  detective.profile("yqjltendhyjp")
    .then(res => {
      console.log("onsuccess")
      console.log(res)
    })
    .catch(reason => {
      console.log("onerror")
      console.log(reason)
    })

  detective.accounts("blacklist")
    .then(res => {
      console.log("onsuccess")
      console.log(res)
    })
    .catch(reason => {
      console.log("onerror")
      console.log(reason)
    })

detective.transfers(["eosnationftw"], {
    quantity_min: 10,
    accumulated: false,
    time_min: new Date("2016-01-24T22:07:43.990Z")
})
    .then(res => {
        console.log("onsuccess")
        console.log(res.data!.transfers[0])
    })
    .catch(reason => {
        console.log("onerror")
        console.log(reason)
    })
*/

// main()
