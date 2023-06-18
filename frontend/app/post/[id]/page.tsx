import { Post } from '@/utils/types';
import moment from 'moment';
import { Metadata } from 'next';
import React from 'react';
import styles from '../../../styles/PostPage.module.scss';

interface Props {
  params: { id: string };
}

const getData = async (id: string): Promise<Post> => {
  const response = await fetch(process.env.API_URL + `/posts/${id}`, { next: { revalidate: 300 } });

  return response.json();
};

export const generateMetadata = async ({ params }: Props): Promise<Metadata> => {
  const post = await getData(params.id);

  return { title: post.title, description: `Posted by ${post.author.login}` };
};

const Post = async ({ params }: Props) => {
  const post = await getData(params.id);

  return (
    <>
      <h1>{post.title}</h1>
      <p className={styles.details}>
        Posted by {post.author.login} {moment(post.createdAt).calendar()}
      </p>
      <pre>{post.body}</pre>
    </>
  );
};

export default Post;
