import Post from '@/components/Post';
import { Post as PostType, Tags } from '@/utils/types';
import styles from '../styles/Home.module.scss';

const Home = async () => {
  const response = await fetch(process.env.API_URL + '/posts', { next: { revalidate: 300, tags: [Tags.posts] } });
  const posts: PostType[] = await response.json();

  return (
    <div className={styles['post-list']}>
      {posts.map((post) => (
        <Post key={post._id} post={post} />
      ))}
    </div>
  );
};

export default Home;
