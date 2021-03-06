import axios from "axios";
import context from "../main";
var baseURL = "http://api.wuxd.top";
// var baseURL = "http://127.0.0.1:8000/";

export function request(config, timeout1 = 10000) {
  const instance = axios.create({
    baseURL: baseURL,
    timeout: timeout1
  });

  instance.interceptors.request.use(
    config => {
      return config;
    },
    err => {
      console.log("REQUEST_ERR");
      console.log(err);
      return err;
    }
  ),
    instance.interceptors.response.use(
      config => {
        return config;
      },
      err => {
        console.log("RESPONSE_ERR");
        console.log(err.response);
        return err.response;
      }
    );

  return instance(config);
}

//带有token验证的request
export function request_auth_required(config, timeout1 = 10000) {
  config.headers = {};
  if (context.hasLoginData()) {
    config.headers.Authorization = "cuit " + context.$store.getters.token;
  } else {
    config.headers.Authorization = "cuit ";
  }

  const instance = axios.create({
    baseURL: baseURL,
    timeout: timeout1
  });
  console.log("request_auth_required");
  console.log(config);
  instance.interceptors.request.use(
    config => {
      return config;
    },
    err => {
      console.log("REQUEST_ERR");
      console.log(err);
      return err;
    }
  ),
    instance.interceptors.response.use(
      config => {
        return config;
      },
      err => {
        console.log("RESPONSE_ERR");
        console.log(err.response);
        return err.response;
      }
    );

  return instance(config);
}
