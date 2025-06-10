import AxiosWrapper from "../services/ApiConfig";

export const userList = async ({ page, limit, search }) => {
    return AxiosWrapper.get({
        endpoint: `user/list`,
        page,
        limit,
        search,
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

export const fetchUser = async ({ id }) => {
    return AxiosWrapper.getById({
        endpoint: `user/get-details`,
        id,
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
export const UpdatUser = async ({ id, body }) => {
    return AxiosWrapper.put({
        endpoint: `user/update`,
        id,
        body,
    })
        .then((response) => {
            return {
                status: response.status,
                data: response.data,
            };
        })
        .catch((error) => {
            return {
                status: error.response.status,
                code: error.code
            };
        });
};
export const AddUser = async (body) => {
    return AxiosWrapper.post({
        endpoint: "user/create", body
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
export const DeleteUser = async (id) => {
    return AxiosWrapper.delete({
        endpoint: `user/delete/${id}`,


    })
        .then((response) => {
            return {
                status: response.status,
                data: response.data,
            };
        })
        .catch((error) => {
            return {
                status: error.response.status,
                code: error.code
            };

        });
};