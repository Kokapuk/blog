'use client';

import classNames from 'classnames';
import styles from '../styles/PageForm.module.scss';
import { useRouter } from 'next/navigation';
import { FormEvent, useState } from 'react';
import { PostDTO } from '@/utils/types';
import axios from 'axios';

const PostForm = () => {
  const router = useRouter();
  const [post, setPost] = useState<PostDTO>({ title: '', body: '' });
  const [isLoading, setLoading] = useState(false);

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setLoading(true);

    try {
      await axios.post('/api/posts', post);
      router.refresh();
      setPost({ title: '', body: '' });
    } catch (err: any) {
      console.error(err);
      alert(err.response.data.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={classNames('paper', styles.form)}>
      <input
        onChange={(e) => setPost((prev) => ({ ...prev, title: e.target.value }))}
        value={post.title}
        type='text'
        placeholder='Title'
        minLength={3}
        maxLength={64}
        required
      />
      <textarea
        onChange={(e) => setPost((prev) => ({ ...prev, body: e.target.value }))}
        value={post.body}
        placeholder='Body'
        minLength={16}
        maxLength={512}
        required
      />
      <button disabled={isLoading}>Post</button>
    </form>
  );
};

export default PostForm;
