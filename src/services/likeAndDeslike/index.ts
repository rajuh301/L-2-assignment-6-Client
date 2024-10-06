'use service'
import envConfig from '@/src/config/envConfig';
import Cookies from 'js-cookie';

export const addLike = async (itemId: string) => {
  try {
    const token = Cookies.get('accessToken');

    if (!token) {
      throw new Error("No access token found");
    };

    const baseApi = envConfig.baseApi;
    const response = await fetch(`${baseApi}/items/${itemId}/like`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': token
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to add like: ${response.statusText}`);
    }
    
    const data = await response.json();
    
    return data;
  } catch (error: any) {
    throw new Error(error.message || "Failed to create like");
  }
};




export const disLike = async (itemId: string) => {
  try {
    const token = Cookies.get('accessToken');

    if (!token) {
      throw new Error("No access token found");
    };

    const baseApi = envConfig.baseApi;
    const response = await fetch(`${baseApi}/items/${itemId}/dislike`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': token
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to add like: ${response.statusText}`);
    }
    
    const data = await response.json();
    
    return data;
  } catch (error: any) {
    throw new Error(error.message || "Failed to dislike");
  }
};




