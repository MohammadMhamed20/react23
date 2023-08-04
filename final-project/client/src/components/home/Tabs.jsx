import React from "react";

const Tabs = ({ activeTab, setActiveTab }) => {
  return (
    <div className="shadow-md shadow-dark/10 bg-light-dark flex items-center justify-between rounded-2xl">
      <button
        className={`w-full py-4 text-sm cursor-pointer uppercase ${
          activeTab === 1
            ? "border-primary text-black"
            : "border-transparent text-dark bg-white"
        } border-b-2 border-primary rounded-tl-2xl rounded-bl-2xl`}
        onClick={() => setActiveTab(1)}
      >
        feed
      </button>
      <button
        className={`w-full py-4 text-sm cursor-pointer uppercase ${
          activeTab === 2
            ? "border-primary text-black"
            : "border-transparent text-dark bg-white"
        } border-b-2`}
        onClick={() => setActiveTab(2)}
      >
        people
      </button>
      <button
        className={`w-full py-4  text-sm cursor-pointer uppercase ${
          activeTab === 3
            ? "border-primary text-black"
            : "border-transparent text-dark bg-white"
        } border-b-2 rounded-tr-2xl rounded-br-2xl`}
        onClick={() => setActiveTab(3)}
      >
        trending
      </button>
    </div>
  );
};

export default Tabs;
