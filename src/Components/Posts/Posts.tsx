import React from "react";
//import axios from "axios";
import { useEffect, useState } from "react";
import PostComp from "../Post/Post";
import importedPosts from "../../data/posts.json";
//import { hardCodeddImgs } from "../../constans";

type Post = {
  id: string;
  user_id: string;
  title: string;
  body: string;
  likes: number;
  published_at: string;
  imageUrl?: string;
};

const Posts = () => {
  console.log(JSON.stringify(importedPosts));

  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    const dataPromise = new Promise<Post[]>((resolve, reject) => {
      if (importedPosts.length > 0) resolve(importedPosts);
      else reject("data is not available");
    });

    dataPromise
      .then((result) => {
        setPosts(result);
      })
      .catch((err) => console.log(err));
  }, []);

  const addLike = (postId: string) => {
    const newPosts = posts.map((post) =>{
      if(post.id != postId)
        return post
      else
      return {...post,likes: post.likes + 1}
    })

    setPosts(newPosts);
  };

  return (
    <div
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
      className="Posts"
    >
      {posts.map((post) => (
        <PostComp key={post.id} post={post} addLike={addLike}></PostComp>
      ))}
    </div>
  );
};

export default Posts;
