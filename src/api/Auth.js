import AxiosWrapper from "../services/ApiConfig";

export const RegisterUser = async (body) => {
  return AxiosWrapper.post({
    endpoint: "user/create",body
  })
    .then((response) => {
      return {
        status:response.status,
        data:response.data
      };
    })
    .catch((error) => {
        // return {
        //     status:error.response.status,
        //     code:error.code
        //   };
        throw error;
    });
};


export const LoginUser = async (body) => {
  return AxiosWrapper.post({
    endpoint: "user/login",body
  })
    .then((response) => {
      return {
        status:response.status,
        data:response.data
      };
    })
    .catch((error) => {
        // return {
        //     status:error.response.status,
        //     code:error.code
        //   };
        throw error 
    });
};