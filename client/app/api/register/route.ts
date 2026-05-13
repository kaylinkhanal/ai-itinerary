import axios from 'axios';
import { NextResponse } from 'next/server';


export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {data} =  await axios.post('http://localhost:8080/api/v1/auth/login', body)

    return NextResponse.json({ message: 'User created', data: data }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 });
  }
}