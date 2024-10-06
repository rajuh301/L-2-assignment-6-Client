'use client';

import { FaThumbsUp, FaCommentAlt, FaShare, FaThumbsDown } from 'react-icons/fa';
import { Avatar, Button } from '@nextui-org/react';
import ImageGallery from '../components/UI/imageGallery';
import { useGetAllPost } from '../hooks/post.hook';
import { useState } from 'react';
import dynamic from 'next/dynamic';
import 'react-quill/dist/quill.snow.css';
import Link from 'next/link';
import { useCreateComment } from '../hooks/comment.hook';
import { useAddLike, useDisLike } from '../hooks/addLike.hook';

const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });

export default function HomePage() {
  const { data: posts } = useGetAllPost();

  // State for comment input visibility and content
  const [showInput, setShowInput] = useState<string | null>(null);
  const [comment, setComment] = useState<string>('');

  const handleCommentSubmit = (postId: string) => {
    if (comment) {
      const postData = {
        postId: postId,
        comment: comment,
      };

      const { mutate: createComment } = useCreateComment(postId, comment);
      createComment(postData);
    }
  };

  // ------------------------- Like and Dislike --------------------

  // Like mutation
  const likeMutation = useAddLike();

  const handleLike = (postId: string) => {
    likeMutation.mutate(postId);
  };

  // Dislike mutation
  const dislikeMutation = useDisLike();

  const handleDislike = (postId: string) => {
    dislikeMutation.mutate(postId);
  };

  // ------------------------- Like and Dislike --------------------

  return (
    <div className="max-w-3xl mx-auto mt-10 space-y-6">
      {posts?.data.map((post: any) => (
        <div key={post._id} className="bg-white shadow-md rounded-lg overflow-hidden">
          {/* Header: User Info */}
          <button>
            <Link href={`/userProfile/${post?.user?._id}`}>
              <div className="flex items-center p-4">
                <Avatar
                  isBordered
                  radius="full"
                  size="md"
                  src={post?.user?.profilePhoto || '/default-avatar.png'}
                />
                <div className="ml-4">
                  <h4 className="font-semibold text-lg">
                    {post?.user?.name || 'Unknown User'}
                  </h4>
                  <span className="text-sm text-gray-500">
                    {post?.user?.email || 'No email provided'}
                  </span>
                </div>
              </div>
            </Link>
          </button>

          {/* Post Content */}
          <div className="p-4">
            <p className="text-gray-700">{post.title}</p>
            {/* Image Gallery */}
            {post.images.length > 0 && (
              <div className="mt-4">
                <ImageGallery images={post.images} />
              </div>
            )}
          </div>

          {/* Comments Section */}
          <div className="p-4 border-t border-gray-200 text-sm">
            <h5 className="font-semibold pb-5">Comments</h5>
            <div
              className="space-y-2 text-sm overflow-y-auto"
              style={{ maxHeight: '150px' }} // Limit comments display height
            >
              {post.comments.reverse().map(
                (comment: {
                  _id: string;
                  user: { profilePhoto: any; name: string };
                  createdAt: string | number | Date;
                  comment: string;
                }) => (
                  <div key={comment._id} className="flex items-start space-x-2 border-gray-200 pb-2 mb-2">
                    <Avatar
                      isBordered
                      radius="full"
                      size="md"
                      src={comment.user.profilePhoto || '/default-avatar.png'}
                    />
                    <div className="flex-1">
                      <div className="flex justify-between">
                        <strong className="text-sm font-semibold">{comment.user.name}</strong>
                        <span className="text-xs text-gray-500">
                          {new Date(comment.createdAt).toLocaleString()}
                        </span>
                      </div>
                      <p className="text-gray-800">{comment.comment}</p>
                    </div>
                  </div>
                )
              )}
            </div>
          </div>

          {/* Social Interaction Buttons */}
          <div className="flex justify-between items-center px-4 py-2 border-t border-gray-200">
            <div className="flex gap-2">
              {/* Like Button with count */}
              <button onClick={() => handleLike(post._id)} className="flex items-center gap-2 text-gray-600 hover:bg-gray-100 px-3 py-2 rounded-lg">
                <FaThumbsUp />
                <span>{post.likes.length}</span> {/* Display the count of likes */}
              </button>

              {/* Dislike Button with count */}
              <button onClick={() => handleDislike(post._id)} className="flex items-center gap-2 text-gray-600 hover:bg-gray-100 px-3 py-2 rounded-lg">
                <FaThumbsDown />
                <span>{post.dislikes.length}</span> {/* Display the count of dislikes */}
              </button>
            </div>

            {/* Comment Button */}
            <button
              className="flex items-center gap-2 text-gray-600 hover:bg-gray-100 px-3 py-2 rounded-lg"
              onClick={() => setShowInput(post._id === showInput ? null : post._id)} // Toggle comment input
            >
              <FaCommentAlt />
              <span>Comment</span>
            </button>

            <button className="flex items-center gap-2 text-gray-600 hover:bg-gray-100 px-3 py-2 rounded-lg">
              <FaShare />
              <span>0</span>
            </button>
          </div>

          {/* Comment Input Field */}
          {showInput === post._id && (
            <div className="p-4 border-t border-gray-200">
              <ReactQuill
                theme="snow"
                onChange={setComment}
                placeholder="Write your comment..."
              />
              <div className="flex justify-end mt-2">
                <Button onClick={() => handleCommentSubmit(post._id)}>
                  Post Comment
                </Button>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
