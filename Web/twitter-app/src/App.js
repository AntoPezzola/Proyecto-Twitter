import React, { useEffect } from "react";
import "bootstrap/dist/css/bootstrap.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./componets/Login";
import Home from "./componets/Home";
import Register from "./componets/Register";
import User from "./componets/User";
import UserHome from "./componets/UserHome";
import TweetDisplay from "./componets/TweetDisplay";
import TrendingTopics from "./componets/TrendingTopics";
import Search from "./componets/Search";


const App = () => {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/user/:id" element={<User />} />
        <Route path="/user/" element={<UserHome />} />
        <Route path="/tweet/:idTw" element={<TweetDisplay />} />
        <Route path="/trendingTopics" element={<TrendingTopics />} />
        <Route path="/search" element={<Search />} />

      </Routes>
    </Router>
  );
};

export default App;
