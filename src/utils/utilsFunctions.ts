import { Post, User, Comment, Mode } from "./typeAndData";


export const likeClicked = <TData extends {likes?: User[], disLikes?: User[]}> (item: TData, user: User): TData => {
  if (UserLikeBefore(item, user)) {
    // Case 1: User already liked before, remove the like
    return {
      ...item,
      likes: item.likes?.filter((userItem) => userItem.id !== user.id),
    };
  } else if (UserDisLikeBefore(item, user)) {
    // Case 3: User disliked before, remove dislike and add like
    return {
      ...item,
      likes: item.likes ? [...item.likes, user] : [user],
      disLikes: item.disLikes?.filter((userItem) => userItem.id !== user.id),
    };
  } else {
    // Case 2: User neither liked nor disliked, add like
    return {
      ...item,
      likes: item.likes ? [...item.likes, user] : [user],
    };
  }
  return item;
};

export const dislikeClicked = <TData extends {likes?: User[], disLikes?: User[]}> (item: TData, user: User): TData => {
  if (UserDisLikeBefore(item, user)) {
    // Case 2: User already disliked before, remove the dislike
    return {
      ...item,
      disLikes: item.disLikes?.filter((userItem) => userItem.id !== user.id),
    };
  } else if (UserLikeBefore(item, user)) {
    // Case 1: User liked before, remove like and add dislike
    return {
      ...item,
      disLikes: item.disLikes ? [...item.disLikes, user] : [user],
      likes: item.likes?.filter((userItem) => userItem.id !== user.id),
    };
  } else {
    // Case 3: User neither liked nor disliked, add dislike
    return {
      ...item,
      disLikes: item.disLikes ? [...item.disLikes, user] : [user],
    };
  }
  return item;
};

export const getTotalLikes = <TData extends {likes?: User[], disLikes?: User[]}>(item: TData): number => {
  return (item.likes?.length || 0) - (item.disLikes?.length || 0)
}

export const GetUserInteractionMode = (
  item: Post | Comment,
  user: User
): Mode => {
  if (UserLikeBefore(item,user)) return "liked";
  else if (UserDisLikeBefore(item,user)) return "disliked";
  else return "none";
};

export const UserLikeBefore = <TData extends {likes?: User[]}> (item: TData, user: User): boolean | undefined => {
  item.likes?.map((userLiked)=>{
    console.log(userLiked.user_name);
  })
  return item.likes?.some((userLike) => userLike.id === user.id);
};

export const UserDisLikeBefore = <TData extends {disLikes?: User[]}> (item: TData, user: User): boolean | undefined => {
  item.disLikes?.map((userLiked)=>{
    console.log(userLiked.user_name);
  })
  return item.disLikes?.some((userDisLike) => userDisLike.id === user.id);
};
