import { NextResponse } from "next/server";
import jwt_decode from "jwt-decode";

export default function middleware(req) {
  const jwt = req.cookies.get("PokemonToken");

  if (
    req.nextUrl.pathname.startsWith("/signin") ||
    req.nextUrl.pathname.startsWith("/signup")
  ) {
    if (jwt) {
      const decoded = jwt_decode(jwt);
      if (decoded.exp > Date.now() / 1000) {
        const url = req.nextUrl.clone();
        url.pathname = "/dashboard/pokemonList";
        return NextResponse.redirect(url);
      }
    } else {
      return NextResponse.next();
    }
  }

  if (req.nextUrl.pathname.startsWith("/dashboard")) {
    if (jwt) {
      const decoded = jwt_decode(jwt);
      if (decoded.exp > Date.now() / 1000) {
        return NextResponse.next();
      }
    } else {
      const url = req.nextUrl.clone();
      url.pathname = "/signin";
      return NextResponse.redirect(url);
    }
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/signin", "/signup", "/dashboard/:path*"],
};
