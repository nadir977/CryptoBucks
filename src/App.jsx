import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Saved from "./pages/Saved";
import Trending from "./pages/Trending";
import Logo from "./components/Logo";
import Navigation from "./components/Navigation";
import Home from "./pages/Home";



function App() {
  return (
    <BrowserRouter>
      <main className="flex w-full h-full flex-col content-center items-center relative text-white font-nunito">
        <div className="w-screen h-screen bg-gray-900 fixed -z-10"></div>
        <Logo />
        <Navigation />
        <Routes>
          <Route path="/" element={<Home />} /> 
          <Route path="/trending" element={<Trending />} />
          <Route path="/saved" element={<Saved />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;
