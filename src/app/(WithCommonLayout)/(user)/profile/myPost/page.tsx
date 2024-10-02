'use client'
import { FaThumbsUp, FaCommentAlt, FaShare, FaThumbsDown, FaTrash, FaEdit } from 'react-icons/fa';
import { Avatar, button, Button } from '@nextui-org/react';
import { AwaitedReactNode, JSXElementConstructor, Key, ReactElement, ReactNode, ReactPortal, useState } from 'react';
import { IPost } from '@/src/types';
import ImageGallery from '@/src/components/UI/imageGallery';
import Loading from '@/src/components/UI/Loading';
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure } from "@nextui-org/react";
import { useForm, FormProvider } from 'react-hook-form';
import FXTextarea from '@/src/components/form/FXTextArea';
import { deleteProduct } from '@/src/services/post';
import { useGetPostByUser } from '@/src/hooks/getPost.hook';

export default function MYPostPage() {

  //  ----------------------------------
  const { data: posts, isLoading } = useGetPostByUser();


  console.log(posts)


  //  ----------------------------------

  // useForm initialization
  const methods = useForm(); // Initialize the useForm hook here

  // -------------- Modal------------------
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [backdrop, setBackdrop] = useState('blur');


  const handleOpen = (backdrop: React.SetStateAction<string>) => {
    setBackdrop(backdrop);
    onOpen();
  };


  // -------------- Modal------------------

  // --------------- form submit handler ---------
  const onSubmit = (data: any) => {
    const formData = new FormData();
    formData.append("title", data.title);
    console.log(formData);
  };



  // ------------- Handle delete ------------


  const handleDelete = async (_id: string | undefined) => {
    await deleteProduct(_id);

  }

  // ------------- Handle delete ------------



  return (
    <div>
      {isLoading && <Loading />}

      {
        posts ?


          <div className="max-w-3xl mx-auto mt-10 space-y-6">
            {posts?.map((post: { _id: string | undefined; user: any; title: ReactNode; images: any; post: IPost }) => (
              <div key={post._id} className="bg-white shadow-md rounded-lg overflow-hidden">
                {/* Header: User Info and Dropdown */}
                <div className="flex items-center justify-between p-4">
                  <div className="flex items-center">
                    <Avatar
                      isBordered
                      radius="full"
                      size="md"
                      src={post?.user?.avatar || '/default-avatar.png'}
                    />
                    <div className="ml-4">
                      <h4 className="font-semibold text-lg">{post?.user?.name || 'Unknown User'}</h4>
                      <span className="text-sm text-gray-500">{post?.user?.email || 'No email provided'}</span>
                    </div>
                  </div>

                  <div className="ml-auto">

                    <div className='flex gap-2'>

                      <button className='text-ye' onClick={() => handleOpen(posts)}><FaEdit /></button>

                      <button className='text-red-500' onClick={() => handleDelete(post._id)}><FaTrash /></button>

                    </div>


                  </div>
                </div>

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
                    <Button className="flex items-center gap-2 text-gray-600 hover:bg-gray-100 px-3 py-2 rounded-lg">
                      <FaThumbsUp />
                      <span>0</span>
                    </Button>

                    <Button className="flex items-center gap-2 text-gray-600 hover:bg-gray-100 px-3 py-2 rounded-lg">
                      <FaThumbsDown />
                      <span>0</span>
                    </Button>
                  </div>

                  <Button className="flex items-center gap-2 text-gray-600 hover:bg-gray-100 px-3 py-2 rounded-lg">
                    <FaCommentAlt />
                    <span>Comment</span>
                  </Button>

                  <Button className="flex items-center gap-2 text-gray-600 hover:bg-gray-100 px-3 py-2 rounded-lg">
                    <FaShare />
                    <span>0</span>
                  </Button>
                </div>
              </div>
            ))}
          </div>

          : <p className='text-2xl text-center h-screen items-center'>"No Data found"</p>
      }
      {/* -------------------Modal---------------------- */}
      <div className="flex flex-wrap gap-3">

      </div>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Edit Post</ModalHeader>
              <ModalBody>
                {/* Using FormProvider to wrap child form components */}
                <FormProvider {...methods}>
                  <form onSubmit={methods.handleSubmit(onSubmit)}>
                    <div className="flex flex-wrap-reverse gap-2 py-2">
                      <div className="min-w-fit flex-1">
                        <FXTextarea label="Write a text from your pet!" name="title" />
                      </div>
                    </div>

                    <ModalFooter>
                      <Button color="danger" variant="light" onPress={onClose}>
                        Close
                      </Button>
                      <Button type="submit" color="primary">
                        Save
                      </Button>
                    </ModalFooter>
                  </form>
                </FormProvider>
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
      {/* -------------------Modal---------------------- */}
    </div>
  );
}
