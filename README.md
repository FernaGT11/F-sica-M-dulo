# 📘 Libro de Física Universitaria - Estilo Serway

## Descripción
Libro de física universitaria en formato web continuo (sin páginas), completamente responsive y adaptable a dispositivos móviles y tablets. Incluye fórmulas matemáticas renderizadas con LaTeX (MathJax) y simuladores interactivos en JavaScript.

## 📁 Estructura de Archivos

```
proyecto/
│
├── index.html           # Página principal HTML
├── libro-web.css        # Estilos CSS responsive
├── libro-web.js         # JavaScript principal (navegación, efectos)
├── simuladores.js       # Simuladores interactivos modulares
│
├── index-original.html  # Tu versión original (respaldo)
├── libro-web-original.css
└── libro-web-original.js
```

## ✨ Características

### 1. **Diseño Responsive**
- ✅ **Desktop** (>768px): Diseño completo con navegación horizontal
- ✅ **Tablet** (481-768px): Diseño optimizado con ajustes de espaciado
- ✅ **Móvil** (<480px): Menú hamburguesa, navegación vertical, tamaños adaptados

### 2. **Fórmulas LaTeX**
- Renderizado con **MathJax 3**
- Soporta notación inline: `$formula$` o `\(formula\)`
- Soporta notación display: `$$formula$$` o `\[formula\]`
- Scroll horizontal automático en fórmulas largas

### 3. **Simuladores Interactivos**
Tres simuladores incluidos:
- 🚗 **MRU** (Movimiento Rectilíneo Uniforme)
- 🪐 **Órbitas Planetarias** (Fuerzas Centrales)
- ⚡ **MAS** (Movimiento Armónico Simple)

Cada simulador se carga bajo demanda para optimizar el rendimiento.

### 4. **Navegación Avanzada**
- Smooth scroll a secciones
- Menú sticky (fijo en la parte superior)
- Botón "volver arriba" automático
- Indicador visual de sección activa
- Menú hamburguesa en móviles

## 🚀 Uso

### Instalación Básica
1. Descarga todos los archivos en la misma carpeta
2. Abre `index.html` en tu navegador
3. ¡Listo! No necesitas servidor web

### Desarrollo Local (opcional)
Si quieres un servidor local:

```bash
# Con Python 3
python -m http.server 8000

# Con Node.js (npx)
npx http-server -p 8000
```

Luego abre: `http://localhost:8000`

## 📝 Cómo Agregar Contenido

### Agregar un nuevo capítulo
```html
<section id="mi-capitulo" class="capitulo">
    <h2>🔬 Capítulo X: Tu Tema</h2>
    
    <article>
        <h3>X.1 Subtema</h3>
        <p>Tu contenido aquí...</p>
        
        <!-- Fórmula display -->
        \[
        E = mc^2
        \]
        
        <!-- Fórmula inline -->
        <p>La energía $E$ es igual a...</p>
    </article>
    
    <div class="ejemplo">
        <strong>📌 Ejemplo X.1:</strong>
        Tu ejemplo aquí...
        \[
        F = ma
        \]
    </div>
</section>
```

### Agregar un nuevo enlace de navegación
```html
<nav id="mainNav">
    <!-- Enlaces existentes -->
    <a href="#mi-capitulo">Mi Capítulo</a>
</nav>
```

### Agregar fórmulas LaTeX

**Inline (dentro de texto):**
```html
<p>La velocidad $v = \frac{d}{t}$ es constante.</p>
```

**Display (ecuación centrada):**
```html
\[
\vec{F} = m\vec{a}
\]
```

**Símbolos comunes:**
- Fracciones: `\frac{numerador}{denominador}`
- Raíces: `\sqrt{x}` o `\sqrt[n]{x}`
- Vectores: `\vec{v}` o `\overrightarrow{AB}`
- Griegos: `\alpha`, `\beta`, `\gamma`, `\Delta`, `\omega`
- Subíndices: `x_0`, `v_{max}`
- Superíndices: `x^2`, `e^{-t}`
- Integrales: `\int_{a}^{b} f(x)\,dx`
- Sumatorias: `\sum_{i=1}^{n} x_i`

