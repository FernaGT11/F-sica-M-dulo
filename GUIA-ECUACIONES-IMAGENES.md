# 📚 GUÍA DE USO - ECUACIONES NUMERADAS E IMÁGENES

## 🔢 SISTEMA DE NUMERACIÓN DE ECUACIONES

El libro ya tiene implementado un sistema para numerar ecuaciones similar a LaTeX.

### ✅ Cómo numerar una ecuación:

```html
<div class="ecuacion-numerada">
    \[
    \vec{F} = m\vec{a}
    \]
    <span class="numero-eq">(2.1)</span>
</div>
```

**Resultado:** La ecuación aparece con el número (2.1) a la derecha.

### 📋 Convención de numeración:

**Formato:** `(Capítulo.Número)`

Ejemplos:
- **(1.1)** = Primera ecuación del capítulo 1
- **(1.2)** = Segunda ecuación del capítulo 1
- **(2.1)** = Primera ecuación del capítulo 2
- **(3.5)** = Quinta ecuación del capítulo 3

### 🔗 Cómo referenciar ecuaciones en el texto:

```html
<p>Como vimos en la ecuación <a href="#eq-2-1" class="ref-ecuacion">(2.1)</a>, 
la fuerza es proporcional a la masa.</p>

<!-- Más adelante, la ecuación: -->
<div class="ecuacion-numerada" id="eq-2-1">
    \[
    F = ma
    \]
    <span class="numero-eq">(2.1)</span>
</div>
```

**Consejos:**
- Usa IDs como: `eq-1-1`, `eq-2-3`, `eq-3-5`
- Mantén un registro de qué número va en cada ecuación
- Numera solo las ecuaciones importantes que vayas a referenciar

---

## 🖼️ CÓMO AGREGAR IMÁGENES

### ✅ Imagen después de una ecuación (como la de fricción):

```html
<article>
    <h3>2.3 Fuerza de Fricción</h3>
    <p>La fuerza de fricción se opone al movimiento:</p>
    \[
    f_k = \mu_k N
    \]
    
    <!-- Imagen explicativa -->
    <figure class="figura-ecuacion">
        <img src="imagenes/imagen1.jpg" alt="Diagrama de fricción">
        <figcaption>Figura 2.1: Fuerzas de fricción en superficies</figcaption>
    </figure>
</article>
```

### 📊 Tipos de imágenes que puedes agregar:

#### 1. **Diagramas de fuerzas**
```html
<figure class="figura-ecuacion">
    <img src="imagenes/diagrama-fuerzas.jpg" alt="Diagrama de cuerpo libre">
    <figcaption>Figura 2.2: Diagrama de cuerpo libre</figcaption>
</figure>
```

#### 2. **Gráficas**
```html
<figure class="figura-ecuacion">
    <img src="imagenes/grafica-velocidad.jpg" alt="Gráfica v vs t">
    <figcaption>Figura 1.1: Gráfica velocidad vs tiempo para MRUA</figcaption>
</figure>
```

#### 3. **Esquemas**
```html
<figure class="figura-ecuacion">
    <img src="imagenes/orbita-circular.jpg" alt="Órbita circular">
    <figcaption>Figura 3.1: Movimiento orbital circular</figcaption>
</figure>
```

### 🎨 Formatos de imagen recomendados:

- **JPG:** Para fotografías y diagramas complejos
- **PNG:** Para diagramas con texto, esquemas, transparencias
- **SVG:** Para gráficos vectoriales (se ven perfectos en cualquier tamaño)

**Resolución recomendada:**
- Mínimo: 800px de ancho
- Óptimo: 1200-1600px de ancho
- Peso máximo: 500KB por imagen

---

## 📂 ORGANIZACIÓN DE IMÁGENES

### Nombra tus imágenes de forma descriptiva:

❌ **MAL:**
```
imagen1.jpg
imagen2.jpg
foto.png
```

✅ **BIEN:**
```
friccion-superficies.jpg
grafica-mru.jpg
diagrama-fuerzas-centrales.png
orbita-eliptica.jpg
```

### Estructura sugerida:

```
imagenes/
├── logo-dor.png
├── cap1-grafica-mru.jpg
├── cap1-caida-libre.jpg
├── cap2-friccion-superficies.jpg
├── cap2-diagrama-fuerzas.jpg
├── cap3-orbita-circular.jpg
├── cap3-leyes-kepler.png
├── cap4-energia-potencial.jpg
└── cap5-masa-resorte.jpg
```

---

## 💡 EJEMPLOS COMPLETOS

### Ejemplo 1: Ecuación numerada + imagen

```html
<article>
    <h3>3.2 Ley de Gravitación Universal</h3>
    <p>Newton descubrió que la fuerza entre dos masas es:</p>
    
    <div class="ecuacion-numerada" id="eq-3-1">
        \[
        F = G\frac{m_1 m_2}{r^2}
        \]
        <span class="numero-eq">(3.1)</span>
    </div>
    
    <p>Donde $G = 6.674 \times 10^{-11}\,\text{N·m}^2/\text{kg}^2$.</p>
    
    <figure class="figura-ecuacion">
        <img src="imagenes/gravitacion-newton.jpg" alt="Ley de gravitación">
        <figcaption>Figura 3.1: Interacción gravitatoria entre dos masas</figcaption>
    </figure>
    
    <p>Como se observa en la ecuación <a href="#eq-3-1">(3.1)</a>, 
    la fuerza disminuye con el cuadrado de la distancia.</p>
</article>
```

