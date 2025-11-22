import axios from "axios";
const api = axios.create({ baseURL: "http://localhost:8080" });

export const getSubmissions = () => api.get("/submissions");
export const getSubmission = (id) => api.get(`/submissions/${id}`);
export const createSubmission = (formData) =>
  api.post("/submissions", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
export const patchSubmission = (id, data) =>
  api.patch(`/submissions/${id}`, data);
export const deleteSubmission = (id) => api.delete(`/submissions/${id}`);