## 🎮 Cómo Crear un Nuevo Simulador

1. **Edita `simuladores.js`**
2. **Agrega un nuevo caso en `cargarSimulador()`:**

```javascript
case 'mi-simulador':
    crearMiSimulador(contenedor);
    break;
```

3. **Crea la función del simulador:**

```javascript
function crearMiSimulador(contenedor) {
    contenedor.innerHTML = `
        <div style="background: white; padding: 20px; border-radius: 12px;">
            <h4>Mi Simulador</h4>
            <canvas id="canvas-mi-sim" width="600" height="400"></canvas>
            <button onclick="iniciarMiSim()">Iniciar</button>
        </div>
    `;
    
    // Tu lógica del simulador aquí
    window.iniciarMiSim = function() {
        // Código de animación
    };
}
```

4. **Agrega el contenedor en HTML:**

```html
<div class="simulador-container" id="sim-mi-simulador">
    <p class="simulador-placeholder">🎯 Mi Simulador</p>
    <button onclick="cargarSimulador('mi-simulador')">Cargar</button>
</div>
```

## 🎨 Personalización de Estilos

### Cambiar colores principales
Edita las variables CSS en `libro-web.css`:

```css
:root {
    --color-primario: #0b2b44;      /* Azul oscuro */
    --color-secundario: #1a4a6f;    /* Azul medio */
    --color-acento: #ffaa33;        /* Naranja/amarillo */
    --color-texto: #1a2a3a;         /* Texto principal */
    --color-fondo: #f0f2f5;         /* Fondo página */
}
```

### Cambiar fuentes
```css
body {
    font-family: 'Tu Fuente', sans-serif;
}
```

### Ajustar tamaños para móvil
Los tamaños ya son responsive con `clamp()`, pero puedes ajustar:

```css
@media (max-width: 480px) {
    .capitulo h2 {
        font-size: 1.4rem; /* Cambia esto */
    }
}
```

## 📱 Compatibilidad

✅ Chrome/Edge (versión 90+)  
✅ Firefox (versión 88+)  
✅ Safari (versión 14+)  
✅ Opera (versión 76+)  
✅ Navegadores móviles (iOS Safari, Chrome Mobile)

## 🔧 Solución de Problemas

### Las fórmulas no se muestran
- Verifica tu conexión a internet (MathJax carga desde CDN)
- Revisa la consola del navegador (F12) para ver errores
- Asegúrate de que la sintaxis LaTeX sea correcta

### El menú hamburguesa no funciona
- Verifica que `libro-web.js` esté cargando correctamente
- Revisa que el `id="navToggle"` y `id="mainNav"` estén en el HTML

### Los simuladores no cargan
- Asegúrate de que `simuladores.js` esté en la misma carpeta
- Verifica que esté incluido en el HTML: `<script src="simuladores.js"></script>`
- Revisa la consola del navegador para errores de JavaScript

### En móvil se ve mal
- Verifica que tengas la etiqueta viewport: `<meta name="viewport" content="width=device-width, initial-scale=1.0">`
- Prueba en modo incógnito (a veces el cache causa problemas)

## 📚 Recursos Adicionales

- **MathJax Documentation:** https://docs.mathjax.org/
- **LaTeX Math Symbols:** https://www.overleaf.com/learn/latex/List_of_Greek_letters_and_math_symbols
- **Canvas API (para simuladores):** https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API
- **CSS Responsive Design:** https://web.dev/responsive-web-design-basics/

## 📄 Licencia
Este proyecto es de uso educativo libre. Puedes modificarlo y distribuirlo según tus necesidades.

## 🤝 Contribuciones
Si mejoras algo o agregas nuevos simuladores, ¡comparte tu trabajo!

---

**Versión:** 2.0  
**Fecha:** Abril 2025  
**Autor:** Basado en el formato Serway para física universitaria
