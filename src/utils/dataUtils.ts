// src/utils/dataUtils.ts

import { faker } from "@faker-js/faker";

export type SortKey = "published_at" | "likes";

// Define User and Post interfaces/types if not already defined
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

export type Comment = {
  post_id: string;
  user_id: string;
  text: string;
};

export type Post = {
  id: string;
  user_id: string;
  title: string;
  body: string;
  published_at: string;
  imageUrl: string;
  likes: number;
  comments: Comment[] | undefined;
};

export function createRandomUser(): User {
  const sex = faker.person.sexType();
  const firstName = faker.person.firstName(sex);
  const lastName = faker.person.lastName();
  const email = faker.helpers.unique(faker.internet.email, [
    firstName,
    lastName,
  ]);
  const user_name = firstName + " " + lastName;

  return {
    id: faker.string.uuid(),
    avatar: faker.image.avatar(),
    birthday: faker.date.birthdate(),
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
    likes: faker.datatype.number({ min: 0, max: 100 }),
    comments: undefined,
  };
}

