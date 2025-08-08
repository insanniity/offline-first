import { API_URL } from "@/utils/constants";
import axios from "axios";


const axiosInstance = axios.create({
    baseURL: API_URL,
    timeout: 30000,
    timeoutErrorMessage: 'Timeout',
});


export default axiosInstance;