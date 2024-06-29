import React from "react";
//import { Post, User } from "./utils/typeAndData";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowUp,
  faArrowDown,
  faComment,
} from "@fortawesome/free-solid-svg-icons";
import { User, Post } from "../../utils/typeAndData";

const LikeDisLike = ({user,item, onDisLike, onLike } : {user: User; item: Post | Comment, onDisLike: (event: React.MouseEvent) => void, onLike: (event: React.MouseEvent) => void}) => {

  return (
    <div className="LikeDisLike">
      <FontAwesomeIcon
        className={
          Array.isArray(item?.likes) &&
          item?.likes?.some((itemUserLike) => itemUserLike.id === user.id)
            ? "like icon"
            : "icon"
        }
        onClick={onLike}
        icon={faArrowUp}
      />
      <span style={{ margin: "0px 5px 0px 5px" }}>
        {(item.likes?.length || 0) - (item.disLikes?.length || 0) || "Vote"}
      </span>
      <FontAwesomeIcon
        className={
          Array.isArray(post?.disLikes) &&
          item?.disLikes?.some(
            (itemUserDisLike) => itemUserDisLike.id === user.id
          )
            ? "dislike icon"
            : "icon"
        }
        onClick={onDisLike}
        icon={faArrowDown}
      />
    </div>
  );
};

export default LikeDisLike;
