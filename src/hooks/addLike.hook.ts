import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addLike, disLike } from "../services/likeAndDeslike";
import { toast } from "sonner";

export const useAddLike = () => {
  const queryClient = useQueryClient(); 

  return useMutation<{ success: boolean }, Error, string>({
    mutationKey: ["ADD_LIKE"],
    mutationFn: (itemId: string) => addLike(itemId),
    onSuccess: () => {
      queryClient.invalidateQueries(["posts"]); 
      toast.success("Like added successfully");
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });
};



export const useDisLike = () => {
  const queryClient = useQueryClient(); 

  return useMutation<{ success: boolean }, Error, string>({
    mutationKey: ["DES_LIKE"],
    mutationFn: (itemId: string) => disLike(itemId),
    onSuccess: () => {
      queryClient.invalidateQueries(["posts"]); 
      toast.success("Dis Like successfully");
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });
};
