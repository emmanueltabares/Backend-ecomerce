import axios from 'axios';
import config from '../config/config';
import { newProductI } from '../interfaces/products';

const URL = config.URL_HTTP_AXIOS

const DATA: newProductI = {
    name: 'PruebaAxios',
    cod: 51,
    description: 'Prueba realizada desde Axios',
    photo: 'url',
    price: 5320,
    stock: 20,
}

let ID = '';

const functionPost = async () => {
    try {
        const resp = await axios.post(URL, DATA);
        console.log(resp.data);
    } catch (error) {
        console.log(error);
    }
};

const functionGet = async () => {
    try {
        const resp = await axios.get(URL);
        console.log(resp.data);
    } catch (error) {
        console.log(error);
    }
};

const functionUpdate = async () => {
    try {
        const resp = await axios.put(`${URL}/${ID}`)
    } catch (error) {
        console.log(error);
    }
}

const functionDelete = async () => {
    try {
        const resp = await axios.delete(`${URL}/${ID}`)
    } catch (error) {
        console.log(error);
    }
};

export const TestHttpWithAxios = () => {
    functionPost();
    functionGet();
    /* functionUpdate(); */
    /* functionDelete(); */
    
}