"use client";

import React, { useEffect, useState } from 'react';
import { useSearchItems } from '@/src/hooks/search.hook'; // Ensure the correct path
import Image from 'next/image';
import { useRouter } from 'next/navigation';

import { Input } from "@nextui-org/input";
import { SearchIcon } from "@/src/assets/icons";

const SearchImplement: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState<string>(""); // State for search term
    const [isSearching, setIsSearching] = useState(false); // State to manage search visibility
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const { mutate: handleSearch, data } = useSearchItems();
    const router = useRouter();

    // Handle search input change
    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
        setIsSearching(event.target.value.length > 0); // Show search results when input has text
    };

    useEffect(() => {
        if (!searchTerm) return;

        setLoading(true);
        setError(null);

        // Trigger the search
        handleSearch(searchTerm, {
            onSuccess: () => {
                setLoading(false); // Loading ends when data is received
            },
            onError: () => {
                setError("Failed to fetch search results");
                setLoading(false);
            },
        });
    }, [searchTerm, handleSearch]);

    const handleItemClick = (id: string) => {
        // Navigate to the product details page using the item ID
        router.push(`/${id}`);
        // Clear search input and hide search results
        setSearchTerm("");
        setIsSearching(false);
    };

    return (
        <div className="relative w-full">
            <div className="relative w-8/12 mx-auto">
                <Input
                    aria-label="Search"
                    classNames={{
                        inputWrapper: "bg-default-100",
                        input: "text-sm",
                    }}
                    placeholder="Search..."
                    startContent={
                        <SearchIcon className="text-base text-default-400 pointer-events-none flex-shrink-0" />
                    }
                    type="search"
                    value={searchTerm}
                    onChange={handleSearchChange} // Handle input change
                />
                {/* Display search results below the input */}
                {isSearching && (
                    <div className="absolute top-full left-0 w-full bg-white shadow-lg z-10">
                        <div className="search-results p-4">
                            {loading && <p>Loading...</p>}
                            {error && <p className="text-red-500">{error}</p>}
                            {!loading && (!data?.data?.hits || data.data.hits.length === 0) && (
                                <p>No results found</p>
                            )}
                            <ul>
                                {data?.data?.hits?.map((item: any) => (
                                    <li
                                        key={item.id}
                                        className="search-item p-4 border w-full rounded-lg shadow-lg transition-transform duration-200 hover:scale-105 cursor-pointer flex"
                                    >
                                        <button onClick={() => handleItemClick(item.id)}>
                                            <div className="flex items-start">
                                                <Image
                                                    src={item?.thumbnail}
                                                    width={50}
                                                    height={50}
                                                    alt={item.title}
                                                    className="rounded"
                                                />
                                                <div className="flex flex-col">
                                                    <h3 className="text-left truncate md:max-w-56 sm:max-w-24">
                                                        {item.title}
                                                    </h3>
                                                    <p className="text-sm text-gray-500">{item.type}</p>
                                                </div>
                                            </div>
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default SearchImplement;
