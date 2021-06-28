## token 自动刷新

token 是什么? token是当用户成功登录以后，服务端返回给客户端的一个有时效性的用户唯一身份标识，用户登录后的每一次请求都需要携带这个token，以验证请求是否合法。

一般而言，前端拿到的token存到了session-storage 或者 local-storage中（具体看业务需求），每次请求都会在请求头中的header字段：

```js
 axios.get("/song-list", {
     headers: {
         'Authorization': token 
     }
 })
```
如果服务端请求客户端发过来的请求过期了，这个请求就会被视为失效，而且也不会返回正常的数据。那么前端相应的需要根据失效的token做出对应的处理，一般token失效后前端是需要做两种处理，要么token失效，自动退出登录状态，重定向到登陆页面并且提示用户登录凭证过期。要么自动帮用刷新token，延长过期时间。

这里具体讲讲刷新token， 一般在thenable函数中处理后端返回的状态码，如果匹配token失效的状态码，将请求失败的接口放到一个任务队列，调用一个新的接口并带上用来刷新的refreshToken，服务端返回新的refreshToken和token后保存到本地，遍历任务队列里请求失败的接口重新请求

```js
// /utils/request.js
import axios from "axios";
import { SET_TOKEN, REFRESH_TOKEN } from "./LOCAL_STORAGE.js";

function setToken (token) {
    localStorage.setItem(SET_TOKEN, token);
}

function getToken (tokenName) {
    return  localStorage.getItem(tokenName);
}

function refreshToken () {
      return instance.post('/auth/refresh', { refresh_token: getToken(REFRESH_TOKEN) }, true)
}

const instance = axios.create({
    baseURL: "192.168.19.1" 
});

// 在响应拦截里做处理
instance.interceptors.response.use(fulfilledHandler, rejectHandler);

const abortRequest = [];

function rejectHandler (error) {
    if (error.response.status === 401) {
        const { config } = error;
        let isRefreshing = false;
        // token失效
        if (!isRefreshing) {
            isRefreshing = true;
            return refreshToken().then(result => {
                const { access_token } = result;
                setToken(access_token);
                abortRequest.forEach(item => item(access_token));
                return instance(config);
            }).catch(error => {
                return Promise.reject(error);
            }).finally(() => {
                isRefreshing = false;
            });
        } else {
            return new Promise((resolve, reject) => {
                abortRequest.push(token => {
                    resolve(instance({
                        ...config,  
                        headers: {
                            Authorization: token
                        }
                    }))
                });
            });
        }
    } else {
        return Promise.reject(error);
    }
}

return instance;

```