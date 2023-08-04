/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { useUpdateProfileMutation } from "../features/auth/authApi";
import useUpdateUser from "../hooks/useUpdateUser";

const EditProfile = () => {
  const { user } = useSelector((state) => state.auth || {});
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [gender, setGender] = useState("");
  const [bio, setBio] = useState("");
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (user?._id) {
      setFirstName(user.firstName);
      setLastName(user.lastName);
      setGender(user.gender);
      setBio(user.bio);
    }
  }, [user]);

  // update user data
  const updateUserData = useUpdateUser();

  // update profile
  const [updateProfile, { data: updatedProfile, isLoading }] =
    useUpdateProfileMutation();

  useEffect(() => {
    if (!isLoading && updatedProfile?._id) {
      toast.success("Profile updated successfully");
      updateUserData(updatedProfile);
    }
  }, [updatedProfile, isLoading]);

  // submit handler
  const submitHandler = (e) => {
    e.preventDefault();

    // check validation
    const validationError = {};

    if (!firstName) {
      validationError.firstName = "First Name is required!!";
    }

    if (!lastName) {
      validationError.lastName = "Last Name is required!!";
    }

    if (!gender) {
      validationError.gender = "Gender is required!!";
    }

    if (Object.keys(validationError).length > 0) {
      return setErrors(validationError);
    }

    updateProfile({
      firstName,
      lastName,
      gender,
      bio,
    });
  };

  return (
    <main>
      <div className="flex items-center gap-4">
        <img
          className="w-[60px] h-[60px] rounded-full"
          src={
            user?.profilePic
              ? process.env.REACT_APP_SERVER_URL + user?.profilePic
              : "/images/users/2.jpg"
          }
          alt="user"
        />
        <div>
          <span className="text-[13px]">WELCOME 👋</span>
          <h3 className="text-2xl">{`${user?.firstName} ${user?.lastName}`}</h3>
        </div>
      </div>

      <div className="p-5 bg-white rounded-2xl shadow-md shadow-dark/10 mt-11">
        <h3 className="text-xl mb-5">Edit Profile</h3>
        <form onSubmit={submitHandler} className="flex flex-col gap-3">
          <div>
            <label htmlFor="">First Name</label>
            <input
              type="text"
              placeholder="Enter your first name"
              className="block w-full py-2 px-3 rounded-lg mt-2 border outline-none focus:ring-1 bg-transparent"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </div>
          {errors?.firstName && (
            <span className="text-red-500">{errors?.firstName}</span>
          )}
          <div>
            <label htmlFor="">Last Name</label>
            <input
              type="text"
              placeholder="Enter your last name"
              className="block w-full py-2 px-3 rounded-lg mt-2 border outline-none focus:ring-1 bg-transparent"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>
          {errors?.lastName && (
            <span className="text-red-500">{errors?.lastName}</span>
          )}
          <div>
            <label htmlFor="">Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              className="block w-full py-2 px-3 rounded-lg mt-2 border outline-none focus:ring-1 bg-transparent"
              value={user?.email}
              disabled
            />
          </div>
          <div>
            <label htmlFor="">Gender</label>
            <div className="flex itece gap-3">
              <div className="flex items-center gap-2">
                <input
                  type="radio"
                  name="gender"
                  id="male"
                  value="male"
                  checked={gender === "male"}
                  onChange={(e) => setGender(e.target.value)}
                />
                <label className="text-sm" htmlFor="male">
                  Male
                </label>
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="radio"
                  name="gender"
                  id="female"
                  value="female"
                  checked={gender === "female"}
                  onChange={(e) => setGender(e.target.value)}
                />
                <label className="text-sm" htmlFor="female">
                  Female
                </label>
              </div>
            </div>
            {errors?.gender && (
              <span className="text-red-500">{errors?.gender}</span>
            )}
          </div>
          <div>
            <label htmlFor="">Bio</label>
            <textarea
              type="text"
              placeholder="Enter your bio"
              className="block w-full py-2 px-3 rounded-lg mt-2 border outline-none focus:ring-1 h-32 bg-transparent"
              value={bio}
              onChange={(e) => setBio(e.target.value)}
            />
          </div>

          <button className="py-4 bg-primary text-white uppercase  rounded-lg mt-2 font-bold transition-all hover:bg-blue-900">
            save
          </button>
        </form>
      </div>
    </main>
  );
};

export default EditProfile;
