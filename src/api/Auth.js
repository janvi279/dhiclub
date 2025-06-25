import AxiosWrapper from "../services/ApiConfig";

export const RegisterUser = async (body) => {
  console.log("come in register user")
  return AxiosWrapper.post({
    endpoint: "socialAuth/memberSignup", body
  })
    .then((response) => {
      return {
        status: response.status,
        data: response.data
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
    endpoint: "socialAuth/authenticate", body
  })
    .then((response) => {
      return {
        status: response.status,
        data: response.data
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

export const ForgetPassword = async (email) => {
  return AxiosWrapper.Forgetpwdpost({
    endpoint: "user/forgetPassword",
    data: { email },
  });
};

export const resetPassword = async (token, newPassword) => {
  console.log("token, newPassword", token, newPassword);
  return AxiosWrapper.Resetpwdpost({
    endpoint: "user/resetPassword",
    data: { token, newPassword },
  })
    .then((response) => {
      return {
        status: response.status,
        data: response.data,
      };
    })
    .catch((error) => {
      throw error;
    });
};

export const LogoutUser = async () => {
  return AxiosWrapper.post({
    endpoint: "user/logout",
    body: {},
  }).then((response) => {
    return {
      status: response.status,
      data: response.data
    }
  })
    .catch((error) => {
      throw error;
    });
}