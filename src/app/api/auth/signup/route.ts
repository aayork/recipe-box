import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import connectMongoDB from '@/libs/mongodb';
import { User } from '@/models/UserSchema';

export async function POST(req: NextRequest) {
  try {
    const { username, email, password } = await req.json();

    if (!username || !email || !password) {
      return NextResponse.json({ message: 'All fields are required.' }, { status: 400 });
    }

    await connectMongoDB();

    const hashedPassword = await bcrypt.hash(password, 5); // Using bcrypt with a saltRounds of 5
    const newUser = await User.create({
      username,
      email,
      password: hashedPassword,
    });

    return NextResponse.json(
      {
        message: 'User created successfully.',
        user: {
          _id: newUser._id,
          username: newUser.username,
          email: newUser.email,
          createdAt: newUser.createdAt,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error creating user:', error);
    return NextResponse.json({ message: 'Internal server error.' }, { status: 500 });
  }
}

