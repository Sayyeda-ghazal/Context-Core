import API from "./axios";

export const getDashboardHome = () => {
    return API.get("/auth/dashboard/home");
};