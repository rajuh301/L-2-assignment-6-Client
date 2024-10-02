"use client";

import { Divider } from "@nextui-org/divider";
import { Button } from "@nextui-org/button";
import {
    FieldValues,
    FormProvider,
    SubmitHandler,
    useForm,
} from "react-hook-form";
import { allDistict } from "@bangladeshi/bangladesh-address";
import { ChangeEvent, useState } from "react";

// import { AddIcon, TrashIcon } from "@/src/assets/icons";
import { useRouter } from "next/navigation";

import FXTextarea from "@/src/components/form/FXTextArea";
import Loading from "@/src/components/UI/Loading";
import { useUser } from "@/src/contex/user.provider";
import { useCreatePost } from "@/src/hooks/post.hook";



export default function CreatePost() {
    const [imageFiles, setImageFiles] = useState<File[] | []>([]);
    const [imagePreviews, setImagePreviews] = useState<string[] | []>([]);

    const router = useRouter();

    const {
        mutate: handleCreatePost,
        isPending: createPostPending,
        isSuccess,
    } = useCreatePost();

    const { user } = useUser();


    const methods = useForm();

    const { handleSubmit } = methods;


    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        const formData = new FormData();

        const postData = {
            ...data,
            user: user!._id,
        };

        formData.append("data", JSON.stringify(postData));

        for (let image of imageFiles) {
            formData.append("itemImages", image);
        }

        handleCreatePost(formData);
    };

    const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files![0];

        setImageFiles((prev) => [...prev, file]);

        if (file) {
            const reader = new FileReader();

            reader.onloadend = () => {
                setImagePreviews((prev) => [...prev, reader.result as string]);
            };

            reader.readAsDataURL(file);
        }
    };

    if (!createPostPending && isSuccess) {
        router.push("/");
    }



    return (
        <>
            {createPostPending && <Loading />}
            <div className="h-full rounded-xl bg-gradient-to-b from-default-100 px-[73px] py-12">
                <h1 className="text-2xl font-semibold">What's on your mind! </h1>
                <Divider className="mb-5 mt-3" />
                <FormProvider {...methods}>
                    <form onSubmit={handleSubmit(onSubmit)}>


                        <div className="flex flex-wrap-reverse gap-2 py-2">
                            <div className="min-w-fit flex-1">
                                <FXTextarea label="Write a text from your pet!" name="title" />
                            </div>
                        </div>


                        {imagePreviews.length > 0 && (
                            <div className="flex gap-5 my-5 flex-wrap">
                                {imagePreviews.map((imageDataUrl) => (
                                    <div
                                        key={imageDataUrl}
                                        className="relative size-48 rounded-xl border-2 border-dashed border-default-300 p-2"
                                    >
                                        <img
                                            alt="item"
                                            className="h-full w-full object-cover object-center rounded-md"
                                            src={imageDataUrl}
                                        />
                                    </div>
                                ))}
                            </div>
                        )}


                        <div className="flex flex-wrap gap-2 py-2">
                            <div className="min-w-fit flex-1">
                                <label
                                    className="flex h-14 w-full cursor-pointer items-center justify-center rounded-xl border-2 border-default-200 text-default-500 shadow-sm transition-all duration-100 hover:border-default-400"
                                    htmlFor="image"
                                >
                                    Upload image
                                </label>
                                <input
                                    multiple
                                    className="hidden"
                                    id="image"
                                    type="file"
                                    onChange={(e) => handleImageChange(e)}
                                />
                            </div>
                        </div>



                        <div className="flex justify-end">
                            <Button size="lg" type="submit">
                                Post
                            </Button>
                        </div>
                    </form>
                </FormProvider>
            </div>
        </>
    );
}
