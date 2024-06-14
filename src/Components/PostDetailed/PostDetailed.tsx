//import React from "react";
import * as React from "react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { type Post, type User, type Comment } from "../../utils/dataUtils";
import Comments from "../Comments/comments";
import PostComp from "../Post/Post";
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
//import Image from '@ckeditor/ckeditor5-image/src/image';
import './PostDetailed.css';


//import MDEditor, { ContextStore } from "@uiw/react-md-editor";


const PostDetailed = ({
  posts,
  setPosts,
  userDisLikes,
  userLikes,
  addLikeClicked,
  removeLikeClicked,
  users,
  setUserCommentsLikes,
  setUserCommentsDisLikes,
  userCommentsLikes,
  userCommentsDisLikes

}: {
  setUserCommentsLikes: React.Dispatch<React.SetStateAction<Comment[]>>,
  setUserCommentsDisLikes: React.Dispatch<React.SetStateAction<Comment[]>>,
  userCommentsLikes: Comment[],
  userCommentsDisLikes: Comment[],
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
  //const [userCommentText, setUserCommentText] = useState<string>("");
  const { postId } = useParams<{ postId: string }>();
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [value, setValue] = useState<string>("");
  const [commentHtmlStr,setCommentHtml] = useState<string>("");

  useEffect(() => {
    const post = posts.find((post) => post.id === postId);
    if (post) {
      setSelectedPost(post);
    }
  }, []);

  const handleCommentAddition = () => {
    
    if (!selectedPost) return;
    //set the posts with the new comment in the selected post
    ////debugger;
    // //const data = document.querySelector('.ck-content p')?.textContent;
    // const data = CKEditor.e;
    

    const newComment: Comment = {
      user_id: "87819d35-6a5f-4d49-ba0f-982c332ad36c",
      body: commentHtmlStr,
      comments: undefined,
      id: "123456",
      published_at: Date.now().toString(),
      likes: 0,
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

<CKEditor
                    editor={ ClassicEditor }
                    data="<p>Hello from CKEditor&nbsp;5!</p>"
                    onReady={ editor => {
                        // You can store the "editor" and use when it is needed.
                        console.log( 'Editor is ready to use!', editor );
                    } }
                    onChange={ (event,editor) => {
                        console.log( "the event is: " + event);
                        const data = editor.getData();
                        console.log({event,editor,data});
                    } }
                    onBlur={ ( editor ) => {
                        console.log( 'Blur.', editor );
                    } }
                    onFocus={ ( editor ) => {
                        console.log( 'Focus.', editor );
                    } }
                />

               
          <input
            placeholder="add a comment"
            type="text"
            onChange={(el) => {setCommentHtml(el.target.value);console.log(ClassicEditor.Context)}}
          ></input>
          <button onClick={() => handleCommentAddition()}>Comment</button>
          <Comments
            post={selectedPost}
            comments={selectedPost!.comments}
            users={users}
            userCommentsLikes={userCommentsLikes}
            userCommentsDisLikes={userCommentsDisLikes}
            setUserCommentsLikes={setUserCommentsLikes}
            setUserCommentsDisLikes = {setUserCommentsDisLikes}
  
          ></Comments>
      
    </div>
  );
};

export default PostDetailed;
