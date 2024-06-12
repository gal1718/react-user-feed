import React from "react";
//import BasicSelect from "../BasicSelect/BasicSelect";
import { Link } from "react-router-dom";
import { SxProps } from "@mui/material/styles";
import { type Post, type Comment , type User } from "../../utils/dataUtils";
import CommentComp from "../Comment/Comment";

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

const Comments = ({ setUserCommentsLikes, setUserCommentsDisLikes,userCommentsLikes, userCommentsDisLikes, post, comments, users }: { setUserCommentsLikes: React.Dispatch<React.SetStateAction<Comment[]>>,
    setUserCommentsDisLikes: React.Dispatch<React.SetStateAction<Comment[]>>,
    userCommentsLikes: Comment[],
    userCommentsDisLikes: Comment[],post: Post; comments: Comment[] | undefined, users: User[]}) => {
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
          <CommentComp key={index} post={post} comment={comment} users={users} userCommentsLikes={userCommentsLikes} userCommentsDisLikes={userCommentsDisLikes} setUserCommentsLikes={setUserCommentsLikes} setUserCommentsDisLikes={setUserCommentsDisLikes}></CommentComp>
        ))}
      </div>
    </div>
  );
};

export default Comments;
