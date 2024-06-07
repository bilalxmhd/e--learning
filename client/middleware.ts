// import { authMiddleware } from "@clerk/nextjs/server";

// export default authMiddleware({
//   publicRoutes: ["/", "/courses", "/course-preview/(.*)"],
// });

// export const config = {
//   matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
// };


// import { NextRequest, NextResponse } from "next/server";
// import { authMiddleware } from "@clerk/nextjs/server";

// // A simple response function for edge environment
// const edgeHandler = (req: NextRequest) => {
//   return NextResponse.next(); // Allow all requests in edge environment
// };

// // Main middleware function
// export default async function middleware(req: NextRequest, ev: any) {
//   if (process.env.VERCEL_EDGE) {
//     return edgeHandler(req);
//   } else {
//   return authMiddleware({
//     publicRoutes: ["/", "/courses", "/course-preview/(.*)"],
//   })(req, ev);
// }
// }  
  

// export const config = {
//   matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
// };

import { NextRequest, NextResponse } from 'next/server';

// Mock or alternative implementation for Clerk authentication
const authenticateUser = (req: NextRequest) => {
  // Example: Check authorization header or session cookie
  const authHeader = req.headers.get('Authorization');
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return false;
  }
  
  // Example: Validate token
  const token = authHeader.split(' ')[1];
  return verifyToken(token);
};

const verifyToken = (token: string) => {
  // Example: Dummy token validation logic
  return token === 'valid_token';
};

// A simple response function for edge environment
const edgeHandler = (req: NextRequest) => {
  return NextResponse.next(); // Allow all requests in edge environment
};

// Main middleware function
export default async function middleware(req: NextRequest, ev: any) {
  if (isEdge()) {
    return edgeHandler(req);
  } else {
    // Perform authentication check using an alternative method
    if (!authenticateUser(req)) {
      return NextResponse.redirect('/login');
    }
    
    // Proceed with the actual logic if authenticated
    return await handleRequest(req, ev);
  }
}

async function handleRequest(req: NextRequest, ev: any) {
  // Example: Handle your request logic here
  return NextResponse.json({ message: 'Authenticated request' });
}

// Check if running in an edge environment
const isEdge = () => {
  // Checking for typical Edge Function environment
  return typeof EdgeRuntime !== 'undefined';
};

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
