'use client';

import axios from 'axios';
import { useRouter } from 'next/navigation';

interface Props {
  id: string;
}

const PostDelete = ({ id }: Props) => {
  const router = useRouter();

  const remove = async () => {
    try {
      await axios.delete(`/api/posts/${id}`);
      router.refresh();
    } catch (err: any) {
      console.error(err);
      alert(err.response.data.message ?? err.message);
    }
  };

  return (
    <button onClick={remove} style={{ width: 'min-content' }} className={'button__danger'}>
      Delete
    </button>
  );
};

export default PostDelete;
