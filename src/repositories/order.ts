import { APIResponse, Order, OrderSuccessResponse } from "src/models";
import api from "../utils/apiClient";

export const submitOrder = async (
  order: Order
): Promise<APIResponse<OrderSuccessResponse>> => {
  try {
    const res = await api.post("v1/payment/chatgpt", { order });
    return res.data.data;
  } catch (e) {
    throw e;
  }
};
