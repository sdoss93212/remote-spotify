import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

export async function middleware(req) {
    //token for logged in state
    const token = await getToken({ req, secret:process.env.JWT_SECRET });
    const {pathname} = req.nextUrl;

    //Allow if i>it is request for next auth session || ii>user has a token
    if(pathname.includes('/api/auth') || token){
        return NextResponse.next(); //continue 
    }
   
    if(!token && pathname!= '/login') {
        return NextResponse.redirect('/login');
    }

}