import React, { useState } from "react";
import Tabs from "../components/home/Tabs";
import Feed from "../components/home/feed";
import People from "../components/home/people";
import Trending from "../components/home/trending";

const tabs = {
  1: Feed,
  2: People,
  3: Trending,
};

const Home = () => {
  const [activeTab, setActiveTab] = useState(1);

  const Tab = tabs[activeTab];

  return (
    <main className="relative">
      <Tabs activeTab={activeTab} setActiveTab={setActiveTab} />
      <div className="mt-6">
        <Tab />
      </div>
    </main>
  );
};

export default Home;
