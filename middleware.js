import { withAuth } from "next-auth/middleware";

export default withAuth({
  pages: {
    signIn: "/auth/signin",
  },
  callbacks: {
    authorized: ({ token }) => !!token,
  },
});

// Protege solo las rutas de admin
export const config = {
  matcher: [
    "/admin/:path*",
    // NO incluyas /auth/signin aquí
  ],
};