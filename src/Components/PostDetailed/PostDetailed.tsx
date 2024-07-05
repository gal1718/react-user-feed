import * as React from "react";
import { useParams } from "react-router-dom";
import { type Post, type User, type Comment, Mode } from "../../utils/typeAndData";
import Comments from "../Comments/comments";
import PostComp from "../Post/Post";
import "./PostDetailed.css";
import { faker } from "@faker-js/faker";
import { GetUserInteractionMode, getTotalLikes } from "../../utils/utilsFunctions";
import TextEditor from "../TextEditor/TextEditor";
import { useState } from "react";

const PostDetailed = ({
  posts,
  handleSetPosts,
  users,
  LoggedUser,
}: {
  posts: Post[];
  handleSetPosts: (newPosts: Post[]) => void;
  users: User[];
  LoggedUser: User;
}) => {
  
  const { postId } = useParams<{ postId: string }>();
  const [commentHtmlStr, setCommentHtmlStr] = useState<string>("");
  const post = posts.find((postItem) => postItem.id === postId) as Post;//using the update post from the updated posts instead of the post from nthe llocation/new state
  //const location = useLocation();
  ////const { post } = location.state;
  //const [editPost, setEditPost] = useState<Post>(post);
  //console.log("postDetails Comp render editpost: " + JSON.stringify(editPost));

  const handleCommentAddition = () => {
    if (!post) return;

    const newComment: Comment = {
      user_id: LoggedUser.id,
      body: commentHtmlStr,
      comments: undefined,
      id: faker.string.uuid(),
      published_at: Date.now().toString(),
    };

    const updatedComments = [...(post.comments ?? []), newComment];
    const newPost = { ...post, comments: updatedComments };
    //console.log("new post is: " + JSON.stringify(newPost));
    
    const newPosts = posts.map((postItem) => {
      if (postItem.id != post!.id) return postItem;
      else return newPost;
    });
    //console.log("newPosts: " + JSON.stringify(newPosts));
    //setEditPost(newPost);//comments appears vuz editpost is updated
    handleSetPosts(newPosts);
    
  };

  if (!post) return <div>Loading...</div>;

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "15px",
      }}
      key={post!.id}
      className="PostDetailed"
    >
      <PostComp
        post={post}
        posts={posts}
        LoggedUser={LoggedUser}
        users={users}
        handleSetPosts={handleSetPosts}
        mode={GetUserInteractionMode(post,LoggedUser)}
        totalLikes={getTotalLikes(post)}
      ></PostComp>

      <TextEditor onChange={setCommentHtmlStr}></TextEditor>

      <button onClick={() => handleCommentAddition()}>Comment</button>
      {post.comments && (
        <Comments
          post={post}
          users={users}
          posts={posts}
          LoggedUser={LoggedUser}
          comments={post.comments}
          handleSetPosts={handleSetPosts}
        ></Comments>
      )}
    </div>
  );
};

export default PostDetailed;
