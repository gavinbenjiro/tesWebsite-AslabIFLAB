import axios from "axios";
const api = axios.create({ baseURL: "http://localhost:8080" });

export const getSubmissions = () => api.get("/soaltugas");
export const getSubmission = (id) => api.get(`/soaltugas/${id}`);
export const createSubmission = (formData) =>
  api.post("/soaltugas", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
export const patchSubmission = (id, data) =>
  api.patch(`/soaltugas/${id}`, data);
export const deleteSubmission = (id) => api.delete(`/soaltugas/${id}`);
