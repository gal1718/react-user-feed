import React from "react";
//import { Post, User } from "./utils/typeAndData";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowUp,
  faArrowDown,
  faComment,
} from "@fortawesome/free-solid-svg-icons";
import { User, Post, Mode } from "../../utils/typeAndData";



const LikeDisLike = ({mode,totalLikes, onDisLike, onLike } : {mode: Mode;totalLikes: number; onDisLike: (event: React.MouseEvent) => void, onLike: (event: React.MouseEvent) => void}) => {

  return (
    <div className="LikeDisLike">
      <FontAwesomeIcon
        className={
          mode === 'liked'
            ? "like icon"
            : "icon"
        }
        onClick={onLike}
        icon={faArrowUp}
      />
      <span style={{ margin: "0px 5px 0px 5px" }}>
        { totalLikes.toString() || "Vote"}
      </span>
      <FontAwesomeIcon
        className={
          mode === 'disliked'
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
