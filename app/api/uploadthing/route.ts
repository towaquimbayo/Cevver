import { createRouteHandler } from "uploadthing/next";
 
import { ourFileRouter } from "./core";
 
// Export routes for Next App Router
export const { GET, POST } = createRouteHandler({
  router: ourFileRouter,
 
  // Apply an (optional) custom config:
  config: {
    ...(process.env.NODE_ENV === 'production' && {
      callbackUrl: 'https://cevver.com/api/uploadthing/'
    })
  }
});