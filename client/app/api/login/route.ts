import axios from 'axios';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';


export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {data} =  await axios.post('http://localhost:8000/login', body)

    //add cookie in the response

    const response = NextResponse.json({ message: 'Login successful', data: data }, { status: 201 });
    response.cookies.set('token', data.token, { httpOnly: true, secure: true, sameSite: 'strict', maxAge: 60 * 60 * 24 });
    return response;

  } catch (error) {
    return NextResponse.json({message:error?.response?.data}, { status: error?.status });
  }
}