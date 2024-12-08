import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import { useParams } from "react-router-dom";
import axios from "axios";
import { setAuthUser } from "@/redux/authSlice";
import { toast } from "sonner";

const Profile = () => {
  const { id } = useParams();
  const { userProfile, user } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const [isFollowing, setIsFollowing] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (userProfile && user) {
      // Check if the logged-in user is already following this profile
      setIsFollowing(userProfile.followers.includes(user._id));
    }
  }, [userProfile, user]);

  const handleFollowUnfollow = async () => {
    try {
      setLoading(true);
      const res = await axios.post(
        `https://snapesharing.onrender.com/api/v1/user/follow/${id}`,
        {},
        { withCredentials: true }
      );

      if (res.data.success) {
        // After follow/unfollow, update the state
        setIsFollowing((prev) => !prev);
        // Optionally, update the logged-in user's followers/following list
        dispatch(setAuthUser(res.data.user));
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="profile-container">
      <section className="profile-info">
        <div className="avatar-info">
          <Avatar>
            <AvatarImage src={userProfile?.profilePicture} alt="User profile" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <div>
            <h1>{userProfile?.username}</h1>
            <p>{userProfile?.bio || "No bio available"}</p>
          </div>
        </div>

        <Button onClick={handleFollowUnfollow} disabled={loading}>
          {loading ? "Please wait..." : isFollowing ? "Unfollow" : "Follow"}
        </Button>
      </section>

      {/* Render the user's posts or other tabs */}
      <section className="tabs">
        {/* Tab contents based on the selected tab */}
      </section>
    </div>
  );
};

export default Profile;
