import { useMutation } from "@tanstack/react-query"
import { searchItems } from "../services/SearchPost"


export const useSearchItems = () => {
    return useMutation({
        mutationKey: ["SEARCH_ITEMS"],
        mutationFn: async (searchTerm: string) => await searchItems(searchTerm)
    })
}