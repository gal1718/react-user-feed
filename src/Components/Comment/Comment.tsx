//import React from "react";
import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import moment from "moment";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faComment,
} from "@fortawesome/free-solid-svg-icons";
import { type Post, type Comment, type User, type Mode} from "../../utils/typeAndData";
import parse from "html-react-parser";
import { likeClicked, dislikeClicked, getTotalLikes, GetUserInteractionMode } from "../../utils/utilsFunctions";
import LikeDisLike from "../LikeDisLike/LikeDisLike";
import { useState } from "react";
import { faker } from "@faker-js/faker";
import TextEditor from "../TextEditor/TextEditor";



const CommentComp = ({
  posts,
  post,
  mode,
  totalLikes,
  comment,
  LoggedUser,
  users,
  handleSetPosts,
}: {
  mode: Mode;
  totalLikes: number;
  posts: Post[];
  post: Post;
  users: User[];
  comment: Comment;
  LoggedUser: User;
  handleSetPosts: (newPosts: Post[]) => void;
}) => {
  const [commentToCommentHtmlStr, setCommentToCommentHtmlStr] =
    useState<string>("");

    
  let timePassed: undefined | string = moment(
    new Date(comment.published_at)
  ).fromNow();

  // console.log("comment : " + JSON.stringify(comment));
  const getPostWithUpdatedComments = (newPostComments: Comment[]) : (Post[]) => {
    return posts.map((postItem) => {
      if (postItem.id !== post.id) {
        return postItem;
      }
      return { ...postItem, comments: newPostComments};
    })
  }

  //handlelike for both comment types nested and not nested(post comment)
  const handleLike = (event: React.MouseEvent) => {
    const newComment = likeClicked(comment, LoggedUser);
    //like comment level 1
    if(post.comments?.some((commentsItem) => commentsItem.id == comment.id)){
      const newPostComments = post.comments?.map((postCommentItem) => {
        if (postCommentItem.id !== comment.id) {
          return postCommentItem;
        }
        return newComment;
      });
      handleSetPosts(getPostWithUpdatedComments(newPostComments));
    }
    // like nested comment
    else{
      var postCommentsCpy = [...(post.comments ?? [])];
      //mutate the postComments with like somewhere
      if (changeNested(postCommentsCpy, newComment, 5)) {
        const newPosts = getPostWithUpdatedComments(postCommentsCpy)
        handleSetPosts(newPosts);
      }
    }
    
    //prevent opening the post
    event.preventDefault();
    event.stopPropagation();
  };

  const handleDisLike = (event: React.MouseEvent) => {
    //removeLikeClicked(post.id);
    const newComment = dislikeClicked(comment, LoggedUser);
    if(post.comments?.some((commentsItem) => commentsItem.id == comment.id)){
      const newPostComments = post.comments?.map((postCommentItem) => {
        if (postCommentItem.id !== comment.id) {
          return postCommentItem;
        }
        return newComment;
      });
      handleSetPosts(getPostWithUpdatedComments(newPostComments));
    }
    else{
      var postCommentsCpy = [...(post.comments ?? [])];

      //console.log("postCommentsArrCpy before : " + JSON.stringify(postCommentsArrCpy));
      if (changeNested(postCommentsCpy, newComment, 5)) {
        const newPosts = getPostWithUpdatedComments(postCommentsCpy);
        handleSetPosts(newPosts);
      }
    }
    event.preventDefault();
    event.stopPropagation();
  };

  //likedislike change for nested comment
  const changeNested = (
    comments: Comment[],
    newComment: Comment,
    depthLimit: number,
  ): boolean => {
    if (depthLimit === 0) return false;

    for (let i = 0; i < comments.length; i++) {
      if (comments[i].id === comment.id) {
        comments[i] = newComment;
        return true;
      } else if (comments[i]?.comments?.length) {
        if (
          changeNested(
            comments[i]?.comments ??[],
            newComment,
            depthLimit - 1
          )
        ) {
          return true;
        }
      }
    }
    return false;
  };


  const addCommentToNested = (
    comments: Comment[],
    newComment: Comment,
    depthLimit: number
  ): boolean => {
    if (depthLimit === 0) return false;

    for (let i = 0; i < comments.length; i++) {
      if (comments[i].id === comment.id) {
        comments[i].comments = [...(comments[i].comments ?? []), newComment];
        return true;
      } else if (comments[i]?.comments?.length) {
        if (
          addCommentToNested(
            comments[i].comments as Comment[],
            newComment,
            depthLimit - 1
          )
        ) {
          return true;
        }
      }
    }
    return false;
  };

  const handleNestedCommentAddition = () => {
    
    const newCommentToAdd: Comment = {
      user_id: LoggedUser.id,
      body: commentToCommentHtmlStr,
      comments: undefined,
      id: faker.string.uuid(),
      published_at: new Date().toISOString(),
    };
    var postCommentsCpy = [...(post.comments ?? [])];

    //console.log("postCommentsArrCpy before : " + JSON.stringify(postCommentsArrCpy));
    //this function mutate the postCommentCpy
    if (addCommentToNested(postCommentsCpy, newCommentToAdd, 5)) {
      const newPosts = getPostWithUpdatedComments(postCommentsCpy);
      handleSetPosts(newPosts);
    }
    //console.log("postCommentsArrCpy after : " + JSON.stringify(postCommentsArrCpy));
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
                    users.find((x) => x.id === comment.user_id)?.avatar ??
                    "default-avatar-url"
                  }
                ></img>
              </div>
            </div>
            <div style={{ marginLeft: "1%", color: "lightskyblue" }}>
              {users.find((x) => x.id === comment.user_id)?.user_name}
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
            mode={mode}
            totalLikes={totalLikes}
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
    
      <TextEditor onChange={setCommentToCommentHtmlStr}></TextEditor>
      <button onClick={() => handleNestedCommentAddition()}>Comment</button>

      {/* Render nested comments recursively */}
      {comment.comments && comment.comments?.length > 0 && (
        <div style={{ marginLeft: "4%" }} className="nested-comments">
          {comment.comments.map((nestedComment) => (
            <CommentComp
              key={nestedComment.id}
              posts={posts}
              post={post}
              comment={nestedComment}
              LoggedUser={LoggedUser}
              handleSetPosts={handleSetPosts}
              mode={GetUserInteractionMode(nestedComment,LoggedUser)}
              totalLikes={getTotalLikes(nestedComment)}
              users={users}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default CommentComp;
