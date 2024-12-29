"use client";

import React from "react";
import Layout from "./components/layout";
import Playground from "./views/playground";

const Home: React.FC = () => {
  return (
    <div>
      <Layout>
        <Playground/>
      </Layout>
    </div>
  );
};

export default Home;
