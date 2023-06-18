import { Post, Session } from '@/utils/types';
import classNames from 'classnames';
import moment from 'moment';
import { cookies } from 'next/dist/client/components/headers';
import Link from 'next/link';
import styles from '../styles/Post.module.scss';
import PostDelete from './PostDelete';

interface Props {
  post: Post;
}

const Post = ({ post }: Props) => {
  const session: Session | null = cookies().has('session') ? JSON.parse(cookies().get('session')!.value) : null;

  return (
    <div className={classNames('paper', styles.container)}>
      <h1>{post.title}</h1>
      <p>
        {post.author.login} {moment(post.createdAt).calendar()}
      </p>
      <Link href={`/post/${post._id}`}>
        <button>Read More</button>
      </Link>
      {session && session.user._id === post.author._id && <PostDelete id={post._id} />}
    </div>
  );
};

export default Post;
