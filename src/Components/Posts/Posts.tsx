import React from "react";
import PostComp from "../Post/Post";
import BasicSelect from "../BasicSelect/BasicSelect";
import { type Post, type User, type SortKey } from "../../utils/typeAndData";
import { Link } from "react-router-dom";
import { SxProps } from "@mui/material/styles";

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

const Posts = ({
  handleSetPosts,
  posts,
  users,
  user,
}: {
  posts: Post[];
  users: User[];
  user: User;
  handleSetPosts: (newPosts: Post[]) => void;
}) => {
  console.log("POSTS comp render");

  const sort = (objectKey: SortKey) => {
    const sortedList = [...posts].sort((a, b) =>
      (a[objectKey] || 0) < (b[objectKey] || 0) ? 1 : -1
    );
    handleSetPosts(sortedList);
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
        <BasicSelect sx={sortStyle} sort={sort}></BasicSelect>
        {posts.map((post) => (
          <Link
            key={post.id}
            to={`/PostDetailed/${post.id}`}
            state={{ post }}
            style={{ textDecoration: "none" }}
          >
            <PostComp
              post={post}
              user={user}
              posts={posts}
              users={users}
              handleSetPosts={handleSetPosts}
            ></PostComp>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Posts;
