import connectMongoDB from "@/libs/mongodb";
import Item from "@/models/itemSchema";
import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import mongoose from "mongoose";

interface RouteParams {
  params: { id: string };
}

export async function GET(request: NextRequest, { params }: RouteParams) {}

export async function POST(request: NextRequest, { params }: RouteParams) {}

export async function DELETE(request: NextRequest, { params }: RouteParams) {}
