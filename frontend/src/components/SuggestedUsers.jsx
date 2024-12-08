import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { toast } from 'sonner';
import axios from 'axios';

const SuggestedUsers = ({ suggestedUsers }) => {
    const dispatch = useDispatch();

    const handleFollowUnfollow = async (userId, isFollowing) => {
        try {
            const res = await axios.post(
                `https://snapesharing.onrender.com/api/v1/user/follow/${userId}`,
                {},
                { withCredentials: true }
            );

            if (res.data.success) {
                dispatch(setSuggestedUsers(res.data.users));
                toast.success(res.data.message);
            }
        } catch (error) {
            toast.error(error.response?.data?.message || 'Something went wrong');
        }
    };

    return (
        <div className="my-10">
            {suggestedUsers.map((user) => (
                <div key={user._id} className="flex items-center justify-between my-5">
                    <div className="flex items-center gap-2">
                        <Link to={`/profile/${user._id}`}>
                            <Avatar>
                                <AvatarImage src={user.profilePicture} alt="User" />
                                <AvatarFallback>CN</AvatarFallback>
                            </Avatar>
                        </Link>
                        <div>
                            <h1 className="font-semibold text-sm">
                                <Link to={`/profile/${user._id}`}>{user.username}</Link>
                            </h1>
                            <span className="text-gray-600 text-sm">{user.bio || 'Bio here...'}</span>
                        </div>
                    </div>
                    <Button
                        onClick={() => handleFollowUnfollow(user._id, user.isFollowing)}
                    >
                        {user.isFollowing ? 'Unfollow' : 'Follow'}
                    </Button>
                </div>
            ))}
        </div>
    );
};

export default SuggestedUsers;
