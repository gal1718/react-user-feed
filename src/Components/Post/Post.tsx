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
  faArrowUp,
  faArrowDown,
  faComment,
} from "@fortawesome/free-solid-svg-icons";
import { type Post, type User } from "../../utils/dataUtils";

const PostComp = ({
  post,
  userLikes,
  userDisLikes,
  addLikeClicked,
  removeLikeClicked,
  users,
}: {
  post: Post;
  userLikes: Post[];
  userDisLikes: Post[];
  addLikeClicked: (postId: string) => void;
  removeLikeClicked: (postId: string) => void;
  users: User[];
}) => {
  let timePassed: undefined | string = moment(
    new Date(post.published_at)
  ).fromNow();

  //need to change also the post whuchh is the selectedPost from post details
  const handleLike = (event: React.MouseEvent) => {
    console.log("stop progration");
    addLikeClicked(post.id);
    event.preventDefault();
    event.stopPropagation();
  };

  const handleDisLike = (event: React.MouseEvent) => {
    removeLikeClicked(post.id);
    event.preventDefault();
    event.stopPropagation();
  };

  // generics ( we arew also using generics in react hooks)
  // we write <T,> instead of <T> because its covert to js; ts gonna think were writing jsx element; <T,> prevent it. use older syntax to avoid it
  // In generic functions ( that recieve and return something) we are specifinig a relationship betweeen the func args and the return value- both should be from the same type T
  // const buildTypeDynamicArr = <T,>(value: T): T[] => {

  //   return [value];
  // }
  //functions old syntax for more readable generic function
  // function buildTypeDynamicArr<T>(value: T): T[] {
  //   return [value];
  // }

  // console.log(buildTypeDynamicArr("hellol worlds"));
  // console.log(buildTypeDynamicArr(5));

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
          <div className="action-container">
            <FontAwesomeIcon
              className={
                userLikes.some((el) => el.id === post.id) ? "like icon" : "icon"
              }
              onClick={(event) => handleLike(event)}
              icon={faArrowUp}
            />
            <span style={{ margin: "0px 5px 0px 5px" }}>
              {post.likes || "Vote"}
            </span>
            <FontAwesomeIcon
              className={
                userDisLikes.some((el) => el.id === post.id)
                  ? "dislike icon"
                  : "icon"
              }
              onClick={(event: React.MouseEvent) => handleDisLike(event)}
              icon={faArrowDown}
            />
          </div>
          <div className="action-container">
            <FontAwesomeIcon className="icon" icon={faComment} />
            <span style={{ margin: "0px 5px 0px 5px" }}>
              {post.comments?.length || "Comment"}
            </span>
          </div>
          {/* <Button
            type="button"
            autoFocus={true}
            style={{ backgroundColor: "green" }}
            onClick={() => addLike(post.id)}
          >
            Like
          </Button>
          <Button
            type="button"
            autoFocus={false}
            style={{ backgroundColor: "red" }}
            onClick={() => alert("comment")}
          >
            Comment
          </Button> */}
        </CardActions>
      </Card>
    </div>
  );
};

export default PostComp;
