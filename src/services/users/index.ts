'use server'

import envConfig from "@/src/config/envConfig";


export const getUser = async (userId: string) => {
    let fetchOptions = {};

    fetchOptions = {
        cache: "no-store"
    };

    const res = await fetch(`${envConfig.baseApi}/users/${userId}`, fetchOptions);

    if (!res.ok) {
        throw new Error("Faild to fetch data")
    }
    return res.json();
}
