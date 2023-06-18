import { cookies } from 'next/dist/client/components/headers';
import React from 'react';
import { redirect } from 'next/navigation';
import { Post as PostType, Session, Tags } from '@/utils/types';
import Post from '@/components/Post';
import styles from '../../styles/Dashboard.module.scss';
import { Metadata } from 'next';
import PostForm from '@/components/PostForm';

export const generateMetadata = async (): Promise<Metadata> => {
  const session: Session | null = cookies().has('session') ? JSON.parse(cookies().get('session')!.value) : null;

  return {
    title: `${session?.user.login} - Dashboard`,
  };
};

const Dashboard = async () => {
  if (!cookies().has('session')) {
    redirect('/auth');
  }

  const session: Session | null = cookies().has('session') ? JSON.parse(cookies().get('session')!.value) : null;
  const myPosts: PostType[] = session
    ? await (
        await fetch(process.env.API_URL + '/myPosts', {
          next: { revalidate: 300, tags: [Tags.posts] },
          headers: { Authorization: session.token },
        })
      ).json()
    : [];

  return (
    <div className={styles.container}>
      <h2>Hello, {session?.user.login}!</h2>
      <PostForm />
      <div className={styles['post-list']}>
        {myPosts.map((post) => (
          <Post key={post._id} post={post} />
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
