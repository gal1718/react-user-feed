import React, { useEffect, useState } from "react";
//import BasicSelect from "../BasicSelect/BasicSelect";
import { SxProps } from "@mui/material/styles";
import { type Post, type Comment, type User, SortKey } from "../../utils/typeAndData";
import CommentComp from "../Comment/Comment";
import { GetUserInteractionMode, getTotalLikes, sort } from "../../utils/utilsFunctions";
import BasicSelect from "../BasicSelect/BasicSelect";

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
  users,
  posts,
  comments,
  LoggedUser,
  handleSetPosts,
  
}: {
  post: Post;
  posts: Post[];
  users: User[];
  comments: Comment[];
  LoggedUser: User;
  handleSetPosts: (newPosts: Post[]) => void;
}) => {

  const [sortedComments, setSortedComments] = useState<Comment[]>(comments);

  useEffect(()=> {
    setSortedComments(sort("published_at",comments));
  },[comments])//

  const handleSort = (sortKey: SortKey) => {
    const sortedComments = sort(sortKey, comments);
    setSortedComments(sortedComments as Comment[]);
  };


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
        <BasicSelect sx={sortStyle} sort={handleSort}></BasicSelect>
        {sortedComments?.map((comment) => (
          <CommentComp
            posts={posts}
            mode={GetUserInteractionMode(comment,LoggedUser)}
            totalLikes={getTotalLikes(comment)}
            key={comment.id}
            post={post}
            comment={comment}
            LoggedUser={LoggedUser}
            users={users}
            handleSetPosts={handleSetPosts}
          ></CommentComp>
        ))}
      </div>
    </div>
  );
};

export default Comments;
