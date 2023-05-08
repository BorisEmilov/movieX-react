import React, { useState } from "react";
import Search from "./components/Search";
import { Route, Routes } from "react-router-dom";
import Film from "./components/Film";
import Home from "./components/Home";
import Genre from './components/Genre'
import Loader from "./components/Loader";



function App() {
  return (
    <>
    
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/search" element={<Search />} />
      <Route path="/film/:id" element={<Film />} />
      <Route path="/genre/:id" element={<Genre />} />
    </Routes>
    </>
  );
}

export default App;
