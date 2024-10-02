'use client'
import { useGetSingleuser } from '@/src/hooks/user.hook';
import { Avatar, Button, Card, CardBody, CardFooter, CardHeader } from '@nextui-org/react';
import { useParams } from 'next/navigation'
import React from 'react'

export default function UserProfile() {

    const params = useParams();

    const id = params.id;


    const { data: user, isLoading, error } = useGetSingleuser(id as string);

    const userInfo = user?.data;



    return (
        <div className="max-w-5xl mx-auto p-4">
            <Card className="max-w-[640px] mx-auto"> {/* Center the card */}
                <CardHeader className="justify-between">
                    <div className="flex gap-5">
                        <Avatar
                            isBordered
                            radius="full"
                            size="md"
                            src={userInfo?.profilePhoto || "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"}
                        />
                        <div className="flex flex-col gap-1 items-start justify-center">
                            <h4 className="text-small font-semibold leading-none text-default-600">{userInfo?.name || "Unknown User"}</h4>
                            <h5 className="text-small tracking-tight text-default-400">{userInfo?.email || "No email available"}</h5>
                        </div>
                    </div>
                    <Button
                        // className={isFollowed ? "bg-transparent text-foreground border-default-200" : ""}
                        color="primary"
                        radius="full"
                        size="sm"
                        // variant={isFollowed ? "bordered" : "solid"}
                        // onPress={() => setIsFollowed(!isFollowed)}
                    >
                        {/* {isFollowed ? "Unfollow" : "Follow"} */}
                        Follow
                    </Button>
                </CardHeader>
                <CardBody className="px-3 py-0 text-small text-default-400">
                    <p>
                        {userInfo?.bio || "No bio available."}
                    </p>
                    <span className="pt-2">
                        {userInfo?.interests || "No interests listed."}
                        <span className="py-2" aria-label="computer" role="img">
                            💻
                        </span>
                    </span>
                </CardBody>
                <CardFooter className="gap-3">
                    <div className="flex gap-1">
                        <p className="font-semibold text-default-400 text-small">4</p>
                        <p className="text-default-400 text-small">Following</p>
                    </div>
                    <div className="flex gap-1">
                        <p className="font-semibold text-default-400 text-small">97.1K</p>
                        <p className="text-default-400 text-small">Followers</p>
                    </div>
                </CardFooter>
            </Card>
        </div>
    )
}
