"use server";

import { revalidateTag } from "next/cache";

import AxiosInstance from "@/src/lib/AxiosInstance";
import envConfig from "@/src/config/envConfig";

export const createPost = async (formData: FormData): Promise<any> => {
  try {
    const { data } = await AxiosInstance.post("/items", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    revalidateTag("posts");
  } catch (error) {
    throw new Error("Faild to create post");
  }
};



export const getPost = async (postId: string) => {
  let fetchOptions = {};

  fetchOptions = {
    cache: "no-store"
  };

  const res = await fetch(`${envConfig.baseApi}/items/${postId}`, fetchOptions);

  if (!res.ok) {
    throw new Error("Faild to fetch data")
  }
  return res.json();
}





export const getAllPost = async () => {
  const fetchOption = {
    next: {
      tags: ["posts"],
    },
  };

  const res = await fetch(
    `${envConfig.baseApi}/items`, fetchOption,
  );

  // await delay(5000);

  return res.json();
};





export const deleteProduct = async (_id: string | undefined) => {
  try {
    const { data } = await AxiosInstance.delete(`/items/${_id}`, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    revalidateTag("posts");

    return data;
  } catch (error) {
    throw new Error("Failed to delete product");
  }
};



export const getPostByUser = async () => {
  try {
    const response = await AxiosInstance.get(`/items/user/posts`, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log("Response from API:", response); // Check what the API is returning
    return response.data.data; // Return only the "data" field
  } catch (error:any) {
    console.error("Error fetching user posts:", error.response?.data || error.message); // Detailed error log
    throw new Error("Failed to fetch user posts");
  }
};
