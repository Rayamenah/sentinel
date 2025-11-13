// lib/axios.ts
import axios from "axios";
import { toast } from "sonner";

const api = axios.create({
    baseURL: "https://dummyjson.com",
});

api.interceptors.response.use(
    (res) => res,
    (err) => {
        const message =
            err?.response?.data?.message ||
            err?.response?.statusText ||
            err.message ||
            "Network error";

        toast.error(message);
        return Promise.reject(new Error(message));
    }
);

export default api;
