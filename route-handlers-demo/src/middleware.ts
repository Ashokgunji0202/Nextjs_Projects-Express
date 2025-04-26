import { auth, clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { metadata } from "./app/layout";

// const isProtectedRoute = createRouteMatcher(["/user-profile"]);

// Define public routes (accessible without authentication)
const isPublicRoute = createRouteMatcher(["/", "/sign-in(.*)", "/sign-up(.*)"]);

// Define admin routes (accessible only to users with admin role)
const isAdminRoute = createRouteMatcher(["/admin(.*)"]);

export default clerkMiddleware(async (auth, req) => {
  // if(isProtectedRoute(req)){
  //   await auth.protect();
  // }

  // Destructure userId, sessionClaims, and redirectToSignIn from the auth context
  const { userId, redirectToSignIn, sessionClaims } = await auth();

  // if the route is an admin route and the user is not an admin, redirect to the main page
  // the check for the role is done in the auth middleware so we can trust the result
  if (isAdminRoute(req) && sessionClaims?.metadata?.role !== "admin") {
    console.log("Detected role:", sessionClaims?.metadata?.role);
    const url = new URL("/", req.url);

    console.log("Redirecting to main page");
    return NextResponse.redirect(url);
    // the redirect is done using NextResponse.redirect and the url is constructed using the URL API
  }

  // if user is not logged in and route is not public, redirect to sign-in
  // if (!userId && !isPublicRoute(req)) {
  //   return redirectToSignIn();
  // }

  // if(!isPublicRoute(req)){
  //   await auth.protect();
  // }
});

// Matcher configuration to apply middleware only to the required routes
export const config = {
  // Matcher ignoring `/_next/` and `/api/`
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
};
