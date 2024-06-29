//import React from "react";
import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
//import Button from "../Button/Button";
import Typography from "@mui/material/Typography";
import moment from "moment";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowUp,
  faArrowDown,
  faComment,
} from "@fortawesome/free-solid-svg-icons";
import { type Post, type Comment, type User } from "../../utils/typeAndData";
import parse from "html-react-parser";
import { likeClicked, dislikeClicked } from "../../utils/likedislikeFunc";
import LikeDisLike from "../LikeDisLike/LikeDisLike";

const CommentComp = ({
  posts,
  post,
  comment,
  user,
  handleSetPosts
}: {
  posts: Post[]
  post: Post;
  comment: Comment;
  user: User;
  handleSetPosts: (newPosts: Post[]) => void
}) => {
  let timePassed: undefined | string = moment(
    new Date(comment.published_at)
  ).fromNow();

  console.log("comment : " + JSON.stringify(comment));

  //need to change also the post whuchh is the selectedPost from post details
  const handleLike = (event: React.MouseEvent) => {
    //console.log("stop progration");
    const newComment = likeClicked(comment,user);
    const newPostComments = post.comments?.map((postCommentItem) =>{
      if(postCommentItem.id !== comment.id){
        return postCommentItem
      }
      return newComment;
    })
    handleSetPosts(posts.map((postItem) =>{
      if(postItem.id !== post.id){
        return postItem
      }
      return {...postItem, comments: newPostComments};
    }))
    //prevent opening the post
    event.preventDefault();
    event.stopPropagation();
  };

  const handleDisLike = (event: React.MouseEvent) => {
    //removeLikeClicked(post.id);
   const newComment = dislikeClicked(comment,user);
    const newPostComments = post.comments?.map((postCommentItem) =>{
      if(postCommentItem.id !== comment.id){
        return postCommentItem
      }
      return newComment;
    })
    handleSetPosts(posts.map((postItem) =>{
      if(postItem.id !== post.id){
        return postItem
      }
      return {...postItem, comments: newPostComments};
    }))
    event.preventDefault();
    event.stopPropagation();
  };

  return (
    <div key={comment.id} className="Comment">
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
                    user.avatar ??
                    "default-avatar-url"
                  }
                ></img>
              </div>
            </div>
            <div style={{ marginLeft: "1%", color: "lightskyblue" }}>
              {user.user_name}
            </div>
            <div style={{ marginLeft: "1%" }}>• {timePassed}</div>
          </div>
          <Typography
            variant="body2"
            gutterBottom={true}
            color="text.secondary"
          >
            <div>{parse(comment.body)}</div>
          </Typography>
          {comment.imageUrl && (
            <CardMedia
              component="img"
              alt="comment"
              sx={{
                maxHeight: "700px",
                borderRadius: "4%",
                objectFit: "contain",
              }}
              image={comment.imageUrl || undefined}
            />
          )}
        </CardContent>
        <CardActions>
        <LikeDisLike
            user={user}
            item={comment}
            onLike={handleLike}
            onDisLike={handleDisLike}
          ></LikeDisLike>
          <div className="action-container">
            <FontAwesomeIcon className="icon" icon={faComment} />
            <span style={{ margin: "0px 5px 0px 5px" }}>
              {comment.comments?.length || "Comment"}
            </span>
          </div>
        </CardActions>
      </Card>
    </div>
  );
};

export default CommentComp;
