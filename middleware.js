export const dynamic='force-dynamic'
import { withAuth } from "next-auth/middleware"

export default withAuth(
  // `withAuth` augments your `Request` with the user's token.
  function middleware(req) {
        //console.log(req.nextauth.token)
  },
  {
    callbacks: {
      authorized: ({ token }) => token?.roles === 100,
    },
  },
)

export const config = {
    matcher: [
        "/api/dashboard/:path*",    
    ]
}









// import { getToken } from "next-auth/jwt"
// import { NextResponse } from 'next/server';


// export async function middleware(req) {
//     const path = req.nextUrl.pathname;
//     console.log(path)
//    if (
//       path == "/api/users/" ||
//       path == "api/dashboard/" || 
//       path == "api/dashboard/persons" 

//    ) {
//        try {
//         const token = await getToken({ req })
//         console.log("Middleware token", token)
//         NextResponse.next()
     
           
           
           
//         //  const token = req.headers.get("token");
//         //  const { payload } = await jwtVerify(token, new TextEncoder().encode(process.env.TOKEN_SECRET));

//         //  const response = NextResponse.next()
//         //  response.headers.append('user-id', payload._id);
//         //  return response;

//       }
//       catch (error) {
//          console.log(error);
//          return NextResponse.json({ message: "عدم دسترسی" }, { status: 402 });
//       }

//    }
// }