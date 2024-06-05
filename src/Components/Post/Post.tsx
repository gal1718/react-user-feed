//import React from "react";
import * as React from "react";
import "./Post.css";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "../Button/Button";
import Typography from "@mui/material/Typography";
import importedUsers from "../../data/users.json";
import moment from "moment";
import { type TPost } from '../../lib/types';
//import ReactDOM from 'react-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { faEnvelope } from '@fortawesome/free-solid-svg-icons'
//import { faSolid } from '@fortawesome/free-solid-svg-icons'
import { faArrowUp } from '@fortawesome/free-solid-svg-icons'
import { faArrowDown } from '@fortawesome/free-solid-svg-icons'


const Post = ({ post, addLike, removeLike }: { post: TPost; addLike: (postId: string)=> void; removeLike: (postId: string)=> void }) => {
  let timePassed: undefined | string = moment(
    new Date(post.published_at)
  ).fromNow();

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
        sx={{ width: 900, backgroundColor: "#343434", marginBottom: "5px" }}
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
                    importedUsers.find((x) => x.id === post.user_id)?.avatar ??
                    "default-avatar-url"
                  }
                ></img>
              </div>
            </div>
            <div style={{ marginLeft: "2%" }}>• {timePassed}</div>
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
              sx={{ maxHeight: "700px", borderRadius: "4%", objectFit: "contain"}}
              image={post.imageUrl || undefined}
            />
          )}
        </CardContent>
        <CardActions>
          <div style={{display:"flex",backgroundColor: "green",borderRadius: "10px"}}>
          <FontAwesomeIcon onClick={() => addLike(post.id)} icon={faArrowUp}/>
          <span>{post.likes || "Vote"}</span> 
          <FontAwesomeIcon onClick={() => removeLike(post.id)} icon={faArrowDown}/>
          </div>
          <Button
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
          </Button>
        </CardActions>
      </Card>
    </div>
  );
};

export default Post;
