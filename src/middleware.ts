import { clerkMiddleware } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export default clerkMiddleware(async (auth, req: NextRequest) => {
  const { userId } = await auth()
  const { pathname } = req.nextUrl

  // Protect all /admin routes — unauthenticated users go to sign-in
  if (pathname.startsWith('/admin')) {
    if (!userId) {
      return NextResponse.redirect(new URL('/sign-in', req.url))
    }
  }

  // Only redirect signed-in users from / to the dashboard
  if (pathname === '/' && userId) {
    return NextResponse.redirect(new URL('/admin/analytics', req.url))
  }
})

export const config = {
  matcher: [
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    '/(api|trpc)(.*)',
  ],
}
