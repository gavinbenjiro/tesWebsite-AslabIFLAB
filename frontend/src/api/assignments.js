import axios from "axios";

const api = axios.create({ baseURL: "http://localhost:8080" });

export const getAssignments = () => api.get("/assignments");
export const getAssignment = (id) => api.get(`/assignments/${id}`);
