import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'

const isPublicRoute = createRouteMatcher(['/', '/events/:id','/sign-in(.*)', '/sign-up(.*)'])
const isIgnoredRoute = createRouteMatcher(['/api/webhook/clerk', '/api/webhook/stripe', '/api/uploadthing'])

export default clerkMiddleware((auth, req) => {
  if (!isPublicRoute(req) && !isIgnoredRoute(req)) {
    auth().protect()
  }
})

export const config = {
 matcher: [
   '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
   '/(api|trpc)(.*)',
 ],
}