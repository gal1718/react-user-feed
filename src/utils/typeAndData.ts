import { faker } from "@faker-js/faker";

export type SortKey = "published_at" | "Best";

export type User = {
  id: string;
  avatar: string;
  birthday: Date;
  email: string;
  firstName: string;
  lastName: string;
  user_name: string;
  sex: string;
};

// Base type for shared properties
export type BaseContent = {
  id: string;
  user_id: string;
  body: string;
  published_at: string;
  imageUrl?: string;
  likes?: User[];
  disLikes?: User[];
  comments?: Comment[];
};

// Comment type extending from BaseContent and adding a unique property
export type Comment = BaseContent;
// Post type extending from BaseContent and adding unique properties
export type Post = BaseContent & {
  title: string;
};

export function createRandomUser(): User {
  const id = faker.string.uuid()
  const birthday = faker.date.birthdate();
  const sex = faker.person.sexType();
  const firstName = faker.person.firstName(sex);
  const lastName = faker.person.lastName();
  const email = faker.internet.email({ firstName, lastName });
  const user_name = firstName + " " + lastName;
  const avatar = faker.image.avatar();

  return {
    id,
    avatar,
    birthday,
    email,
    firstName,
    lastName,
    user_name,
    sex,
  };
}

export function createRandomPost(user_id: string): Post {
  return {
    id: faker.string.uuid(),
    user_id,
    title: faker.lorem.sentence(),
    body: faker.lorem.paragraphs(3),
    published_at: faker.date.past().toISOString(),
    imageUrl: faker.image.url(),
    comments: undefined,
  };
}

export type Mode = "liked" | "disliked" | "none";
