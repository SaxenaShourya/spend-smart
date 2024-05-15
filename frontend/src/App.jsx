import React from "react";
import { Routes, Route } from "react-router-dom";

import TopLoadingBar from "./components/TopLoadingBar";
import { Home, NotFound } from "./pages";

const App = () => {
  return (
    <>
      <TopLoadingBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
};

export default App;
