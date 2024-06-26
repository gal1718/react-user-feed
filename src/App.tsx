import React, { useState, useEffect } from "react";
import "./App.css";
import Posts from "./Components/Posts/Posts";
import PostDetailed from "./Components/PostDetailed/PostDetailed";
import AppBarComp from "./Components/AppBar/AppBar";
import {
  Post,
  User,
  createRandomUser,
  createRandomPost,
} from "./utils/typeAndData";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { faker } from "@faker-js/faker";

const App = () => {
  console.log("App component render");

  const LoggedUser = {
    id: "87819d35-6a5f-4d49-ba0f-982c332ad36c",
    avatar: faker.image.avatar(),
    birthday: faker.date.birthdate(),
    email: "Gal.Stroman44@yahoo.com",
    firstName: "Gal",
    lastName: "Stroman",
    user_name: "Gal Stroman",
    sex: "male",
  };

  const [users, setUsers] = useState<User[]>([]);
  const [posts, setPosts] = useState<Post[]>([]);

  // const {
  //   content: posts,
  //   likeClicked,
  //   dislikeClicked,
  //   setContent: setPosts,
  // } = useContentInteractions<Post>([], initialUser, "posts");

  useEffect(() => {
    const storedUsers = localStorage.getItem("users");
    const storedPosts = localStorage.getItem("posts");

    if (storedUsers && storedPosts) {
      setUsers(JSON.parse(storedUsers));
      const sortedPosts = JSON.parse(storedPosts).sort((a: Post, b: Post) =>
        (a.published_at || 0) < (b.published_at || 0) ? 1 : -1
      );
      setPosts(sortedPosts);
    } else {
      const generatedUsers = Array.from({ length: 10 }, createRandomUser);
      generatedUsers.push(LoggedUser);
      console.log("users: " + JSON.stringify(generatedUsers));
      setUsers(generatedUsers);
      localStorage.setItem("users", JSON.stringify(generatedUsers));

      const generatedPosts = generatedUsers.flatMap((user) =>
        Array.from({ length: 5 }, () => createRandomPost(user.id))
      );
      const sortedPosts = generatedPosts.sort((a, b) =>
        (a.published_at || 0) < (b.published_at || 0) ? 1 : -1
      );
      console.log("sortedPosts: " + JSON.stringify(sortedPosts));

      setPosts(sortedPosts);
      localStorage.setItem("posts", JSON.stringify(sortedPosts));
    }
  }, []);

  const handleSetPosts = (newPosts: Post[]) => {
    localStorage.setItem("posts", JSON.stringify(newPosts));
    setPosts(newPosts);
  };

  return (
    <div className="App" style={{ display: "flex", flexDirection: "column" }}>
      <AppBarComp />
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              <Posts
                posts={posts}
                handleSetPosts={handleSetPosts}
                users={users}
                LoggedUser={LoggedUser}
              />
            }
          />
          <Route
            path="/PostDetailed/:postId"
            element={
              <PostDetailed
                posts={posts}
                handleSetPosts={handleSetPosts}
                users={users}
                LoggedUser={LoggedUser}
              />
            }
          />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
