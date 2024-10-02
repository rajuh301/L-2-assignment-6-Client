'use server'
import AxiosInstance from "@/src/lib/AxiosInstance";

export const searchItems = async (searchTerm: string) => {
  try {
    const res = await AxiosInstance.get(
      `/search-items?searchTerm=${searchTerm}`
    );

    return res.data;
  } catch (error) {
   
    throw new Error("Failed to search items");
  }
};
