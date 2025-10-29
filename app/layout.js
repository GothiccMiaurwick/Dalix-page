import "./globals.css";
import Footer from "../components/footer/Footer";
import Navbar from "../components/NavBar/Navbar.jsx";
import SessionProvider from "../components/SessionProvider";

export const metadata = {
  title: "Dalix",
  description: "Dalix Application",
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <head>
        <link
          rel="stylesheet"
          href="https://cdn-uicons.flaticon.com/3.0.0/uicons-brands/css/uicons-brands.css"
        />
        <link
          rel="stylesheet"
          href="https://cdn-uicons.flaticon.com/3.0.0/uicons-solid-rounded/css/uicons-solid-rounded.css"
        />
        <link
          rel="stylesheet"
          href="https://cdn-uicons.flaticon.com/3.0.0/uicons-regular-straight/css/uicons-regular-straight.css"
        />
        <title>Dalix</title>
        <meta name="description" content="Dalix Application" />
      </head>
      <body className="antialiased">
        <SessionProvider>
          <Navbar />
          {children}
          <Footer />
        </SessionProvider>
      </body>
    </html>
  );
}
