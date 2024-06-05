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
import { TPost } from '../../lib/types'

//import FontAwesomeIcon from from '@fortawesome/react-fontawesome';



const Post = ({ post, addLike }: { post: TPost; addLike: any }) => {
  let timePassed: undefined | string = moment(
    new Date(post.published_at)
  ).fromNow();

  // generics ( we arew also using generics in react hooks)
  // we write <T,> instead of <T> because its covert to js; ts gonna think were writing jsx element; <T,> prevent it. use holder syntax to avoid it
  // In generic functions ( that recieve and return something) we are specifinig a relationship betweeen the func args and othe return value- coth should be from the same type T
  // const buildTypeDynamicArr = <T,>(value: T): T[] => {

  //   return [value];
  // }
  //functions old syntax for more readable generic function
  function buildTypeDynamicArr<T>(value: T): T[] {
    return [value];
  }

  console.log(buildTypeDynamicArr("hellol worlds"));
  console.log(buildTypeDynamicArr(5));

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
              sx={{ maxHeight: "700px", borderRadius: "4%" }}
              image={post.imageUrl || undefined}
            />
          )}
        </CardContent>
        <CardActions>
          <Button
            type="button"
            autoFocus={true}
            style={{ backgroundColor: "green" }}
            onClick={() => addLike(post.id)}
          >
            Like
          </Button>
          <span>{post.likes}</span>

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
