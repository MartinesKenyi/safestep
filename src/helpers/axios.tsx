import axios from 'axios';

const baseURL = 'https://safestep.herokuapp.com/api';
// const baseURL = 'http://127.0.0.1:8000/api';

const axiosApi = axios.create({ baseURL });

// axiosApi.interceptors.request.use(
//     async(config: any) => {
//         const token = await AsyncStorage.getItem('token');
//         if ( token ) {
//             config.headers['x-token'] = token;
//         }
//         console.log('axios token line 12', token, config)
//         return config;
//     }
// );

export const axiosConToken = async (endpoint: string, data: any = null, method = 'GET') => {
    const url = `${baseURL}${endpoint}`;
    const token = await localStorage.getItem('token') || '';

    if (method === 'GET') {
        const config = {
            method,
            url,
            headers: {
                'x-token': token
            }
        };
        return axios(config).then(({data}: any) => {
            return data;
        }).catch(({ response }: any) => {
            return response.data;
        });
    } else {
        const config = {
            method,
            url,
            headers: {
                'Content-type': 'application/json',
                'x-token': token
            },
            data
        };
        return axios(config).then(({data}: any) => {
            return data;
        }).catch(({ response }: any) => {
            return response.data;
        });
    }
}

export default axiosApi;