### Ejemplo 2: Múltiples ecuaciones numeradas

```html
<article>
    <h3>1.2 Ecuaciones del MRUA</h3>
    <p>Para movimiento con aceleración constante:</p>
    
    <div class="ecuacion-numerada" id="eq-1-1">
        \[
        v = v_0 + at
        \]
        <span class="numero-eq">(1.1)</span>
    </div>
    
    <div class="ecuacion-numerada" id="eq-1-2">
        \[
        x = x_0 + v_0 t + \frac{1}{2}at^2
        \]
        <span class="numero-eq">(1.2)</span>
    </div>
    
    <div class="ecuacion-numerada" id="eq-1-3">
        \[
        v^2 = v_0^2 + 2a(x - x_0)
        \]
        <span class="numero-eq">(1.3)</span>
    </div>
    
    <p>Combinando las ecuaciones <a href="#eq-1-1">(1.1)</a> y 
    <a href="#eq-1-2">(1.2)</a> podemos derivar <a href="#eq-1-3">(1.3)</a>.</p>
</article>
```

### Ejemplo 3: Imagen sin ecuación (solo explicativa)

```html
<article>
    <h3>2.4 Plano Inclinado</h3>
    <p>Cuando un cuerpo se encuentra en un plano inclinado, 
    debemos descomponer el peso en componentes paralela y perpendicular:</p>
    
    <figure class="figura-ecuacion">
        <img src="imagenes/plano-inclinado.jpg" alt="Diagrama plano inclinado">
        <figcaption>Figura 2.3: Descomposición de fuerzas en plano inclinado</figcaption>
    </figure>
    
    <p>Como se observa en la figura, el peso se descompone en:</p>
    \[
    W_\parallel = mg\sin\theta \quad \text{y} \quad W_\perp = mg\cos\theta
    \]
</article>
```

---

## 🎯 CONSEJOS PROFESIONALES

### ✅ Para ecuaciones:
1. Numera solo las ecuaciones que vas a referenciar después
2. Mantén un orden lógico (1.1, 1.2, 1.3...)
3. No saltes números (evita 1.1, 1.3, 1.5...)
4. Usa IDs descriptivos (`eq-2-1` mejor que `ecuacion1`)

### ✅ Para imágenes:
1. Optimiza el peso (usa TinyPNG o similar)
2. Usa descripciones claras en `alt`
3. Numera figuras por capítulo (Figura 2.1, 2.2, 2.3...)
4. Agrega pie de figura descriptivo
5. Asegúrate que se vean bien en móvil

### ✅ Para referencias:
1. Usa enlaces internos con `#id`
2. Mantén consistencia: siempre "(2.1)" no "ecuación 2.1"
3. Agrega clase `ref-ecuacion` para futuro estilo especial

---

## 🔧 PERSONALIZACIÓN CSS (Opcional)

Si quieres cambiar el estilo de las ecuaciones numeradas:

```css
/* En estilo.css, busca .ecuacion-numerada */

.ecuacion-numerada .numero-eq {
    background: #ffaa33;  /* Color de fondo del número */
    color: white;         /* Color del texto */
    font-size: 1rem;      /* Tamaño del número */
    padding: 0.4rem 0.8rem;
    border-radius: 6px;
}
```

Para cambiar el estilo de las figuras:

```css
.figura-ecuacion img {
    border: 3px solid #0b2b44;  /* Borde más grueso */
    border-radius: 16px;         /* Esquinas más redondeadas */
    box-shadow: 0 8px 20px rgba(0,0,0,0.2);  /* Sombra más fuerte */
}
```

---

## 📱 RESPONSIVE

Todo está optimizado para móvil:
- ✅ Imágenes se adaptan automáticamente
- ✅ Números de ecuaciones se ajustan
- ✅ Pies de figura se hacen más pequeños
- ✅ Todo es legible en cualquier dispositivo

---

## ❓ PREGUNTAS FRECUENTES

**P: ¿Puedo usar imágenes de internet?**
R: Sí, pero respeta los derechos de autor. Usa imágenes con licencia Creative Commons o crea las tuyas.

**P: ¿Qué hago si una imagen es muy grande?**
R: Usa https://tinypng.com para reducir el peso sin perder calidad.

**P: ¿Puedo poner varias imágenes juntas?**
R: Sí, solo repite el bloque `<figure>` con diferentes numeraciones.

**P: ¿Las ecuaciones se pueden copiar?**
R: Sí, el usuario puede seleccionar el LaTeX y copiarlo.

**P: ¿Funciona sin internet?**
R: Las imágenes sí. MathJax necesita internet la primera vez, luego se cachea.

---

¡Ya estás listo para agregar ecuaciones numeradas e imágenes profesionalmente! 🚀
