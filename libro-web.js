// ============================================
// LIBRO WEB DE FÍSICA - JavaScript Principal
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    console.log('📘 Libro de Física estilo Serway cargado');
    
    // ============================================
    // NAVEGACIÓN SMOOTH SCROLL
    // ============================================
    const navLinks = document.querySelectorAll('nav a.activo'); // Solo enlaces activos
    const nav = document.getElementById('mainNav');
    const navToggle = document.getElementById('navToggle');
    
    // Smooth scroll para todos los enlaces de navegación activos
    navLinks.forEach(link => {
        link.addEventListener('click', function(event) {
            event.preventDefault();
            
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if(targetElement) {
                // Cerrar menú móvil si está abierto
                if(window.innerWidth <= 480 && nav.classList.contains('active')) {
                    nav.classList.remove('active');
                    navToggle.classList.remove('active');
                }
                
                // Scroll suave
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                
                // Actualizar URL sin recargar
                history.pushState(null, null, '#' + targetId);
            }
        });
    });
    
    // ============================================
    // MENÚ HAMBURGUESA PARA MÓVILES
    // ============================================
    if(navToggle) {
        navToggle.addEventListener('click', function() {
            nav.classList.toggle('active');
            this.classList.toggle('active');
            
            // Cambiar aria-label para accesibilidad
            const isActive = this.classList.contains('active');
            this.setAttribute('aria-label', isActive ? 'Cerrar menú' : 'Abrir menú');
        });
        
        // Cerrar menú al hacer click fuera
        document.addEventListener('click', function(event) {
            if(window.innerWidth <= 480) {
                const isClickInsideNav = nav.contains(event.target);
                const isClickOnToggle = navToggle.contains(event.target);
                
                if(!isClickInsideNav && !isClickOnToggle && nav.classList.contains('active')) {
                    nav.classList.remove('active');
                    navToggle.classList.remove('active');
                }
            }
        });
    }
    
    // ============================================
    // OBSERVADOR DE INTERSECCIÓN PARA CAPÍTULOS
    // ============================================
    const sections = document.querySelectorAll('.capitulo');
    
    const observerOptions = {
        threshold: 0.2,
        rootMargin: "-80px 0px -20% 0px"
    };
    
    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if(entry.isIntersecting) {
                // Efecto sutil de elevación
                entry.target.style.transition = 'box-shadow 0.3s ease, transform 0.3s ease';
                
                // Marcar enlace activo en la navegación
                const sectionId = entry.target.getAttribute('id');
                navLinks.forEach(link => {
                    const href = link.getAttribute('href').substring(1);
                    // Solo aplicar estilos a enlaces activos
                    if(link.classList.contains('activo')) {
                        if(href === sectionId) {
                            link.style.background = 'rgba(255, 205, 107, 0.3)';
                            link.style.borderColor = var(--color-acento);
                        } else {
                            link.style.background = 'rgba(255, 255, 255, 0.15)';
                            link.style.borderColor = 'transparent';
                        }
                    }
                });
            }
        });
    }, observerOptions);
    
    sections.forEach(section => {
        sectionObserver.observe(section);
    });
    
    // ============================================
    // LAZY LOADING DE MATHJAX (optimización)
    // ============================================
    // Si MathJax tarda en cargar, mostrar indicador
    let mathJaxLoaded = false;
    
    window.addEventListener('load', function() {
        if(typeof MathJax !== 'undefined') {
            mathJaxLoaded = true;
            console.log('✅ MathJax cargado correctamente');
        } else {
            console.warn('⚠️ MathJax no se ha cargado aún');
            
            // Reintentar después de 2 segundos
            setTimeout(function() {
                if(typeof MathJax !== 'undefined') {
                    MathJax.typesetPromise().then(() => {
                        console.log('✅ MathJax renderizado exitosamente');
                    });
                }
            }, 2000);
        }
    });
    
    // ============================================
    // FUNCIÓN PARA EXPANDIR/CONTRAER SECCIONES
    // (Opcional - útil para móviles)
    // ============================================
    function initCollapsibleSections() {
        if(window.innerWidth <= 768) {
            const h2Elements = document.querySelectorAll('.capitulo h2');
            
            h2Elements.forEach(h2 => {
                h2.style.cursor = 'pointer';
                h2.title = 'Click para expandir/contraer';
                
                h2.addEventListener('click', function() {
                    const articles = this.parentElement.querySelectorAll('article, .ejemplo, .simulador-container');
                    
                    articles.forEach(article => {
                        if(article.style.display === 'none') {
                            article.style.display = 'block';
                        } else {
                            article.style.display = 'none';
                        }
                    });
                });
            });
        }
    }
    
    // Inicializar secciones colapsables solo en móvil
    // initCollapsibleSections(); // Descomentar si se desea esta funcionalidad
    
    // ============================================
    // BOTÓN "VOLVER ARRIBA"
    // ============================================
    const backToTopButton = createBackToTopButton();
    
    function createBackToTopButton() {
        const button = document.createElement('button');
        button.innerHTML = '↑';
        button.className = 'back-to-top';
        button.setAttribute('aria-label', 'Volver arriba');
        button.style.cssText = `
            position: fixed;
            bottom: 30px;
            right: 30px;
            width: 50px;
            height: 50px;
            border-radius: 50%;
            background: linear-gradient(135deg, #ffaa33, #ffcd6b);
            color: #0b2b44;
            border: none;
            font-size: 24px;
            font-weight: bold;
            cursor: pointer;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
            opacity: 0;
            visibility: hidden;
            transition: all 0.3s ease;
            z-index: 999;
        `;
        
        button.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
        
        document.body.appendChild(button);
        return button;
    }
    
    // Mostrar/ocultar botón según scroll
    window.addEventListener('scroll', function() {
        if(window.pageYOffset > 300) {
            backToTopButton.style.opacity = '1';
            backToTopButton.style.visibility = 'visible';
        } else {
            backToTopButton.style.opacity = '0';
            backToTopButton.style.visibility = 'hidden';
        }
    });
    
    // Efecto hover para el botón
    backToTopButton.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-3px)';
        this.style.boxShadow = '0 6px 16px rgba(0, 0, 0, 0.3)';
    });
    
    backToTopButton.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
        this.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.2)';
    });
    
    // ============================================
    // MANEJO DE CAMBIOS DE TAMAÑO DE VENTANA
    // ============================================
    let resizeTimer;
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(function() {
            // Cerrar menú móvil si se agranda la ventana
            if(window.innerWidth > 480 && nav.classList.contains('active')) {
                nav.classList.remove('active');
                navToggle.classList.remove('active');
            }
            
            console.log('📐 Ventana redimensionada: ' + window.innerWidth + 'px');
        }, 250);
    });
    
    // ============================================
    // COPIAR FÓRMULAS AL HACER CLICK (opcional)
    // ============================================
    function enableFormulaCopy() {
        const mathContainers = document.querySelectorAll('mjx-container');
        
        mathContainers.forEach(container => {
            container.style.cursor = 'pointer';
            container.title = 'Click para copiar LaTeX';
            
            container.addEventListener('click', function() {
                // Extraer el código LaTeX del contenedor
                const latexCode = this.querySelector('mjx-math')?.getAttribute('alttext') || 
                                 this.textContent;
                
                // Copiar al portapapeles
                if(navigator.clipboard) {
                    navigator.clipboard.writeText(latexCode).then(() => {
                        showCopyNotification('Fórmula copiada ✓');
                    });
                }
            });
        });
    }
    
    function showCopyNotification(message) {
        const notification = document.createElement('div');
        notification.textContent = message;
        notification.style.cssText = `
            position: fixed;
            top: 100px;
            right: 30px;
            background: #4caf50;
            color: white;
            padding: 12px 20px;
            border-radius: 8px;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
            z-index: 9999;
            font-weight: 600;
            animation: slideIn 0.3s ease;
        `;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.style.animation = 'slideOut 0.3s ease';
            setTimeout(() => notification.remove(), 300);
        }, 2000);
    }
    
    // Habilitar copia de fórmulas después de que MathJax cargue
    setTimeout(enableFormulaCopy, 3000);
    
    // ============================================
    // LOG FINAL
    // ============================================
    console.log('✅ Todas las funcionalidades cargadas correctamente');
    console.log('📱 Modo responsive activado');
    console.log('🧮 MathJax configurado para renderizar LaTeX');
});

// ============================================
// ANIMACIONES CSS DINÁMICAS
// ============================================
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }
    
    .back-to-top:hover {
        transform: translateY(-3px) !important;
    }
    
    .back-to-top:active {
        transform: translateY(-1px) !important;
    }
`;
document.head.appendChild(style);
