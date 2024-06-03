import "./App.css";
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Posts from "./Components/Posts/Posts";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Posts />}>
            Home
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
