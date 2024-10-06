'use server'

import { revalidateTag } from "next/cache";

export const addComent = async (formData: FormData, itemId: string): Promise<any> => {
    try {
        const response = await fetch(`${process.env.BASE_API}/items/${itemId}/comments`, {
            method: 'POST',
            headers: {
                "Authorization": ` ${localStorage.getItem("accessToken")}`,
                "Content-Type": "multipart/form-data",
            },
            body: formData,
        });

        if (!response.ok) {
            throw new Error("Failed to create comment");
        }

        const data = await response.json(); 
        revalidateTag("posts");
        return data; 
    } catch (error: any) {
        throw new Error(error.message || "An error occurred while creating the comment");
    }
};
