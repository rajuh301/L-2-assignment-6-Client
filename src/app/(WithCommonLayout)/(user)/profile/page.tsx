'use client';

import { Avatar, Button } from '@nextui-org/react';
import { FaEnvelope, FaPhone, FaIdBadge } from 'react-icons/fa';
import { useUser } from '@/src/contex/user.provider';
import { FC } from 'react';
import Loading from '@/src/components/UI/Loading';
import Link from 'next/link';

interface IUser {
  profilePhoto: string;
  _id: string;
  name: string;
  email: string;
  mobileNumber: string;
  role: string;
  avatar?: string;
  status: string;
}

const ProfilePage: FC = () => {
  const { user } = useUser() as { user: IUser | null };

  if (!user) {
    return <Loading />
  }

  return (
    <div className="min-h-screen bg-default-100 py-10 px-4">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
        {/* Profile Header */}
        <div className="flex items-center justify-center bg-gradient-to-r from-blue-500 to-purple-600 h-40">
          <Avatar
            src={user?.profilePhoto || '/default-avatar.png'}
            size="lg"
            isBordered
            color="primary"
          />
        </div>

        <div className='text-end'>
          <Link href={'/profile/myPost'}>
            <Button color='default' className="mt-4 mx-2">
              My Posts
            </Button>
          </Link>

        </div>

        {/* User Info Section */}
        <div className="p-6 text-center">
          <h2 className="text-2xl font-bold text-gray-800">{user?.name || 'Unknown User'}</h2>
          <p className="text-gray-500">{user?.role || 'Role not specified'}</p>
          <Button size="lg" color="default" className="mt-4">
            Edit Profile
          </Button>
        </div>

        {/* User Details */}
        <div className="border-t border-gray-200">
          <dl className="divide-y divide-gray-200">
            <div className="py-4 px-6 flex items-center justify-between">
              <dt className="text-gray-600 font-medium flex items-center gap-2">
                <FaEnvelope className="text-blue-500" /> Email:
              </dt>
              <dd className="text-gray-800">{user?.email}</dd>
            </div>
            <div className="py-4 px-6 flex items-center justify-between">
              <dt className="text-gray-600 font-medium flex items-center gap-2">
                <FaPhone className="text-green-500" /> Mobile:
              </dt>
              <dd className="text-gray-800">{user?.mobileNumber || 'No mobile number provided'}</dd>
            </div>
            <div className="py-4 px-6 flex items-center justify-between">
              <dt className="text-gray-600 font-medium flex items-center gap-2">
                <FaIdBadge className="text-yellow-500" /> Status:
              </dt>
              <dd className="text-gray-800">{user?.status || 'Inactive'}</dd>
            </div>
          </dl>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
