export interface UserData {
  login: string;
}

export interface UserDTO extends UserData {
  password: string;
}

export interface User extends UserData {
  _id: string;
}

export interface PostDTO {
  title: string;
  body: string;
}

export interface Post extends PostDTO {
  _id: string;
  author: User;
  createdAt: string;
}

export interface Session {
  token: string;
  user: User;
}

export const Tags = {
  posts: 'posts',
};
