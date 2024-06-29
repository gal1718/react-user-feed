//import React from "react";
import * as React from "react";
import "./Post.css";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
//import Button from "../Button/Button";
import Typography from "@mui/material/Typography";
import moment from "moment";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faComment,
} from "@fortawesome/free-solid-svg-icons";
import { type Post, type User } from "../../utils/typeAndData";
import { likeClicked, dislikeClicked } from "../../utils/likedislikeFunc";
import LikeDisLike from "../LikeDisLike/LikeDisLike";

const PostComp = ({
  post,
  posts,
  handleSetPosts,
  users,
  user,
}: {
  post: Post;
  posts: Post[];
  handleSetPosts: (newPosts: Post[]) => void;
  users: User[];
  user: User;
}) => {
  console.log("post Comp render");
  let timePassed: undefined | string = moment(
    new Date(post.published_at)
  ).fromNow();

  //need to change also the post whuchh is the selectedPost from post details
  const handleLike = (event: React.MouseEvent) => {
    //console.log("stop progration");
    const newPost = likeClicked(post,user);
    const newPosts = posts.map((postItem) =>{
      if(postItem.id !== post.id){
        return postItem
      }
      return newPost;
    })
    handleSetPosts(newPosts as Post[]);
    //prevent opening the post
    event.preventDefault();
    event.stopPropagation();
  };

  const handleDisLike = (event: React.MouseEvent) => {
    //removeLikeClicked(post.id);
    const newPost = dislikeClicked(post,user);
    const newPosts = posts.map((postItem) =>{
      if(postItem.id !== post.id){
        return postItem
      }
      return newPost;
    })
    handleSetPosts(newPosts as Post[])//////*** */
    event.preventDefault();
    event.stopPropagation();
  };

  return (
    <div key={post.id} className="Post">
      <Card
        sx={{
          width: 900,
          backgroundColor: "#101113",
          marginBottom: "5px",
          borderBottom: "1px solid gray",
        }}
      >
        <CardContent>
          <div
            className="post-details"
            style={{ display: "flex", alignItems: "center" }}
          >
            <div className="avatar-container">
              <div className="avatar">
                <img
                  src={
                    users.find((x) => x.id === post.user_id)?.avatar ??
                    "default-avatar-url"
                  }
                ></img>
              </div>
            </div>
            <div style={{ marginLeft: "1%", color: "lightskyblue" }}>
              {users.find((x) => x.id === post.user_id)?.user_name}
            </div>
            <div style={{ marginLeft: "1%" }}>• {timePassed}</div>
          </div>
          <Typography
            gutterBottom
            variant="h5"
            component="div"
            sx={{ marginTop: "5px" }}
          >
            {post.title}
          </Typography>
          <Typography
            variant="body2"
            gutterBottom={true}
            color="text.secondary"
          >
            {post.body}
          </Typography>
          {post.imageUrl && (
            <CardMedia
              component="img"
              alt={post.title}
              sx={{
                maxHeight: "700px",
                borderRadius: "4%",
                objectFit: "contain",
              }}
              image={post.imageUrl || undefined}
            />
          )}
        </CardContent>
        <CardActions>
          <LikeDisLike
            user={user}
            item={post}
            onLike={handleLike}
            onDisLike={handleDisLike}
          ></LikeDisLike>
          <div className="action-container">
            <FontAwesomeIcon className="icon" icon={faComment} />
            <span style={{ margin: "0px 5px 0px 5px" }}>
              {post.comments?.length || "Comment"}
            </span>
          </div>
        </CardActions>
      </Card>
    </div>
  );
};

export default PostComp;
