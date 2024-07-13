import axios from "axios";

const baseURL = "https://e04d-2804-870-f601-a000-39f4-b032-2ab0-d7f5.ngrok-free.app/"

const baseApi = axios.create({ baseURL });
export default baseApi;