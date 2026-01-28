import api from "./axios";

const getMyOrders = () => api.get("/orders/my");

export default { getMyOrders };
