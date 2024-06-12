//import React from "react";
import * as React from "react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { type Post, type User, type Comment } from "../../utils/dataUtils";
import Comments from "../Comments/comments";
import PostComp from "../Post/Post";
//import MDEditor, { ContextStore } from "@uiw/react-md-editor";


const PostDetailed = ({
  posts,
  setPosts,
  userDisLikes,
  userLikes,
  addLikeClicked,
  removeLikeClicked,
  users,
  setUserCommentsLikes,
  setUserCommentsDisLikes,
  userCommentsLikes,
  userCommentsDisLikes

}: {
  setUserCommentsLikes: React.Dispatch<React.SetStateAction<Comment[]>>,
  setUserCommentsDisLikes: React.Dispatch<React.SetStateAction<Comment[]>>,
  userCommentsLikes: Comment[],
  userCommentsDisLikes: Comment[],
  posts: Post[];
  setUserDisLikes: React.Dispatch<React.SetStateAction<Post[]>>;
  setPosts: React.Dispatch<React.SetStateAction<Post[]>>;
  userLikes: Post[];
  userDisLikes: Post[];
  selectedPost: Post;
  removeLikeClicked: (postId: string) => void;
  users: User[];
  addLikeClicked: (postId: string) => void;
}) => {
  //const [userCommentText, setUserCommentText] = useState<string>("");
  const { postId } = useParams<{ postId: string }>();
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [value, setValue] = useState<string>("");

  useEffect(() => {
    const post = posts.find((post) => post.id === postId);
    if (post) {
      setSelectedPost(post);
    }
  }, []);

  const handleCommentAddition = () => {
    if (!selectedPost) return;
    //set the posts with the new comment in the selected post
    //debugger;
    const newComment: Comment = {
      user_id: "123",
      body: value,
      comments: undefined,
      id: "",
      published_at: Date.now().toString(),
      likes: 0,
    };
    const newPosts = posts.map((post) => {
      if (post.id != selectedPost!.id) return post;
      else {
        const updatedComments = [...(post.comments ?? []), newComment];
        const newPost = { ...post, comments: updatedComments };
        return newPost;
      }
    });

    setSelectedPost({
      ...selectedPost!,
      comments: [...(selectedPost!.comments ?? []), newComment],
    });
    setPosts(newPosts);
  };

  if (!selectedPost) return <div>Loading...</div>;

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "15px",
      }}
      key={selectedPost!.id}
      className="PostDetailed"
    >
      <div>
        <PostComp
          userLikes={userLikes}
          userDisLikes={userDisLikes}
          post={selectedPost!}
          removeLikeClicked={removeLikeClicked}
          addLikeClicked={addLikeClicked}
          users={users}
        ></PostComp>
        <div>
          <input
            placeholder="add a comment"
            type="text"
            onChange={(el) => setValue(el.target.value)}
          ></input>
          <button onClick={() => handleCommentAddition()}>Comment</button>
          <Comments
            post={selectedPost}
            comments={selectedPost!.comments}
            users={users}
            userCommentsLikes={userCommentsLikes}
            userCommentsDisLikes={userCommentsDisLikes}
            setUserCommentsLikes={setUserCommentsLikes}
            setUserCommentsDisLikes = {setUserCommentsDisLikes}
  
          ></Comments>
        </div>
      </div>
    </div>
  );
};

export default PostDetailed;
