// import { authMiddleware } from "@clerk/nextjs/server";

// export default authMiddleware({
//   publicRoutes: ["/", "/courses", "/course-preview/(.*)"],
// });

// export const config = {
//   matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
// };
import { NextRequest, NextResponse } from "next/server";
import { authMiddleware } from "@clerk/nextjs/server";

// A simple response function for edge environment
const edgeHandler = (req: NextRequest) => {
  return NextResponse.next(); // Allow all requests in edge environment
};

// Main middleware function
export default async function middleware(req: NextRequest, ev: any) {
  return authMiddleware({
    publicRoutes: ["/", "/courses", "/course-preview/(.*)"],
  })(req, ev);
}

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
