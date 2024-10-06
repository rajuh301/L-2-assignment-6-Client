'use client'
import { useMutation } from "@tanstack/react-query";
import { addComent } from "../services/comment";
import { toast } from "sonner";

export const useCreateComment = (itemId: string, comment: string) => {
    return useMutation<any, Error, FormData>({
        mutationKey: ["CREATE_COMMENT"],
        mutationFn: async (postData) => await addComent(postData, itemId), // Ensure itemId is passed here
        onSuccess: () => {
            toast.success("Comment created successfully");
        },
        onError: (error) => {
            toast.error(error.message);
        },
    });
};
