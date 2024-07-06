//import React from "react";
import * as React from "react";
import TextEditor from "../TextEditor/TextEditor";
import { useState } from "react";
import { Post, User } from "../../utils/typeAndData";
import { faker } from "@faker-js/faker";


const NewPost = ({handleSetPosts,posts, LoggedUser}: {handleSetPosts:(newPosts: Post[]) => void, posts: Post[], LoggedUser: User}) => {


  const [newPost,setNewPost] = useState<Post>({id: faker.string.uuid(),
    user_id: LoggedUser.id,
    body: "",
    title: "",
    published_at: ""
  })
  //const [newPostBody, setNewPostBody] = useState<string>("");

  const handlePostAddition = () =>{
    handleSetPosts([...posts, {...newPost, published_at: new Date().toISOString()}])
  }

  return (
    <div className="NewPost">
      <input onChange={(event) => setNewPost({...newPost, title: event.target.value})} name="title"></input>
      <TextEditor onChange={(data) => setNewPost({...newPost, body: data})}></TextEditor>
      {/* <TextEditor onChange={setNewPostBody}></TextEditor> */}
      <button onClick={handlePostAddition}>Comment</button>
    
    </div>
  );
};

export default NewPost;
