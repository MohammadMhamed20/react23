import React from "react";
import User from "../../shared/User";

const Peoples = () => {
  return (
    <div className="mt-6">
      <h3 className="mb-3 text-sm">Follow People</h3>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-[6px]">
        <User image="1" position="Designer" name="Konex" />
        <User image="2" position="Designer" name="Konex" />
        <User image="3" position="Designer" name="Konex" />
        <User image="4" position="Designer" name="Konex" />
      </div>
    </div>
  );
};

export default Peoples;
