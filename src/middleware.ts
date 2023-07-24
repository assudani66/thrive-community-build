import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs'

import { NextResponse } from 'next/server'

import { NextRequest } from 'next/server'

export async function middleware(req: NextRequest) {
  const res = NextResponse.next()
  const supabase = createMiddlewareClient({ req, res })
  const {data}  = await supabase.auth.getSession()
  const userDetails = await supabase.from('profiles').select('username').eq('id',data?.session?.user?.id).single()
  
  if(!userDetails?.data?.username && data.session ){
    return NextResponse.redirect(new URL('/profile/edit',req.nextUrl))
  }

  if(!data.session){
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