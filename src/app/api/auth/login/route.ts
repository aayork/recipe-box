import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import connectMongoDB from '@/libs/mongodb';
import { User } from '@/models/UserSchema';

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json({ message: 'Email and password are required.' }, { status: 400 });
    }

    await connectMongoDB();

    const user = await User.findOne({ email });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return NextResponse.json({ message: 'Invalid email or password.' }, { status: 401 });
    }

    // Include username in the response
    return NextResponse.json({
      message: 'Login successful.',
      user: {
        id: user._id.toString(),
        email: user.email,
        username: user.username, // Add username here
      },
    }, { status: 200 });
  } catch (error) {
    console.error('Error during login:', error);
    return NextResponse.json({ message: 'Internal server error.' }, { status: 500 });
  }
}
