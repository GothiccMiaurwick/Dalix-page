# Configuración de Autenticación - DALIX Admin

## 📋 Resumen
Este sistema protege **solo el panel de administración** (`/admin/products`). Los usuarios pueden navegar libremente por el catálogo sin necesidad de login.

## 🔧 Pasos de Instalación

### 1. Crear archivo de variables de entorno

Crea un archivo `.env.local` en la raíz del proyecto:

```bash
# Credenciales del administrador
ADMIN_USERNAME=admin
ADMIN_PASSWORD=TuPasswordSeguro123!

# Secret para NextAuth (genera uno nuevo ejecutando el comando de abajo)
NEXTAUTH_SECRET=tu_secret_key_muy_largo_y_aleatorio_aqui
NEXTAUTH_URL=http://localhost:3000
```

### 2. Generar un NEXTAUTH_SECRET seguro

Ejecuta este comando en tu terminal:

```bash
openssl rand -base64 32
```

Copia el resultado y pégalo en `NEXTAUTH_SECRET` en tu archivo `.env.local`

### 3. Agregar .env.local al .gitignore

Asegúrate de que tu `.gitignore` incluya:

```
.env*
.env.local
```

Ya está incluido en tu proyecto actual ✅

### 4. Crear los archivos necesarios

Necesitas crear/actualizar estos archivos:

#### 📁 `middleware.js` (en la raíz del proyecto)
```javascript
export { default } from "next-auth/middleware";

// Proteger solo las rutas de admin
export const config = {
  matcher: ["/admin/:path*"],
};
```

#### 📁 `components/SessionProvider.jsx`
```javascript
"use client";

import { SessionProvider as NextAuthSessionProvider } from "next-auth/react";

export default function SessionProvider({ children }) {
  return <NextAuthSessionProvider>{children}</NextAuthSessionProvider>;
}
```

#### 📁 `app/auth/signin/page.js`
(Ya generado en el artefacto anterior)

#### 📁 `app/admin/products/page.js`
(Ya actualizado con el botón de logout en el artefacto anterior)

#### 📁 `app/layout.js`
Actualiza tu layout para incluir el SessionProvider:

```javascript
import "./globals.css";
import Navbar from "../components/NavBar/Navbar.jsx";
import Footer from "../components/footer/Footer";
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
```

### 5. Verificar que el archivo de NextAuth está correcto

Tu archivo `app/api/auth/[...nextauth]/route.js` ya está correcto ✅

## 🚀 Uso

### Para usuarios normales:
- Pueden navegar libremente por todo el sitio
- No necesitan login
- Acceso a: `/`, `/catalogo`, `/catalogo/[producto]`, `/collection`

### Para el administrador:
1. Ir a `http://localhost:3000/admin/products`
2. Serás redirigido automáticamente a `/auth/signin`
3. Ingresa las credenciales configuradas en `.env.local`
4. Una vez autenticado, tendrás acceso completo al panel de administración
5. Para cerrar sesión, haz clic en el botón "Cerrar Sesión" en la esquina superior derecha

## 🔒 Seguridad

### Para producción:
1. **NUNCA** subas el archivo `.env.local` a GitHub
2. Cambia las credenciales a algo más seguro que el ejemplo
3. Usa un password fuerte con:
   - Al menos 12 caracteres
   - Mayúsculas y minúsculas
   - Números
   - Símbolos especiales
4. Genera un nuevo `NEXTAUTH_SECRET` único para tu proyecto
5. En producción (Vercel), configura las variables de entorno en el panel de control

### Variables de entorno en Vercel:
1. Ve a tu proyecto en Vercel
2. Settings → Environment Variables
3. Agrega las mismas variables de `.env.local`

## 🧪 Pruebas

### Probar que funciona:
1. Inicia el servidor: `npm run dev`
2. Visita `http://localhost:3000` → ✅ Debe funcionar sin login
3. Visita `http://localhost:3000/catalogo` → ✅ Debe funcionar sin login
4. Visita `http://localhost:3000/admin/products` → 🔒 Debe redirigir al login
5. Ingresa credenciales incorrectas → ❌ Debe mostrar error
6. Ingresa credenciales correctas → ✅ Debe acceder al panel admin

## ❓ Solución de Problemas

### Error: "There is a problem with the server configuration"
- Verifica que `NEXTAUTH_SECRET` esté configurado en `.env.local`
- Asegúrate de que `NEXTAUTH_URL` sea `http://localhost:3000` (en desarrollo)

### El middleware no protege las rutas
- Verifica que el archivo `middleware.js` esté en la raíz del proyecto (no en `/app`)
- Reinicia el servidor de desarrollo

### No puedo hacer logout
- Verifica que el botón de logout esté importando correctamente `signOut` de `next-auth/react`

### Las credenciales no funcionan
- Verifica que los valores en `.env.local` coincidan exactamente (sin espacios extra)
- Reinicia el servidor después de cambiar el `.env.local`

## 📝 Notas Adicionales

- El sistema usa NextAuth v4 con el provider de Credentials
- Las contraseñas se comparan en texto plano (para producción considera usar bcrypt)
- La sesión expira automáticamente después de 30 días (configurable en NextAuth)
- El token de sesión se almacena en una cookie HttpOnly segura
