'use client'

import { useQuery } from "@tanstack/react-query";
import { getUser } from "../services/users";
import { toast } from "sonner";


export const useGetSingleuser = (id: string) => {
    return useQuery({
        queryKey: ["GET_SINGLE_POST", id],
        queryFn: async () => {
            try {
                // Attempt to fetch the single post
                const response = await getUser(id);
                return response;
            } catch (error: any) {
                // Handle the error and display toast notification
                toast.error(error.message || "An error occurred while fetching the post");
                throw new Error(error.message); // Rethrow the error so react-query knows it failed
            }
        },
        enabled: !!id, // Only run the query if an id is provided
    })
}
