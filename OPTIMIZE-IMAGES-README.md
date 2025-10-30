/# 🖼️ Guía Completa: Optimización de Imágenes en Next.js

## 📋 Índice
1. [Instalación](#instalación)
2. [Uso Básico](#uso-básico)
3. [Uso Avanzado](#uso-avanzado)
4. [Configuración de Git](#configuración-de-git)
5. [Integración en Componentes](#integración-en-componentes)
6. [Renombrar Imágenes](#renombrar-imágenes)
7. [Troubleshooting](#troubleshooting)

---

## 🚀 Instalación

### 1. Instalar Sharp (librería de optimización)
```bash
pnpm add -D sharp
# o
npm install --save-dev sharp
# o
yarn add -D sharp
```

### 2. Crear el archivo `optimize-images.js` en la raíz del proyecto
Copia el código del script universal en un archivo llamado `optimize-images.js` en la raíz de tu proyecto.

### 3. Agregar scripts a `package.json`
Abre tu `package.json` y agrega estos scripts:

```json
{
  "scripts": {
    "dev": "next dev --turbopack",
    "build": "next build",
    "start": "next start",
    "lint": "next lint",
    "optimize": "node optimize-images.js",
    "optimize:high": "node optimize-images.js public/img 90",
    "optimize:products": "node optimize-images.js public/productos 85"
  }
}
```

---

## 💡 Uso Básico

### Optimizar todas las imágenes de `/public/img`
```bash
pnpm optimize
```

Esto:
- ✅ Busca todos los archivos `.jpg` y `.png` en `/public/img`
- ✅ Los convierte a `.webp` con calidad 80
- ✅ Mantiene los originales intactos
- ✅ Muestra estadísticas de ahorro

**Ejemplo de salida:**
```
🔍 Buscando imágenes en: ./public/img

📸 Encontradas 11 imágenes para optimizar

✅ RopaDalix1.jpg → RopaDalix1.webp
   📊 850KB → 220KB (74.1% más ligero)

✅ RopaDalix2.jpg → RopaDalix2.webp
   📊 920KB → 240KB (73.9% más ligero)

...

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🎉 Optimización completada!
📈 11 imágenes procesadas
💾 9.50MB → 2.40MB
🚀 Ahorro total: 74.7%
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

---

## 🎨 Uso Avanzado

### Optimizar con calidad personalizada
```bash
# Calidad baja (más ligero, menor calidad)
node optimize-images.js public/img 60

# Calidad media (recomendado)
pnpm optimize

# Calidad alta (más pesado, mayor calidad)
pnpm optimize:high
```

### Optimizar carpetas específicas
```bash
# Optimizar productos
node optimize-images.js public/productos 85

# Optimizar banners
node optimize-images.js public/banners 90

# Optimizar iconos
node optimize-images.js public/icons 70
```

### Crear scripts personalizados en package.json
```json
{
  "scripts": {
    "optimize:banners": "node optimize-images.js public/banners 95",
    "optimize:thumbs": "node optimize-images.js public/thumbnails 70",
    "optimize:all": "pnpm optimize && pnpm optimize:banners"
  }
}
```

---

## 📦 Configuración de Git

### Opción 1: Subir solo WebP (Recomendado para producción)

**Ventajas:**
- ✅ Repositorio más ligero
- ✅ Solo imágenes optimizadas en producción

**Desventajas:**
- ❌ Si pierdes los `.webp`, necesitas regenerarlos

**`.gitignore`:**
```gitignore
# Ignorar imágenes originales pesadas
public/img/*.jpg
public/img/*.jpeg
public/img/*.png

# Las imágenes .webp SÍ se suben (no están ignoradas)
```

**Explicación:** Al ignorar `.jpg` y `.png`, solo se subirán los `.webp`.

### Opción 2: Subir JPG y WebP (Recomendado para desarrollo)

**Ventajas:**
- ✅ Tienes backup de originales
- ✅ Puedes regenerar WebP cuando quieras
- ✅ Más seguro

**Desventajas:**
- ❌ Repositorio más pesado

**`.gitignore`:**
```gitignore
# No ignores nada, sube todo
# (o simplemente no agregues estas líneas)
```

### Opción 3: Ignorar JPG pero con excepciones

Si quieres ignorar la mayoría pero mantener algunos:

```gitignore
# Ignorar todas las imágenes JPG
public/img/*.jpg

# EXCEPTO estas (el ! significa "excepto")
!public/img/logo.jpg
!public/img/backup-importante.jpg
```

---

## 🔗 Integración en Componentes

### Actualizar rutas después de optimizar

**Antes:**
```jsx
import Image from "next/image";

<Image
  src="/img/RopaDalix1.jpg"  // ❌ Archivo original pesado
  alt="Producto"
  width={800}
  height={600}
/>
```

**Después:**
```jsx
import Image from "next/image";

<Image
  src="/img/RopaDalix1.webp"  // ✅ Archivo optimizado
  alt="Producto"
  width={600}
  height={900}
  quality={75}
  loading="lazy"
  placeholder="blur"
  blurDataURL="data:image/jpeg;base64,..."
/>
```

---

## 📝 Workflow Completo: Agregar Nuevas Imágenes

### Paso a paso:

1. **Guarda tu imagen nueva:**
   ```
   public/img/NuevaColeccion.jpg
   ```

2. **Optimiza:**
   ```bash
   pnpm optimize
   ```

3. **Usa en tu código:**
   ```jsx
   <Image src="/img/NuevaColeccion.webp" ... />
   ```

4. **Commit:**
   ```bash
   git add public/img/NuevaColeccion.webp
   git commit -m "Add new collection image (optimized)"
   ```

---

## 🔄 Renombrar Imágenes Masivamente

### Linux / Mac / Git Bash:

```bash
cd public/img

# Renombrar RopaDalix1-10.webp → Coleccion1-10.webp
for i in {1..10}; do 
  mv "RopaDalix$i.webp" "Coleccion$i.webp"
done

# Renombrar con prefijo
for file in *.webp; do
  mv "$file" "nueva_${file}"
done
```

### Windows PowerShell:

```powershell
cd public/img

# Renombrar RopaDalix1-10.webp → Coleccion1-10.webp
1..10 | ForEach-Object { 
  Rename-Item "RopaDalix$_.webp" "Coleccion$_.webp" 
}

# Renombrar con prefijo
Get-ChildItem *.webp | Rename-Item -NewName { "nueva_" + $_.Name }
```

### Herramienta Visual (Cross-platform):

Usa **Bulk Rename Utility** (Windows) o **NameChanger** (Mac) para renombrar con interfaz gráfica.

---

## 🛠️ Troubleshooting

### Error: "Cannot find module 'sharp'"
```bash
pnpm add -D sharp
# o elimina node_modules y reinstala
rm -rf node_modules package-lock.json
pnpm install
```

### Error: "ENOENT: no such file or directory"
Verifica que la carpeta existe:
```bash
mkdir -p public/img
```

### Las imágenes no se ven en el navegador
1. Verifica que el archivo `.webp` existe en `/public/img`
2. Revisa que la ruta sea correcta: `/img/nombre.webp` (sin `public`)
3. Reinicia el servidor de desarrollo: `pnpm dev`

### Las imágenes se ven pixeladas
Aumenta la calidad:
```bash
node optimize-images.js public/img 90
```

### El script no optimiza todas las imágenes
El script solo procesa `.jpg`, `.jpeg` y `.png`. Si tienes otros formatos (GIF, AVIF), agrégalos manualmente al array:

```javascript
const imageFiles = files.filter(file => 
  /\.(jpg|jpeg|png|gif)$/i.test(file)  // Agrega |gif aquí
);
```

---

## 📊 Comparación de Calidades

| Calidad | Uso Recomendado | Peso Aproximado | Calidad Visual |
|---------|-----------------|-----------------|----------------|
| 60-70   | Thumbnails, miniaturas | 🟢 Muy ligero | ⭐⭐⭐ |
| 75-80   | Imágenes generales, carousel | 🟡 Ligero | ⭐⭐⭐⭐ |
| 85-90   | Hero images, productos destacados | 🟠 Medio | ⭐⭐⭐⭐⭐ |
| 95-100  | Imágenes críticas (evitar) | 🔴 Pesado | ⭐⭐⭐⭐⭐ |

---

## 🎯 Mejores Prácticas

### ✅ DO (Recomendado)
- Optimiza TODAS las imágenes antes de subirlas
- Usa calidad 75-85 para la mayoría de casos
- Mantén los nombres descriptivos: `producto-camisa-roja.webp`
- Usa el componente `Image` de Next.js siempre
- Agrega `loading="lazy"` a imágenes below-the-fold
- Configura `sizes` para responsive correcto

### ❌ DON'T (Evitar)
- No uses `quality={100}` innecesariamente
- No subas imágenes sin optimizar
- No uses `<img>` en lugar de `<Image>`
- No cargues todas las imágenes como `priority`
- No ignores las advertencias de peso en build

---

## 🚀 Comandos Rápidos (Cheat Sheet)

```bash
# Optimizar todo con valores por defecto
pnpm optimize

# Optimizar con alta calidad
pnpm optimize:high

# Optimizar carpeta específica
node optimize-images.js public/productos 85

# Ver tamaño de imágenes
ls -lh public/img/*.webp

# Eliminar todas las imágenes WebP (Windows PowerShell)
Remove-Item public/img/*.webp

# Eliminar todas las imágenes WebP (Linux/Mac)
rm public/img/*.webp
```

---

## 📞 Soporte

Si tienes problemas:
1. Verifica que Sharp esté instalado: `pnpm list sharp`
2. Revisa que la carpeta exista: `ls public/img`
3. Ejecuta con más detalle: `node optimize-images.js public/img 80`

---

## 📄 Licencia

Este script es de uso libre para el proyecto Dalix.

---

**Última actualización:** Octubre 2025  
**Versión:** 1.0.0