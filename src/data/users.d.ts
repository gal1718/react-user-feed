// src/data/posts.d.ts
type User = {
    id: string;
    user_name: string;
    avatar: string;
    password: string;
  };
  
  declare module "./users.json" {
    const value: User[];
    export default value;
  }