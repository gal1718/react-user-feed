import React, { useState, useEffect } from "react";
import "./App.css";
import Posts from "./Components/Posts/Posts";
import PostDetailed from "./Components/PostDetailed/PostDetailed";
import AppBarComp from "./Components/AppBar/AppBar";
import {
  type Post,
  type User,
  type SortKey,
  createRandomUser,
  createRandomPost,
} from "././utils/dataUtils";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  const [users, setUsers] = useState<User[]>([]);
  const [posts, setPosts] = useState<Post[]>([]);
  const [selectedPost, setSelectedPost] = useState<Post>({
    id: "0",
    user_id: "0",
    title: "0",
    body: "0",
    published_at: "0",
    imageUrl: "0",
    likes: 0,
    comments: undefined,
  }); //change to post | null

  const [userLikes, setUserLikes] = useState<Post[]>([]);
  const [userDisLikes, setUserDisLikes] = useState<Post[]>([]);

  useEffect(() => {
    const generatedUsers = Array.from({ length: 10 }, createRandomUser);
    setUsers(generatedUsers);

    // Generate posts for each user
    const generatedPosts = generatedUsers.flatMap((user) =>
      Array.from({ length: 5 }, () => createRandomPost(user.id))
    );
    setPosts(generatedPosts);
  }, []);

  const addLikeClicked = (postId: string) => {
    //3 cases
    //userLikes- 0, userDislikes - 0
    if (!userLikedPostBefore(postId) && !userDisLikedPostBefore(postId)) {
      addUserLike(postId);
      changePostLikes(1, postId);
    }
    //userLikes- 0, userDislikes - 1
    else if (!userLikedPostBefore(postId) && userDisLikedPostBefore(postId)) {
      addUserLike(postId);
      removeUserDisLike(postId);
      changePostLikes(2, postId);
    }
    //userLikes- 1, userDislikes - 0
    else {
      removeUserLike(postId);
      changePostLikes(-1, postId);
    }
  };

  const removeLikeClicked = (postId: string) => {
    //3 cases
    //userLikes- 0, userDislikes - 0
    if (!userLikedPostBefore(postId) && !userDisLikedPostBefore(postId)) {
      addUserDisLike(postId);
      changePostLikes(-1, postId);
    }
    //userLikes- 0, userDislikes - 1
    else if (!userLikedPostBefore(postId) && userDisLikedPostBefore(postId)) {
      //console.log("userLikes- 0, userDislikes - 1");
      removeUserDisLike(postId);
      changePostLikes(1, postId);
    }
    //userLikes- 1, userDislikes - 0
    else {
      removeUserLike(postId);
      addUserDisLike(postId);
      changePostLikes(-2, postId);
    }
  };

  const removeUserLike = (postId: string) => {
    const newUserLikes = userLikes.filter((userLike) => userLike.id != postId);
    setUserLikes(newUserLikes);
  };

  const addUserLike = (postId: string) => {
    posts.forEach((post) => {
      if (post.id === postId) {
        setUserLikes([...userLikes, post]); // adding the post to the user's likes
      }
    });
  };

  const removeUserDisLike = (postId: string) => {
    const newUserDisLikes = userDisLikes.filter(
      (userDisLike) => userDisLike.id != postId
    );
    setUserDisLikes(newUserDisLikes);
  };

  const addUserDisLike = (postId: string) => {
    posts.forEach((post) => {
      if (post.id === postId) {
        setUserDisLikes([...userDisLikes, post]); // adding the post to the user's Dislikes
      }
    });
  };

  const changePostLikes = (likes: number, postId: string) => {
    let newNumberLikes = 0;
    const newPosts = posts.map((post) => {
      if (post.id != postId) return post;
      else {
        newNumberLikes = post.likes + likes;
        return { ...post, likes: post.likes + likes };
      }
    });
    setPosts(newPosts);
    setSelectedPost({ ...selectedPost, likes: newNumberLikes });
  };

  const userLikedPostBefore = (postId: string) => {
    return userLikes.some((LikEl) => LikEl.id === postId);
  };

  const userDisLikedPostBefore = (postId: string) => {
    return userDisLikes.some((LikEl) => LikEl.id === postId);
  };

  const sort = (objectKey: SortKey) => {
    const sortedList = [...posts].sort((a, b) =>
      (a[objectKey] || 0) < (b[objectKey] || 0) ? 1 : -1
    );
    setPosts(sortedList);
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
                userLikes={userLikes}
                userDisLikes={userDisLikes}
                posts={posts}
                users={users}
                addLikeClicked={addLikeClicked}
                removeLikeClicked={removeLikeClicked}
                sort={sort}
              />
            }
          />
          <Route
            path="/PostDetailed/:postId"
            element={
              <PostDetailed
                posts={posts}
                setPosts={setPosts}
                setUserDisLikes={setUserDisLikes}
                userDisLikes={userDisLikes}
                userLikes={userLikes}
                selectedPost={selectedPost}
                users={users}
                addLikeClicked={addLikeClicked}
                removeLikeClicked={removeLikeClicked}
              />
            }
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
