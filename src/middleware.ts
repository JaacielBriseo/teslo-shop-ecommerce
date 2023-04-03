import { NextFetchEvent, NextRequest, NextResponse } from 'next/server';
import { jwt } from '../utils';
export async function middleware(req:NextRequest,ev:NextFetchEvent){
  
  // const token = req.cookies.get('token')

  // try {
  //   await jwt.isValidToken(token?.value || '')
  //   return NextResponse.next()
  // } catch (error) {
  //   const requestedPage = req.nextUrl.pathname
  //   return NextResponse.redirect(`/auth/login?p=${requestedPage}`)
  // }
}