import axios from "axios";
const url = <string>import.meta.env.VITE_API_BASE;

const instance = axios.create({
    baseURL: url,
    headers: {
        'content-type': 'application/json',
    },
});
export default instance;