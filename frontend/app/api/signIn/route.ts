import { NextResponse } from 'next/server';
import { auth } from '../auth';

export const POST = async (req: Request): Promise<NextResponse<any>> => {
  return auth(req, 'Sign In');
};
