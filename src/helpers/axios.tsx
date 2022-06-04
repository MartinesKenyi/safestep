const baseUrl = process.env.REACT_APP_API_URL || 'https://safestep.herokuapp.com/api';
const axios = require('axios');

const axiosSinToken = (endpoint: string, data: any = null, method = 'GET') => {
    const url = `${baseUrl}/${endpoint}`;

    if (method === 'GET') {
        return axios(url).then(({data}: any) => {
            return data;
        }).catch(({ response }: any) => {
            return response.data;
        });
    } else {
        const config = {
            method: 'POST',
            url,
            headers: {
                'Content-type': 'application/json'
            },
            data
        }
        return axios(config).then(({data}: any) => {
            return data;
        }).catch(({ response }: any) => {
            return response.data;
        });
    }
}

const axiosConToken = (endpoint: string, data: any = null, method = 'GET') => {
    const url = `${baseUrl}/${endpoint}`;
    const Xtoken = localStorage.getItem('cubeU') || '{}';
    const anonymous = JSON.parse(Xtoken);
    const token = anonymous?.i?.t || '';

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

export {
    axiosSinToken,
    axiosConToken,
}