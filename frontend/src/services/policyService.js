import axiosInstance from "../api/axiosInstance";

export const askPolicyQuestion = (query) => {
    return axiosInstance.post("/policies/query/", { query });
};