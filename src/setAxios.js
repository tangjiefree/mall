import axios from 'axios';
// import router from './router/router'
import store from './store';

export default function setAxios() {
    axios.interceptors.request.use(
        config => {
            if(store.state.token) {
                config.headers.token = store.state.token
            }
            return config;
        }
    )
    
    axios.interceptors.response.use(
        response => {
            const data = response.data;
            return data;
            return response;
        }
    )

}


