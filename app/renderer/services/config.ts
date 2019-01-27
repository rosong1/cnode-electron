import axios from 'axios'
const baseURL = 'https://cnodejs.org/api/v1/'
const instance = axios.create({
    baseURL,
    timeout: 30 * 1000,
});

export const apiGet = (url: string, params?: object) => {
    if (params && typeof params === 'object') {
        let paramArr = [];
        for (const key in params) {
            paramArr.push(`${key}=${params[key]}`)
        }
        url += `?${paramArr.join('&')}`
    }
    return instance.get(url).then(result => result.data)
}

export const apiPost = (url: string, params?: object) => {
    return instance.post(url, params).then(result => result.data)
}