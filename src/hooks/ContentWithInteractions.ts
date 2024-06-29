import { useState, useEffect } from "react";
import { BaseContent, User } from "../utils/typeAndData";

type SortKey = "published_at" | "likes";

const useContentInteractions = <T extends BaseContent>(
  initialContent: T[],
  currentUser: User,
  contentKey: string,
  // shouldSaveToLocalStorage: boolean
) => {
  const [content, setContent] = useState<T[]>(initialContent);
  const [sortBy, setSortBy] = useState<SortKey>("published_at");

  // useEffect(() => {
  //   if (shouldSaveToLocalStorage) {
  //     localStorage.setItem(contentKey, JSON.stringify(content));
  //   }
  // }, [content, contentKey, shouldSaveToLocalStorage]);

  const likeClicked = (contentId: string) => {
    setContent((prevContent) =>
      prevContent.map((item) => {
        if (item.id === contentId) {
          const hasLiked = item.likes?.some(
            (user) => user.id === currentUser.id
          );
          const hasDisliked = item.disLikes?.some(
            (user) => user.id === currentUser.id
          );

          if (hasLiked) {
            // Case 1: User already liked before, remove the like
            return {
              ...item,
              likes: item.likes?.filter((user) => user.id !== currentUser.id),
            };
          } else if (hasDisliked) {
            // Case 3: User disliked before, remove dislike and add like
            return {
              ...item,
              likes: item.likes ? [...item.likes, currentUser] : [currentUser],
              disLikes: item.disLikes?.filter(
                (user) => user.id !== currentUser.id
              ),
            };
          } else {
            // Case 2: User neither liked nor disliked, add like
            return {
              ...item,
              likes: item.likes ? [...item.likes, currentUser] : [currentUser],
            };
          }
        }
        return item;
      })
    );
  };

  const dislikeClicked = (contentId: string) => {
    setContent((prevContent) =>
      prevContent.map((item) => {
        if (item.id === contentId) {
          const hasLiked = item.likes?.some(
            (user) => user.id === currentUser.id
          );
          const hasDisliked = item.disLikes?.some(
            (user) => user.id === currentUser.id
          );

          if (hasDisliked) {
            // Case 2: User already disliked before, remove the dislike
            return {
              ...item,
              disLikes: item.disLikes?.filter(
                (user) => user.id !== currentUser.id
              ),
            };
          } else if (hasLiked) {
            // Case 1: User liked before, remove like and add dislike
            return {
              ...item,
              disLikes: item.disLikes
                ? [...item.disLikes, currentUser]
                : [currentUser],
              likes: item.likes?.filter((user) => user.id !== currentUser.id),
            };
          } else {
            // Case 3: User neither liked nor disliked, add dislike
            return {
              ...item,
              disLikes: item.disLikes
                ? [...item.disLikes, currentUser]
                : [currentUser],
            };
          }
        }
        return item;
      })
    );
  };

  const setSortedContent = (newContent: T[]) => {
    const sortedContent = newContent.sort((a, b) => {
      if (sortBy === "likes") {
        const aLikeCount = (a.likes?.length || 0) - (a.disLikes?.length || 0);
        const bLikeCount = (b.likes?.length || 0) - (b.disLikes?.length || 0);
        if (aLikeCount !== bLikeCount) {
          return bLikeCount - aLikeCount;
        }
      }
      return (a.published_at || 0) < (b.published_at || 0) ? 1 : -1;
    });

    setContent(sortedContent);
  };

  return {
    content,
    likeClicked,
    dislikeClicked,
    setSortedContent,
    sortBy,
    setSortBy,
    setContent,
  };
};

export default useContentInteractions;
