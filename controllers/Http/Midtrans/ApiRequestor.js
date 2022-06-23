'use strict'
const axios = require("axios")
class ApiRequestor {
  static get(url, server_key, data_hash) {
    return this.remoteCall(url, server_key, data_hash, false);
  }
  static post(url, server_key, data_hash) {
    return this.remoteCall(url, server_key, data_hash, true);
  }
  static remoteCall(url, server_key, data_hash, post = true){
    const headers = {
        "Content-Type" : "application/json",
        Accept : "application/json",
        Authorization:
            "Basic " + Buffer.from(server_key + ":").toString("base64")
    }
    let body = JSON.stringify(data_hash)
    let result
    if (post){
        result = axios.post(url, body, {
            headers: headers
        }).then((res) => {
            return res.data
        }).catch(e => console.log(e))
    }else {
        result = axios.get(url, {
            headers: headers
        }).then((res) => {
            return res.data
        }).catch(e => console.log(e))
    }

    return result
  }
}

module.exports = ApiRequestor;