import { Session } from '@/utils/types';
import axios from 'axios';
import { revalidateTag } from 'next/cache';
import { cookies } from 'next/dist/client/components/headers';
import { NextResponse } from 'next/server';

interface Params {
  params: { id: string };
}

export const DELETE = async (_req: Request, { params }: Params) => {
  const session: Session | null = cookies().get('session') ? JSON.parse(cookies().get('session')!.value) : null;

  if (!session) {
    return NextResponse.json({ message: 'Invalid session' }, { status: 401 });
  }

  try {
    await axios.delete(`${process.env.API_URL}/posts/${params.id}`, { headers: { Authorization: session.token } });
    revalidateTag('posts');

    return NextResponse.json({ message: 'Success' });
  } catch (err: any) {
    console.error(err);
    return NextResponse.json({ message: err.response.data.message ?? err.message }, { status: err.response.status });
  }
};
