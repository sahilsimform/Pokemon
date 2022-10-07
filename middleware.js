import { NextResponse } from "next/server";
import jwt_decode from "jwt-decode";

export default function middleware(req) {
  const jwt = req.cookies.get("PokemonToken");
  // const response = new NextResponse();
  // const url = req.nextUrl.clone();

  if (
    req.nextUrl.pathname.startsWith("/signin") ||
    req.nextUrl.pathname.startsWith("/signup")
  ) {
    if (jwt) {
      try {
        const decoded = jwt_decode(jwt);
        if (decoded.exp > Date.now() / 1000) {
          const url = req.nextUrl.clone();

          url.pathname = "/dashboard/pokemonList";
          return NextResponse.redirect(url);
        }
      } catch (error) {
        console.log("login broke", error);
        const url = req.nextUrl.clone();
        url.pathname = "/signin";
        return NextResponse.redirect(url);
      }
    } else {
      return NextResponse.next();
    }
  }
  if (req.nextUrl.pathname.startsWith("/dashboard")) {
    if (jwt) {
      try {
        const decoded = jwt_decode(jwt);
        if (decoded.exp > Date.now() / 1000) {
          return NextResponse.next();
        } else {
          const url = req.nextUrl.clone();
          url.pathname = "/signin";
          return NextResponse.redirect(url);
        }
      } catch (error) {
        console.log("dashboard", error);
        const url = req.nextUrl.clone();
        url.pathname = "/signin";

        const response = NextResponse.redirect(url);
        // response.setHeader("Set-Cookie", "PokemonToken=; Max-Age=0; ");

        response.cookies.set("PokemonToken", "", {
          maxAge: 0,
        });

        // response.
        return response;
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
