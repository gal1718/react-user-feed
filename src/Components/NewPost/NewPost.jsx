//import React from "react";
import * as React from "react";

const NewPost = () => {
  return (
    <div key={selectedPost.id} className="NewPost">
      <PostComp
        post={selectedPost}
        addLike={addLike}
        removeLike={removeLike}
        users={users}
      ></PostComp>
    </div>
  );
};

export default NewPost;
