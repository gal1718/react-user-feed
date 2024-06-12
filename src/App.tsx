import React, { useState, useEffect } from "react";
import "./App.css";
import Posts from "./Components/Posts/Posts";
import PostDetailed from "./Components/PostDetailed/PostDetailed";
import AppBarComp from "./Components/AppBar/AppBar";
import {
  type Post,
  type User,
  type SortKey,
  type Comment,
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
  const [userCommentsLikes, setUserCommentsLikes] = useState<Comment[]>([]);
  const [userCommentsDisLikes, setUserCommentsDisLikes] = useState<Comment[]>([]);

  useEffect(() => {
    const generatedUsers = Array.from({ length: 10 }, createRandomUser);
    setUsers(generatedUsers);

    // Generate posts for each user
    const generatedPosts = generatedUsers.flatMap((user) =>
      Array.from({ length: 5 }, () => createRandomPost(user.id))
    );
    setPosts(generatedPosts);
  }, []);

  const addLikeClicked = (contentId: string) => {
    //3 cases
    //userLikes- 0, userDislikes - 0
    if (!userLikedPostBefore(contentId) && !userDisLikedPostBefore(contentId)) {
      addUserLike(contentId);
      changePostLikes(1, contentId);
    }
    //userLikes- 0, userDislikes - 1
    else if (!userLikedPostBefore(contentId) && userDisLikedPostBefore(contentId)) {
      addUserLike(contentId);
      removeUserDisLike(contentId);
      changePostLikes(2, contentId);
    }
    //userLikes- 1, userDislikes - 0
    else {
      removeUserLike(contentId);
      changePostLikes(-1, contentId);
    }
  };

  const removeLikeClicked = (contentId: string) => {
    //3 cases
    //userLikes- 0, userDislikes - 0
    if (!userLikedPostBefore(contentId) && !userDisLikedPostBefore(contentId)) {
      addUserDisLike(contentId);
      changePostLikes(-1, contentId);
    }
    //userLikes- 0, userDislikes - 1
    else if (!userLikedPostBefore(contentId) && userDisLikedPostBefore(contentId)) {
      //console.log("userLikes- 0, userDislikes - 1");
      removeUserDisLike(contentId);
      changePostLikes(1, contentId);
    }
    //userLikes- 1, userDislikes - 0
    else {
      removeUserLike(contentId);
      addUserDisLike(contentId);
      changePostLikes(-2, contentId);
    }
  };

  const removeUserLike = (contentId: string) => {
    const newUserLikes = userLikes.filter((userLike) => userLike.id != contentId);
    setUserLikes(newUserLikes);
  };

  const addUserLike = (contentId: string) => {
    posts.forEach((post) => {
      if (post.id === contentId) {
        setUserLikes([...userLikes, post]); // adding the post to the user's likes
      }
    });
  };

  const removeUserDisLike = (contentId: string) => {
    const newUserDisLikes = userDisLikes.filter(
      (userDisLike) => userDisLike.id != contentId
    );
    setUserDisLikes(newUserDisLikes);
  };

  const addUserDisLike = (contentId: string) => {
    posts.forEach((post) => {
      if (post.id === contentId) {
        setUserDisLikes([...userDisLikes, post]); // adding the post to the user's Dislikes
      }
    });
  };

  const changePostLikes = (likes: number, contentId: string) => {
    let newNumberLikes = 0;
    const newPosts = posts.map((post) => {
      if (post.id != contentId) return post;
      else {
        newNumberLikes = post.likes + likes;
        return { ...post, likes: post.likes + likes };
      }
    });
    setPosts(newPosts);
    setSelectedPost({ ...selectedPost, likes: newNumberLikes });
  };

  const userLikedPostBefore = (contentId: string) => {
    return userLikes.some((LikEl) => LikEl.id === contentId);
  };

  const userDisLikedPostBefore = (contentId: string) => {
    return userDisLikes.some((LikEl) => LikEl.id === contentId);
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
            path="/PostDetailed/:contentId"
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
                userCommentsLikes = {userCommentsLikes}
                setUserCommentsLikes = {setUserCommentsLikes}
                userCommentsDisLikes = {userCommentsDisLikes}
                setUserCommentsDisLikes = {setUserCommentsDisLikes}
              />
            }
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
