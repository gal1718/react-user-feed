import React from "react";
//import BasicSelect from "../BasicSelect/BasicSelect";
import { Link } from "react-router-dom";
import { SxProps } from "@mui/material/styles";
import { type Post, type Comment, type User } from "../../utils/typeAndData";
import CommentComp from "../Comment/Comment";
import { GetUserInteractionMode, getTotalLikes } from "../../utils/utilsFunctions";

const sortStyle: SxProps = {
  marginRight: "55%",
  ".MuiSelect-root": {
    fontSize: "0.8rem",
    height: "30px",
    width: "120px",
    color: "blue",
  },
  ".MuiMenuItem-root": {
    fontSize: "0.8rem",
    color: "blue",
  },
};

const Comments = ({
  post,
  posts,
  comments,
  user,
  handleSetPosts
}: {
  post: Post;
  posts: Post[];
  comments: Comment[];
  user: User;
  handleSetPosts: (newPosts: Post[]) => void;
}) => {
  
  console.log(
    "comments comp render. comments are: " + JSON.stringify(comments)
  );
  return (
    <div className="Posts">
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: "5%",
        }}
      >
        {comments?.map((comment, index) => (
          <CommentComp
            posts={posts}
            mode={GetUserInteractionMode(comment,user)}
            totalLikes={getTotalLikes(comment)}
            key={index}
            post={post}
            comment={comment}
            user={user}
            handleSetPosts={handleSetPosts}
          ></CommentComp>
        ))}
      </div>
    </div>
  );
};

export default Comments;
