import { useQuery } from "@tanstack/react-query";
import { getPostByUser } from "../services/post";

export const useGetPostByUser = () => {
    return useQuery({
      queryKey: ["SET_POST_BY_USER"], // A unique key for this query
      queryFn: async () => {
        const data = await getPostByUser();
        console.log("Fetched posts data: ", data); // Debugging the data returned
        return data;
      },
    });
  };
  