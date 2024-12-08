import React, { useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { Button } from './ui/button';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';
import { setAuthUser } from '@/redux/authSlice';

const EditProfile = () => {
  const { user } = useSelector((state) => state.auth);
  const [input, setInput] = useState({
    profilePhoto: user?.profilePicture,
    bio: user?.bio,
    gender: user?.gender,
  });
  const [loading, setLoading] = useState(false);
  const imageRef = useRef();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const fileChangeHandler = (e) => {
    const file = e.target.files?.[0];
    if (file) setInput({ ...input, profilePhoto: file });
  };

  const selectChangeHandler = (value) => {
    setInput({ ...input, gender: value });
  };

  const editProfileHandler = async () => {
    const formData = new FormData();
    formData.append('bio', input.bio);
    formData.append('gender', input.gender);
    if (input.profilePhoto) {
      formData.append('profilePhoto', input.profilePhoto);
    }

    try {
      setLoading(true);
      const res = await axios.post(
        'https://snapesharing.onrender.com/api/v1/user/profile/edit',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
          withCredentials: true,
        }
      );

      if (res.data.success) {
        dispatch(setAuthUser(res.data.user));
        navigate(`/profile/${user?._id}`);
        toast.success(res.data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Something went wrong!');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="edit-profile-container">
      <h1>Edit Profile</h1>
      <input
        ref={imageRef}
        onChange={fileChangeHandler}
        type="file"
        className="hidden"
      />
      <Button onClick={() => imageRef?.current.click()}>Change photo</Button>
      <textarea
        value={input.bio}
        onChange={(e) => setInput({ ...input, bio: e.target.value })}
      />
      <select
        value={input.gender}
        onChange={(e) => selectChangeHandler(e.target.value)}
      >
        <option value="male">Male</option>
        <option value="female">Female</option>
      </select>
      <Button onClick={editProfileHandler} disabled={loading}>
        {loading ? 'Saving...' : 'Submit'}
      </Button>
    </div>
  );
};

export default EditProfile;
