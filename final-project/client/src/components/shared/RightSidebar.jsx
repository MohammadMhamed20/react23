import React from "react";
import { GoLinkExternal, GoSearch } from "react-icons/go";
import User from "./User";

const RightSidebar = () => {
  return (
    <div className="flex flex-col gap-5 pb-8">
      <div className="p-3 rounded-xl shadow-md shadow-dark/10 bg-white flex items-center gap-3">
        <GoSearch className="text-primary text-xl font-bold" />
        <input
          className="block outline-none bg-transparent"
          placeholder="Search user!"
          type="text"
        />
      </div>

      <div className="py-3 rounded-xl shadow-md shadow-dark/10 bg-white">
        <h3 className="text-sm pb-[14px] border-b px-3">What's happening</h3>

        <div className="px-3 py-5 border-b cursor-pointer transition-all hover:bg-gray-200">
          <span className="text-sm font-bold text-dark ">#SelectricsM12</span>
          <p className=" text-[12px]">Buy now with exclusive offers</p>
          <p className="flex items-center gap-2 text-[12px]">
            <GoLinkExternal /> Promoted by Selectrics World
          </p>
        </div>
        <div className="px-3 py-5 border-b cursor-pointer transition-all hover:bg-gray-200">
          <span className="text-sm font-bold text-dark ">#SelectricsM12</span>
          <p className=" text-[12px]">Buy now with exclusive offers</p>
          <p className="flex items-center gap-2 text-[12px]">
            <GoLinkExternal /> Promoted by Selectrics World
          </p>
        </div>
        <div className="px-3 py-5 border-b cursor-pointer transition-all hover:bg-gray-200">
          <span className="text-sm font-bold text-dark ">#SelectricsM12</span>
          <p className=" text-[12px]">Buy now with exclusive offers</p>
          <p className="flex items-center gap-2 text-[12px]">
            <GoLinkExternal /> Promoted by Selectrics World
          </p>
        </div>
        <div className="px-3 py-5 border-b cursor-pointer transition-all hover:bg-gray-200">
          <span className="text-sm font-bold text-dark ">#SelectricsM12</span>
          <p className=" text-[12px]">Buy now with exclusive offers</p>
          <p className="flex items-center gap-2 text-[12px]">
            <GoLinkExternal /> Promoted by Selectrics World
          </p>
        </div>

        <div className="cursor-pointer px-3 pt-3 pb-2">
          <span className="text-sm text-primary block font-medium">
            Show More
          </span>
        </div>
      </div>

      <div className="pt-3 rounded-xl shadow-md shadow-dark/10 bg-white">
        <h3 className="text-sm pb-[14px] border-b px-3">Who to follow</h3>

        <div className="border-b">
          <User type="list" image="1" position="Developer" name="John Smith" />
        </div>
        <div className="border-b">
          <User
            type="list"
            image="2"
            position="UI/UX Designer"
            name="Webartinfo"
          />
        </div>
        <div>
          <User type="list" image="3" position="Designer" name="Konex" />
        </div>
      </div>
    </div>
  );
};

export default RightSidebar;
