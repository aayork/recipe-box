import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(request: any) {
  const session = await getToken({ req: request, secret: process.env.AUTH_SECRET });
  const isAuthenticated = !!session;
  console.log(isAuthenticated, request.nextUrl.pathname);

  if (!isAuthenticated && request.nextUrl.pathname !== "/auth") {
    return NextResponse.redirect(new URL("/auth", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/create-item", "/edit-item/:path*"],
};
