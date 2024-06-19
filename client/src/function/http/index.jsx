import axios from 'axios';

const ip = "localhost";


const $host = axios.create({
    baseURL: `http://${ip}:5000/` ||  `http://${ip}:4000/`
})

const $authHost = axios.create({
    baseURL: `http://${ip}:5000/` ||  `http://${ip}:4000/`
})

const authInterceptor = config =>{
    config.headers.authorization = `Bearer ${localStorage.getItem('token')}`
    return config
}

$authHost.interceptors.request.use(authInterceptor)

export {
    $host,
    $authHost
}