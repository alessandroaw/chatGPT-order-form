import api from "../utils/apiClient";
import { Airport } from "src/models";

export const fetchAirport = async (query: string = ""): Promise<Airport[]> => {
  try {
    const res = await api.get("v1/airports", {
      params: {
        q: query,
      },
    });
    return res.data.data;
  } catch (e) {
    console.log(e);
    return [];
  }
};
