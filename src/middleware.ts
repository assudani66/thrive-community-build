import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs'

import { NextResponse } from 'next/server'

import { NextRequest } from 'next/server'

export async function middleware(req: NextRequest) {
  const res = NextResponse.next()
  const supabase = createMiddlewareClient({ req, res })
  const {data}  = await supabase.auth.getSession()
  console.log(data)
  if(!data.session){
    console.log(data)
    return NextResponse.redirect(new URL('/auth',req.nextUrl))
  }
  
  return res
}

export const config = {
  matcher:[
    '/',
    '/profile',
    '/create'
]
}