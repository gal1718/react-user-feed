// src/data/posts.d.ts
type Post = {
    id: string;
    user_id: string;
    title: string,
    body: string,
    likes: number,
    imageUrl: string,
    published_at: string,
  };
  
  declare module "./users.json" {
    const value: User[];
    export default value;
  }