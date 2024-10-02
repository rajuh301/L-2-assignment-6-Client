'use client';

import { FaThumbsUp, FaCommentAlt, FaShare, FaThumbsDown } from 'react-icons/fa';
import { Avatar, Button } from '@nextui-org/react';
import ImageGallery from '../components/UI/imageGallery';
import { useGetAllPost } from '../hooks/post.hook';
import { ReactNode } from 'react';
import { IPost } from '../types';
import Link from 'next/link';



export default function HomePage() {
  const { data: posts } = useGetAllPost();

  console.log(posts)


  return (
    <div className="max-w-3xl mx-auto mt-10 space-y-6">
      {posts?.data.map((post: {
        _id: string | undefined;
        user: any;
        title: ReactNode;
        images: any; post: IPost
      }) => (
        <div key={post._id} className="bg-white shadow-md rounded-lg overflow-hidden">
          {/* Header: User Info */}


          <button>
            <Link href={`/userProdile/${post?.user?._id}`}>
              <div className="flex items-center p-4">
                <Avatar
                  isBordered
                  radius="full"
                  size="md"
                  src={post?.user?.profilePhoto || '/default-avatar.png'} // Assuming you have an avatar field, otherwise use default avatar
                />
                <div className="ml-4">
                  <h4 className="font-semibold text-lg">
                    {post?.user?.name || 'Unknown User'} {/* Display user name */}
                  </h4>
                  <span className="text-sm text-gray-500">
                    {post?.user?.email || 'No email provided'} {/* Display user email */}
                  </span>
                </div>
              </div>

            </Link>

          </button>


          {/* Post Content */}
          <div className="p-4">
            <p className="text-gray-700">{post.title}</p>

            {/* Image Gallery: Using ImageGallery component */}
            {post.images.length > 0 && (
              <div className="mt-4">
                <ImageGallery images={post.images} />
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
      ))}
    </div>
  );
}
