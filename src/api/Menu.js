import AxiosWrapper from "../services/ApiConfig";

export const getSidebarMenus = async (menu) => {
    try {
        const response = await AxiosWrapper.get({
             endpoint: `${menu}`
             })

            return {
                status:response.status,
                data:response.data,
            };

    } catch (error) {
        throw error;

    }
}