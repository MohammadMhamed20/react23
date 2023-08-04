import React from "react";
import User from "../../shared/User";

const People = () => {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h3 className="text-sm mb-4">People you can follow</h3>
        <div className="bg-white rounded-2xl shadow-md shadow-dark/10">
          <div className="border-b">
            <User type="list" image="1" name="John Smit" position="Designer" />
          </div>
          <div className="border-b">
            <User type="list" image="2" name="John Smit" position="Designer" />
          </div>
          <div>
            <User type="list" image="3" name="John Smit" position="Designer" />
          </div>
        </div>
      </div>
      <div>
        <h3 className="text-sm mb-4">Popular</h3>
        <div className="bg-white rounded-2xl shadow-md shadow-dark/10">
          <div className="border-b">
            <User type="list" image="1" name="John Smit" position="Designer" />
          </div>
          <div className="border-b">
            <User type="list" image="2" name="John Smit" position="Designer" />
          </div>
          <div>
            <User type="list" image="3" name="John Smit" position="Designer" />
          </div>
        </div>
      </div>
      <div>
        <h3 className="text-sm mb-4">News Papers & Channels</h3>
        <div className="bg-white rounded-2xl shadow-md shadow-dark/10">
          <div className="border-b">
            <User type="list" image="1" name="John Smit" position="Designer" />
          </div>
          <div className="border-b">
            <User type="list" image="2" name="John Smit" position="Designer" />
          </div>
          <div>
            <User type="list" image="3" name="John Smit" position="Designer" />
          </div>
        </div>
      </div>
      <div>
        <h3 className="text-sm mb-4">Politicians</h3>
        <div className="bg-white rounded-2xl shadow-md shadow-dark/10">
          <div className="border-b">
            <User type="list" image="1" name="John Smit" position="Designer" />
          </div>
          <div className="border-b">
            <User type="list" image="2" name="John Smit" position="Designer" />
          </div>
          <div>
            <User type="list" image="3" name="John Smit" position="Designer" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default People;
