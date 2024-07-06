//import React from "react";
import * as React from "react";
import "./Post.css";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import parse from "html-react-parser";
//import Button from "../Button/Button";
import Typography from "@mui/material/Typography";
import moment from "moment";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faComment,
} from "@fortawesome/free-solid-svg-icons";
import { Mode, type Post, type User } from "../../utils/typeAndData";
import { likeClicked, dislikeClicked} from "../../utils/utilsFunctions";
import LikeDisLike from "../LikeDisLike/LikeDisLike";

const LazyCardMedia = React.lazy(() => import('../LazyCardMedia/LazyCardMedia'));


const PostComp = ({
  post,
  posts,
  handleSetPosts,
  users,
  LoggedUser,
  mode,
  totalLikes
}: {
  post: Post;
  posts: Post[];
  handleSetPosts: (newPosts: Post[]) => void;
  users: User[];
  LoggedUser: User;
  mode: Mode;
  totalLikes: number;
}) => {

  let timePassed: undefined | string = moment(
    new Date(post.published_at)
  ).fromNow();

  const handleLike = (event: React.MouseEvent) => {
    //console.log("stop progration");
    //const newPost = likeClicked(posts.find((postItem) => postItem.id === post.id) as Post,LoggedUser);//posts.find. post didnt work
    const newPost = likeClicked<Post>(post,LoggedUser);
    const newPosts = posts.map((postItem) =>{
      if(postItem.id !== post.id){
        return postItem
      }
      return newPost;
    })
    handleSetPosts(newPosts as Post[]);//updating the posts. ********
    //prevent opening the post
    event.preventDefault();
    event.stopPropagation();
  };

  const handleDisLike = (event: React.MouseEvent) => {
    //removeLikeClicked(post.id);
    //const newPost = dislikeClicked(posts.find((postItem) => postItem.id === post.id) as Post,LoggedUser);
    const newPost = dislikeClicked(post,LoggedUser);
    const newPosts = posts.map((postItem) =>{
      if(postItem.id !== post.id){
        return postItem
      }
      return newPost;
    })
    handleSetPosts(newPosts as Post[])//////*** */issue
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
            className="post"
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
            {parse(post.body)}
          </Typography>
          {post.imageUrl && (
            <LazyCardMedia
              alt={post.title}
              src={post.imageUrl || undefined}
              sx={{
                maxHeight: "700px",
                borderRadius: "4%",
                objectFit: "contain",
              }}
            />
          )}
        </CardContent>
        <CardActions>
          <LikeDisLike
            totalLikes={totalLikes}
            mode={mode}
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
