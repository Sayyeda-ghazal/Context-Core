import API from "./axios";

export const getRecentDocuments = () =>{
    return API.get("/documents/recent");
};