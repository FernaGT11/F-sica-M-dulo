# 📘 Libro de Física Universitaria - Versión Final

**Profesor:** Fernando Gaete T.  
**Institución:** Liceo Bicentenario de Excelencia Coelemu  
**Email:** fernando.gaete@liceobicentenariocoelemu.cl

---

## 📂 ESTRUCTURA DE ARCHIVOS

```
libro-fisica-web/
│
├── index.html                    # Página principal ✅
├── estilo.css                    # Estilos CSS ✅
├── libro-web.js                  # JavaScript ✅
│
├── imagenes/                     # 📁 Carpeta de imágenes
│   ├── logo-dor.png             # ⚠️ COLOCAR AQUÍ
│   └── imagen1.jpg              # ⚠️ COLOCAR AQUÍ (imagen de fricción)
│
└── simuladores/                  # 📁 Para futuros simuladores (opcional)
    ├── simulador1.js
    └── simulador2.js
```

---

## ✅ CAMBIOS FINALES REALIZADOS

### 🗑️ Eliminaciones:
- ✅ Caricaturas del profesor (todas)
- ✅ Íconos en ejemplos (átomo, vector, energía, onda)
- ✅ Simuladores (todos)
- ✅ Referencia a `simuladores.js`

### ✨ Mejoras:
- ✅ Email clickeable → abre Gmail al hacer clic
- ✅ Espacio para imagen después de ecuación de fricción
- ✅ Sistema de numeración de ecuaciones (como LaTeX)
- ✅ Estructura de carpetas organizada
- ✅ CSS renombrado a `estilo.css`

---

## 🚀 PASOS PARA USAR

### 1. Agregar tus archivos:
```
imagenes/
├── logo-dor.png      ← Logo del liceo
└── imagen1.jpg       ← Imagen de fricción
```

### 2. Abrir el libro:
Doble clic en `index.html` → Se abre en tu navegador

¡Eso es todo! No necesitas servidor web.

---

## 🔢 ECUACIONES NUMERADAS

### Ejemplo de uso:

```html
<div class="ecuacion-numerada" id="eq-2-1">
    \[
    F = ma
    \]
    <span class="numero-eq">(2.1)</span>
</div>

<!-- Referenciar después: -->
<p>Como vimos en <a href="#eq-2-1">(2.1)</a>...</p>
```

**Ver más ejemplos:** `GUIA-ECUACIONES-IMAGENES.md`

---

## 🖼️ AGREGAR IMÁGENES

### Ya implementado (fricción):

```html
<figure class="figura-ecuacion">
    <img src="imagenes/imagen1.jpg" alt="Diagrama">
    <figcaption>Figura 2.1: Fuerzas de fricción</figcaption>
</figure>
```

### Para más imágenes:

1. Guarda en `imagenes/`
2. Usa el mismo formato:

```html
<figure class="figura-ecuacion">
    <img src="imagenes/tu-imagen.jpg" alt="Descripción">
    <figcaption>Figura X.Y: Tu descripción</figcaption>
</figure>
```

---

## 📧 EMAIL CLICKEABLE

El email ahora abre Gmail automáticamente:
- Click → Redactar correo
- Hover → Se subraya y cambia a naranja

---

## 📱 100% RESPONSIVE

- 📱 **Móvil:** Menú hamburguesa
- 💻 **Tablet:** Navegación adaptada  
- 🖥️ **Desktop:** Vista completa

---

## 📚 DOCUMENTACIÓN

1. **README.md** - Guía rápida (este archivo)
2. **GUIA-ECUACIONES-IMAGENES.md** - Ejemplos detallados
3. **INSTRUCCIONES-LOGO.md** - Optimizar logo

---

## ⚠️ ARCHIVOS NECESARIOS

**Debes agregar:**
- `imagenes/logo-dor.png`
- `imagenes/imagen1.jpg`

---

## 🆘 PROBLEMAS COMUNES

| Problema | Solución |
|----------|----------|
| Fórmulas no se ven | Necesitas internet (primera vez) |
| Logo no aparece | Verifica ruta: `imagenes/logo-dor.png` |
| Imagen no se ve | Coloca `imagen1.jpg` en `imagenes/` |
| Email no abre | Verifica tener cliente de correo configurado |

---

**Versión:** 3.0 Final  
**Estado:** ✅ Listo para usar

¡Todo está optimizado y funcionando! 🚀📚
