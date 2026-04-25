# Filmmaker Portfolio Website

Sitio web de portafolio para filmmakers con diseño cinematográfico en dark mode.

## 🎬 Características

- Diseño responsive (móvil, tablet, desktop)
- Galería de videos con embeds de YouTube/Vimeo
- Sección About con barras de habilidades
- Formulario de contacto funcional
- Animaciones suaves y efectos visuales
- Dark mode cinematográfico
- Navegación sticky con efecto blur

## 📁 Estructura del Proyecto

```
filmmaker-website/
├── index.html          # Página principal
├── css/
│   └── style.css       # Estilos y diseño
├── js/
│   └── main.js         # Funcionalidad JavaScript
├── images/             # Carpeta para tus imágenes
└── README.md           # Este archivo
```

## 🚀 Cómo Usar

### 1. Personalizar el Contenido

**index.html:**
- Cambia el título "FILMMAKER" por tu nombre o marca
- Actualiza los textos de la sección Hero
- Reemplaza los embeds de YouTube con tus videos reales
- Edita la sección About con tu información
- Actualiza los datos de contacto

### 2. Reemplazar Videos

Busca en el HTML los iframes de YouTube:
```html
<iframe src="https://www.youtube.com/embed/TU_VIDEO_ID"></iframe>
```

Para Vimeo:
```html
<iframe src="https://player.vimeo.com/video/TU_VIDEO_ID"></iframe>
```

### 3. Agregar tu Foto

Coloca tu foto en la carpeta `images/` y actualiza el CSS o el HTML:
```html
<div class="about-image">
    <img src="images/tu-foto.jpg" alt="Tu Nombre">
</div>
```

### 4. Personalizar Colores

En `css/style.css`, modifica las variables CSS:
```css
:root {
    --accent: #e50914;        /* Color principal (rojo Netflix) */
    --bg-primary: #0a0a0a;    /* Fondo principal */
    --bg-secondary: #121212;  /* Fondo secundario */
}
```

### 5. Configurar Formulario de Contacto

El formulario actualmente muestra un mensaje de éxito. Para hacerlo funcional:

**Opción A - Formspree (gratis, sin backend):**
1. Ve a https://formspree.io
2. Regístrate y obtén tu endpoint
3. En el HTML, cambia:
```html
<form action="https://formspree.io/f/TU_ID" method="POST">
```

**Opción B - EmailJS:**
1. Ve a https://www.emailjs.com
2. Configura tu servicio de email
3. Usa su SDK en el JavaScript

## 🎨 Personalización Adicional

### Cambiar Fuentes

El sitio usa:
- **Playfair Display** para títulos (elegante, cinematográfico)
- **Inter** para texto (limpio, moderno)

Puedes cambiarlas en Google Fonts: https://fonts.google.com

### Agregar Más Secciones

Copia la estructura de una sección existente:
```html
<section id="nueva-seccion" class="nueva-seccion">
    <div class="container">
        <!-- Tu contenido -->
    </div>
</section>
```

## 📱 Responsive

El sitio es completamente responsive:
- **Desktop:** 3 columnas de videos
- **Tablet:** 2 columnas
- **Móvil:** 1 columna, menú hamburguesa

## 🌐 Publicar tu Sitio

### Opción 1: GitHub Pages (Gratis)
```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/tu-usuario/filmmaker-website.git
git push -u origin main
```
Luego activa GitHub Pages en Settings > Pages

### Opción 2: Netlify (Gratis)
1. Arrastra la carpeta a https://app.netlify.com/drop
2. ¡Listo! Tu sitio está online

### Opción 3: Vercel (Gratis)
```bash
npm i -g vercel
vercel
```

### Opción 4: Hosting Tradicional
Sube los archivos via FTP a tu hosting (Hostinger, GoDaddy, etc.)

## 🛠️ Comandos Útiles

**Abrir en el navegador:**
```bash
# Linux
xdg-open index.html

# macOS
open index.html

# Windows
start index.html
```

**Servidor local con Python:**
```bash
python3 -m http.server 8000
# Luego abre http://localhost:8000
```

**Servidor local con PHP:**
```bash
php -S localhost:8000
```

## 📞 Soporte

Si necesitas ayuda adicional o quieres agregar funcionalidades como:
- Galería de fotos
- Blog integrado
- Sistema de reservas
- Integración con redes sociales
- Analytics

¡No dudes en pedirlo!

## 📄 Licencia

Libre uso para proyectos personales y comerciales.

---

**Hecho con ❤️ para filmmakers**
