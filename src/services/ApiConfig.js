import axios from "axios";
import { BASE_URL } from "../constants";


console.log("BASE_URL", BASE_URL);

class AxiosWrapper {
    static token = null;

    constructor() {
        // AxiosWrapper.retrieveToken()
    }

    static retrieveToken = async () => {
        try {
            this.token = await localStorage.getItem("token");

        } catch (e) {
            console.error(e);
        }
    };

    static get = async ({ endpoint, page, limit = 10, search }) => {
        await AxiosWrapper.retrieveToken();
        let url = `${BASE_URL}${endpoint}`;
        const searchParams = [];
        let params;
        if (search) {
            searchParams.push(`title=${search}`);
        }
        if (page) {
            searchParams.push(`page=${page}&limit=${limit}`);
        }

        if (searchParams.length > 0) {
            params = searchParams.join("&");
            url = url + "?" + params;
        }

        return axios.get(url, {
            headers: {
                Authorization: `${this.token}`,
            },
        });
    };

    static getById = async ({ endpoint, id, filter }) => {
        await AxiosWrapper.retrieveToken();
        let url = `${BASE_URL}${endpoint}/${id}`;
        const searchParams = [];
        let params;
        if (filter) {
            searchParams.push(`${filter}=time`);
        }
        if (searchParams.length > 0) {
            params = searchParams.join("&");
            url = url + "?" + params;
        }
        return axios.get(url, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `${this.token}`,
            },
        });
    };

    static post = async ({ endpoint, body }) => {
        await AxiosWrapper.retrieveToken();
        return axios.post(`${BASE_URL}${endpoint}`, body, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `${this.token}`,
            },

        });
    };

    static Forgetpwdpost = async ({ endpoint, data }) => {
        return axios.post(`${BASE_URL}${endpoint}`, data, {
            headers: {
                "Content-Type": "application/json",
            },
        });
    };

    static Resetpwdpost = async ({ endpoint, data }) => {
        console.log("🚀 ~ AxiosWrapper ~ Resetpwdpost= ~ token:", data);
        return axios.post(`${BASE_URL}${endpoint}`, data, {
            headers: {
                "Content-Type": "application/json",

            },
        });
    };
    static put = async ({ endpoint, id, body }) => {
        await AxiosWrapper.retrieveToken();
        let url = `${BASE_URL}${endpoint}`;
        if (id) {
            url += `/${id}`;
        }
        return axios.put(url, body, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `${this.token}`,
            },
        });
    };

    static delete = async ({ endpoint, id }) => {
        await AxiosWrapper.retrieveToken();
        let url = `${BASE_URL}${endpoint}`;
        if (id) {
            url += `/${id}`;
        }
        return axios.delete(url, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `${this.token}`,
            },
        });
    };
}
export default AxiosWrapper;