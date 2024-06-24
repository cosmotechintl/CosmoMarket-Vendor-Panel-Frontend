import { publicRequest } from "../utils/requestMethods";
export const loginAdmin = (loginDetail) => {
  return publicRequest
    .post("/authenticate", loginDetail)
    .then((response) => response.data);
};
