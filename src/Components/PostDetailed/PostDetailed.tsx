//import React from "react";
import * as React from "react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import PostComp from "../Post/Post";
import { type Post, type User, type Comment } from "../../utils/dataUtils";
import MDEditor, { ContextStore } from "@uiw/react-md-editor";

const PostDetailed = ({
  posts,
  setPosts,
  userDisLikes,
  userLikes,
  addLikeClicked,
  removeLikeClicked,
  users,
}: {
  posts: Post[];
  setUserDisLikes: React.Dispatch<React.SetStateAction<Post[]>>;
  setPosts: React.Dispatch<React.SetStateAction<Post[]>>;
  userLikes: Post[];
  userDisLikes: Post[];
  selectedPost: Post;
  removeLikeClicked: (postId: string) => void;
  users: User[];
  addLikeClicked: (postId: string) => void;
}) => {
  const [userCommentText, setUserCommentText] = useState<string>("");
  const { postId } = useParams<{ postId: string }>();
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [value, setValue] = useState<string>("tpe something");

  useEffect(() => {
    const post = posts.find((post) => post.id === postId);
    if (post) {
      setSelectedPost(post);
    }
  }, [postId, posts]);

  const handleCommentAddition = () => {
    if (!selectedPost) return;
    //set the posts with the new comment in the selected post
    //debugger;
    const newComment: Comment = {
      post_id: selectedPost!.id,
      user_id: "123",
      text: value,
    };
    const newPosts = posts.map((post) => {
      if (post.id != selectedPost!.id) return post;
      else {
        const updatedComments = [...(post.comments ?? []), newComment];
        const newPost = { ...post, comments: updatedComments };
        return newPost;
      }
    });

    setSelectedPost({
      ...selectedPost!,
      comments: [...(selectedPost!.comments ?? []), newComment],
    });
    setPosts(newPosts);
  };

  if (!selectedPost) return <div>Loading...</div>;

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "15px",
      }}
      key={selectedPost!.id}
      className="PostDetailed"
    >
      <PostComp
        userLikes={userLikes}
        userDisLikes={userDisLikes}
        post={selectedPost!}
        removeLikeClicked={removeLikeClicked}
        addLikeClicked={addLikeClicked}
        users={users}
      ></PostComp>
      <div>
        <input
          placeholder="add a comment"
          type="text"
          onChange={(el) => setUserCommentText(el.target.value)}
        ></input>
        <button onClick={() => handleCommentAddition()}>Comment</button>
        {selectedPost.comments?.map((comment, index) => (
          <div key={index}>{comment?.text}</div>
        ))}
        <MDEditor
          value={value}
          onChange={
            setValue as (
              value?: string | undefined,
              event?: React.ChangeEvent<HTMLTextAreaElement> | undefined,
              state?: ContextStore | undefined
            ) => void
          }
        />
        <MDEditor.Markdown source={value} style={{ whiteSpace: "pre-wrap" }} />
      </div>
    </div>
  );
};

export default PostDetailed;
