import axios from 'axios';
import { NextResponse } from 'next/server';
import { AuthType, Session } from '../auth/page';
import { cookies } from 'next/dist/client/components/headers';
import moment from 'moment';

export const auth = async (req: Request, authType: AuthType): Promise<NextResponse<any>> => {
  try {
    const data = await req.json();
    let response = await axios.post(process.env.API_URL + `/auth/${authType === 'Sign Up' ? 'signUp' : 'signIn'}`, data);

    const token = response.data.token;
    response = await axios.get(process.env.API_URL + '/auth/me', { headers: { Authorization: token } });
    const session: Session = { token, user: response.data };

    cookies().set('session', JSON.stringify(session), { expires: moment().add(29, 'days').valueOf() });

    return NextResponse.json(session);
  } catch (err: any) {
    console.error(err);
    return NextResponse.json({ message: err.response.data.message }, { status: err.response.status });
  }
};
