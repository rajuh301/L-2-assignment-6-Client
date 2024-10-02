'use client';

import { FaThumbsUp, FaCommentAlt, FaShare, FaThumbsDown } from 'react-icons/fa';
import { Avatar, Button } from '@nextui-org/react';
import { useParams } from 'next/navigation';
import { useGetSinglePost } from '@/src/hooks/post.hook';
import ImageGallery from '@/src/components/UI/imageGallery';
import { IPost } from '@/src/types';

export default function SinglePost() {
    const params = useParams();
    const id = params.id;

    // Fetch single post using the custom hook
    const { data: post, isLoading, error } = useGetSinglePost(id as string);

    // Show loading state
    if (isLoading) {
        return <p>Loading post...</p>;
    }

    // Show error state
    if (error) {
        return <p>Error: {error.message}</p>;
    }

    // Show when the post is not found
    if (!post?.data) {
        return <p>Post not found</p>;
    }

    // Extract the post data
    const { _id, user, title, images } = post.data;

    return (
        <div className="max-w-3xl mx-auto mt-10 space-y-6">
            <div key={_id} className="bg-white shadow-md rounded-lg overflow-hidden">
                {/* Header: User Info */}
                <div className="flex items-center p-4">
                    <Avatar
                        isBordered
                        radius="full"
                        size="md"
                        src={user?.avatar || '/default-avatar.png'} // Display user's avatar or default one
                    />
                    <div className="ml-4">
                        <h4 className="font-semibold text-lg">
                            {user?.name || 'Unknown User'} {/* Display user name */}
                        </h4>
                        <span className="text-sm text-gray-500">
                            {user?.email || 'No email provided'} {/* Display user email */}
                        </span>
                    </div>
                </div>

                {/* Post Content */}
                <div className="p-4">
                    <p className="text-gray-700">{title}</p>

                    {/* Image Gallery: Using ImageGallery component */}
                    {images && images.length > 0 && (
                        <div className="mt-4">
                            <ImageGallery images={images} />
                        </div>
                    )}
                </div>

                {/* Social Interaction Buttons */}
                <div className="flex justify-between items-center px-4 py-2 border-t border-gray-200">
                    <div className="flex gap-2">
                        <button className="flex items-center gap-2 text-gray-600 hover:bg-gray-100 px-3 py-2 rounded-lg">
                            <FaThumbsUp />
                            <span>0</span>
                        </button>

                        <button className="flex items-center gap-2 text-gray-600 hover:bg-gray-100 px-3 py-2 rounded-lg">
                            <FaThumbsDown />
                            <span>0</span>
                        </button>
                    </div>

                    <button className="flex items-center gap-2 text-gray-600 hover:bg-gray-100 px-3 py-2 rounded-lg">
                        <FaCommentAlt />
                        <span>Comment</span>
                    </button>

                    <button className="flex items-center gap-2 text-gray-600 hover:bg-gray-100 px-3 py-2 rounded-lg">
                        <FaShare />
                        <span>0</span>
                    </button>
                </div>
            </div>
            <div className='flex justify-center mx-auto mb-5'>

                <Button>See more</Button>
            </div>

        </div>
    );
}
