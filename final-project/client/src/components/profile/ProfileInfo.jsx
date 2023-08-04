import moment from "moment/moment";
import React from "react";
import { AiOutlineLink } from "react-icons/ai";
import { SlCalender } from "react-icons/sl";
import { TiTick } from "react-icons/ti";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const ProfileInfo = () => {
  const { user } = useSelector((state) => state.auth || {});

  return (
    <section className="bg-white p-3 rounded-2xl shadow-md shadow-dark/10">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <img
            src={
              user?.profilePic
                ? process.env.REACT_APP_SERVER_URL + user?.profilePic
                : "/images/users/2.jpg"
            }
            className="w-16 h-16 rounded-full"
            alt="user"
          />
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-base leading-3">{`${user?.firstName} ${user?.lastName}`}</h3>
              <div className="w-[14px] h-[14px] rounded-full bg-primary flex items-center justify-center">
                <TiTick className="text-white text-xs" />
              </div>
            </div>
            <span className="text-xs">
              @
              {`${user?.firstName?.toLowerCase()}-${user?.lastName?.toLowerCase()}`}
            </span>
          </div>
        </div>
        <button>
          <Link
            className="py-2 px-4 rounded-full border border-primary text-sm text-primary transition-all hover:bg-primary hover:text-white"
            to="/edit-profile"
          >
            Edit Profile
          </Link>
        </button>
      </div>

      <p className="mt-4">
        {user?.bio ? user?.bio : <span>Add Your Bio.</span>}
      </p>

      <div className="flex items-center gap-5 mt-5">
        <div className="flex items-center gap-2">
          <AiOutlineLink />
          <Link to="/" className="text-[13px] text-primary">
            profile/shayjordon
          </Link>
        </div>
        <div className="flex items-center gap-2">
          <SlCalender />
          <span className="text-[13px]">
            Joined on {moment(Number(user?.joinedDate)).format("MMM YY")}
          </span>
        </div>
      </div>

      <div className="mt-5 flex items-center gap-20">
        <div>
          <span className="text-[13px]">391k Followers</span>
          <div className="">
            <img
              src="/images/users/1.jpg"
              alt="user"
              className="w-5 h-5 rounded-full border border-white inline-block"
            />
            <img
              src="/images/users/2.jpg"
              alt="user"
              className="w-5 h-5 rounded-full border border-white inline-block"
            />
            <img
              src="/images/users/3.jpg"
              alt="user"
              className="w-5 h-5 rounded-full border border-white inline-block"
            />
            <img
              src="/images/users/4.jpg"
              alt="user"
              className="w-5 h-5 rounded-full border border-white inline-block"
            />
          </div>
        </div>
        <div>
          <span className="text-[13px]">3 Following</span>
          <div className="">
            <img
              src="/images/users/1.jpg"
              alt="user"
              className="w-5 h-5 rounded-full border border-white inline-block"
            />
            <img
              src="/images/users/2.jpg"
              alt="user"
              className="w-5 h-5 rounded-full border border-white inline-block"
            />
            <img
              src="/images/users/3.jpg"
              alt="user"
              className="w-5 h-5 rounded-full border border-white inline-block"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProfileInfo;
