import AxiosWrapper from "../services/ApiConfig";

export const usersList = async () => {

    return AxiosWrapper.get({

        endpoint: "user/list",
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

export const getUser = async () => {
    return AxiosWrapper.get({
        endpoint: "user/list",
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