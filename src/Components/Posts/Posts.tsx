import React from "react";
import PostComp from "../Post/Post";
import BasicSelect from "../BasicSelect/BasicSelect";
import { type Post, type User, type SortKey } from "../../utils/typeAndData";
import { GetUserInteractionMode, getTotalLikes } from "../../utils/utilsFunctions";
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
  LoggedUser,
}: {
  posts: Post[];
  users: User[];
  LoggedUser: User;
  handleSetPosts: (newPosts: Post[]) => void;
}) => {
  //console.log("POSTS comp render");

  const sort = (sortKey: SortKey) => {
    const sortedPosts = [...posts].sort((a, b) => {
      if (sortKey === "Best") {
        const netLikesA = (a.likes?.length || 0) - (a.disLikes?.length || 0);
        const netLikesB = (b.likes?.length || 0) - (b.disLikes?.length || 0);
        return netLikesB - netLikesA;
      } else if (sortKey === "published_at") {
        return new Date(b.published_at).getTime() - new Date(a.published_at).getTime();
      }
      return 0;
    });
    handleSetPosts(sortedPosts);
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
              LoggedUser={LoggedUser}
              posts={posts}
              users={users}
              handleSetPosts={handleSetPosts}
              mode={GetUserInteractionMode(post,LoggedUser)}//post is alreadty updated here
              totalLikes={getTotalLikes(post)}
            ></PostComp>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Posts;
