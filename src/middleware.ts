import { authMiddleware, redirectToSignIn } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export default authMiddleware({
	publicRoutes: ["/", "/sign-in/[[...index]]", "/about-us", "/:legal/(.*)"],
	afterAuth(auth, req, evt) {
	  // handle users who aren't authenticated
	  if (!auth.userId && !auth.isPublicRoute) {
		return redirectToSignIn({ returnBackUrl: req.url });
	  }
	  // redirect them to organization selection page
	  if(auth.userId && !auth.orgId && req.nextUrl.pathname !== "/org-selection"){
		const orgSelection = new URL('/org-selection', req.url)
		return NextResponse.redirect(orgSelection)
	  }
	}
  });