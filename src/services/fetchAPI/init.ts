import { HttpResponse } from "../../types/http";
import FetchAPI from "./fetchAPI";

const createAPI = (): FetchAPI<HttpResponse> => {
  return new FetchAPI('http://localhost:3001/vehicle');
};

const api = createAPI();

export default api;