import React from "react";
import PostComp from "../Post/Post";
import BasicSelect from "../BasicSelect/BasicSelect";
import { type Post, type User, type SortKey } from "../../utils/dataUtils";
import { Link } from "react-router-dom";
import { SxProps } from "@mui/material/styles";

//console.log("posts component ");

const sortStyle: SxProps = {
  marginRight: "55%",
  '.MuiSelect-root': {
    fontSize: '0.8rem',
    height: '30px',
    width: '120px',
    color: 'blue'
  },
  '.MuiMenuItem-root': {
    fontSize: '0.8rem',
    color: 'blue'
  }
};

const Posts = ({
  userLikes,
  userDisLikes,
  addLikeClicked,
  removeLikeClicked,
  posts,
  users,
  sort,
}: {
  userLikes: Post[];
  userDisLikes: Post[];
  posts: Post[];
  users: User[];
  removeLikeClicked: (postId: string) => void;
  addLikeClicked: (postId: string) => void;
  sort: (objectKey: SortKey) => void;
}) => {

  console.log("postas comp");

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
            style={{ textDecoration: "none" }}
          >
            <PostComp
              post={post}
              userLikes={userLikes}
              userDisLikes={userDisLikes}
              addLikeClicked={addLikeClicked}
              removeLikeClicked={removeLikeClicked}
              users={users}
            ></PostComp>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Posts;
