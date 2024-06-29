//import React from "react";
import * as React from "react";
import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { type Post, type User, type Comment } from "../../utils/typeAndData";
import Comments from "../Comments/comments";
import PostComp from "../Post/Post";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
//import Image from '@ckeditor/ckeditor5-image/src/image';
import "./PostDetailed.css";
import { faker } from "@faker-js/faker";
import useContentInteractions from "../../hooks/ContentWithInteractions";

//import MDEditor, { ContextStore } from "@uiw/react-md-editor";

const PostDetailed = ({
  posts,
  handleSetPosts,
  users,
  user,
}: {
  posts: Post[];
  handleSetPosts: (newPosts: Post[]) => void;
  users: User[];
  user: User;
}) => {
  console.log("postDetails Comp render");
  const { postId } = useParams<{ postId: string }>();
  const [commentHtmlStr, setCommentHtmlStr] = useState<string>("");
  const location = useLocation();
  const { post } = location.state;
  const [editPost, setEditPost] = useState<Post>(post);
  

  const {
    content: comments,
    likeClicked: commentLikeClicked,
    dislikeClicked: commentDislikeClicked,
  } = useContentInteractions(post?.comments || [], user,"comments");

  const handleCommentAddition = () => {
    if (!post) return;

    const newComment: Comment = {
      user_id: user.id,
      body: commentHtmlStr,
      comments: undefined,
      id: faker.string.uuid(),
      published_at: Date.now().toString(),
    };

    const updatedComments = [...(editPost.comments ?? []), newComment];
    const newPost = { ...post, comments: updatedComments };
    //console.log("new post is: " + JSON.stringify(newPost));
    setEditPost(newPost);

    const newPosts = posts.map((postItem) => {
      if (postItem.id != post!.id) return postItem;
      else return newPost;
    });
    //console.log("newPosts: " + JSON.stringify(newPosts));
    handleSetPosts(newPosts);
  };

  if (!post) return <div>Loading...</div>;

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "15px",
      }}
      key={post!.id}
      className="PostDetailed"
    >
      <PostComp
        post={post!}
        posts={posts}
        user={user}
        users={users}
        handleSetPosts={handleSetPosts}
      ></PostComp>

      <CKEditor
        editor={ClassicEditor}
        data="<p>Hello from CKEditor&nbsp;5!</p>"
        onReady={(editor) => {
          // You can store the "editor" and use when it is needed.
          //console.log( 'Editor is ready to use!', editor );
        }}
        onChange={(event, editor) => {
          //console.log( "the event is: " + event);
          const data = editor.getData();
          console.log({ event, editor, data });
          setCommentHtmlStr(data);
        }}
        onBlur={(editor) => {
          //console.log( 'Blur.', editor );
        }}
        onFocus={(editor) => {
          //console.log( 'Focus.', editor );
        }}
      />

      <button onClick={() => handleCommentAddition()}>Comment</button>
      {editPost.comments && (
        <Comments
          post={editPost}
          posts={posts}
          user={user}
          comments={comments}
          handleSetPosts={handleSetPosts}
        ></Comments>
      )}
    </div>
  );
};

export default PostDetailed;
