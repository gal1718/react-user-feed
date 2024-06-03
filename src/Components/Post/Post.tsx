//import React from "react";
import * as React from "react";
import "./Post.css";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import importedUsers from "../../data/users.json";
//import FontAwesomeIcon from from '@fortawesome/react-fontawesome';

//const prop =
// type Prop = {
//   id: string;
//   title: string;
//   body: string;
//   publish_date: string;
//   imageUrl: string | undefined | null;
//   user_id: string;
// };
type Post = {
  id: string;
  user_id: string;
  title: string;
  body: string;
  likes: number;
  published_at: string;
  imageUrl?: string;
};

const Post = ({ post, addLike }: { post: Post, addLike: any}) => {
  const calculateTimePass = (post_date: string) => {
    // Given date in ISO 8601 format
    const givenDate = new Date(post_date);

    // Current date
    const currentDate = new Date();

    // Calculate the difference in milliseconds
    const diffMilliseconds: number =
      currentDate.getTime() - givenDate.getTime();

    // Convert the difference to hours and minutes
    const diffHours = Math.floor(diffMilliseconds / (1000 * 60 * 60));

    console.log(`Time difference is ${diffHours} hours`);
    return diffHours;
  };

  // const handleLike = () =>{
  //   console.log("handleVClick called post_id " + post.id);
  //   addLike(post.id);
  // }


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
            <div style={{ marginLeft: "2%" }}>
              • {calculateTimePass(post.published_at)} hr. ago
            </div>
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
              sx={{ maxHeight: "600px", borderRadius: "4%" }}
              image={post.imageUrl || undefined}
            />
          )}
        </CardContent>
        <CardActions>
          <span style={{ backgroundColor: "grey" }}>
            <Button size="small"  onClick = {() => addLike(post.id)}>
              Like
            </Button>
            <span>{post.likes}</span>
            <i className="fa-solid fa-computer-classic"></i>
          </span>
          <Button size="small">Comment</Button>
        </CardActions>
      </Card>
    </div>
  );
};

export default Post;
