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
import { type Post, type Comment, type User } from "../../utils/dataUtils";
import parse from 'html-react-parser';

const CommentComp = ({
  post,
  comment,
  users,
  setUserCommentsLikes,
  setUserCommentsDisLikes,
  userCommentsLikes,
  userCommentsDisLikes,
}: {
  post: Post;
  comment: Comment;
  users: User[];
  setUserCommentsLikes: React.Dispatch<React.SetStateAction<Comment[]>>,
  setUserCommentsDisLikes: React.Dispatch<React.SetStateAction<Comment[]>>,
  userCommentsLikes: Comment[],
  userCommentsDisLikes: Comment[]
}) => {
  let timePassed: undefined | string = moment(
    new Date(comment.published_at)
  ).fromNow();

  console.log("comment : " + JSON.stringify(comment));

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
            <div>
            {parse(comment.body)}
            </div>
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
          <div className="action-container">
            <FontAwesomeIcon
              className={
                userCommentsLikes.some((el) => el.id === comment.id) ? "like icon" : "icon"
              }
              onClick={() => console.log("handle click")}
              icon={faArrowUp}
            />
            <span style={{ margin: "0px 5px 0px 5px" }}>
              {post.likes || "Vote"}
            </span>
            <FontAwesomeIcon
              className={
                userCommentsDisLikes.some((el) => el.id === post.id)
                  ? "dislike icon"
                  : "icon"
              }
              onClick={(event: React.MouseEvent) => console.log("dsd")}
              icon={faArrowDown}
            />
          </div>
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
