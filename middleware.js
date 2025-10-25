export { default } from "next-auth/middleware";

// Proteger todas las rutas que empiezan con /admin
export const config = {
  matcher: ["/admin/:path*"],
};
