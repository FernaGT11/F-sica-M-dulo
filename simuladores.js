// ============================================
// SIMULADORES INTERACTIVOS DE FÍSICA
// Archivo modular para cargar simuladores bajo demanda
// ============================================

// Variable global para rastrear simuladores cargados
const simuladoresCargados = {
    mru: false,
    orbitas: false,
    mas: false
};

// ============================================
// FUNCIÓN PRINCIPAL: CARGAR SIMULADOR
// ============================================
function cargarSimulador(tipo) {
    if (simuladoresCargados[tipo]) {
        alert('El simulador ya está cargado');
        return;
    }
    
    const contenedor = document.getElementById(`sim-${tipo}`);
    if (!contenedor) {
        console.error(`No se encontró el contenedor sim-${tipo}`);
        return;
    }
    
    // Limpiar contenedor
    contenedor.innerHTML = '';
    
    // Cargar el simulador correspondiente
    switch(tipo) {
        case 'mru':
            crearSimuladorMRU(contenedor);
            break;
        case 'orbitas':
            crearSimuladorOrbitas(contenedor);
            break;
        case 'mas':
            crearSimuladorMAS(contenedor);
            break;
        default:
            console.error('Tipo de simulador no reconocido');
    }
    
    simuladoresCargados[tipo] = true;
}

// ============================================
// SIMULADOR 1: MOVIMIENTO RECTILÍNEO UNIFORME
// ============================================
function crearSimuladorMRU(contenedor) {
    contenedor.innerHTML = `
        <div style="background: white; padding: 20px; border-radius: 12px;">
            <h4 style="margin: 0 0 15px 0; color: #0b5e7e;">🚗 Simulador de MRU</h4>
            
            <div style="margin-bottom: 15px;">
                <label style="display: block; margin-bottom: 5px; font-weight: 600;">
                    Velocidad (m/s): <span id="mru-vel-value">5</span>
                </label>
                <input type="range" id="mru-velocidad" min="1" max="20" value="5" 
                       style="width: 100%;">
            </div>
            
            <div style="margin-bottom: 15px;">
                <label style="display: block; margin-bottom: 5px; font-weight: 600;">
                    Posición inicial (m): <span id="mru-pos-value">0</span>
                </label>
                <input type="range" id="mru-posicion" min="0" max="50" value="0" 
                       style="width: 100%;">
            </div>
            
            <canvas id="canvas-mru" width="600" height="200" 
                    style="border: 2px solid #1a4a6f; border-radius: 8px; width: 100%; max-width: 600px; display: block; margin: 15px auto;"></canvas>
            
            <div style="text-align: center; margin-top: 15px;">
                <button onclick="iniciarMRU()" 
                        style="background: #4caf50; color: white; border: none; padding: 10px 25px; 
                               border-radius: 25px; font-weight: 600; cursor: pointer; margin: 0 5px;">
                    ▶ Iniciar
                </button>
                <button onclick="detenerMRU()" 
                        style="background: #f44336; color: white; border: none; padding: 10px 25px; 
                               border-radius: 25px; font-weight: 600; cursor: pointer; margin: 0 5px;">
                    ⏸ Detener
                </button>
                <button onclick="reiniciarMRU()" 
                        style="background: #ff9800; color: white; border: none; padding: 10px 25px; 
                               border-radius: 25px; font-weight: 600; cursor: pointer; margin: 0 5px;">
                    🔄 Reiniciar
                </button>
            </div>
            
            <div id="mru-info" style="margin-top: 15px; text-align: center; font-weight: 600; color: #1a6d8a;">
                Tiempo: 0.0s | Posición: 0.0m
            </div>
        </div>
    `;
    
    // Variables del simulador
    let animacionMRU = null;
    let tiempoMRU = 0;
    let velocidadMRU = 5;
    let posicionInicialMRU = 0;
    
    const canvas = document.getElementById('canvas-mru');
    const ctx = canvas.getContext('2d');
    
    // Event listeners para controles
    document.getElementById('mru-velocidad').addEventListener('input', function() {
        velocidadMRU = parseFloat(this.value);
        document.getElementById('mru-vel-value').textContent = velocidadMRU;
    });
    
    document.getElementById('mru-posicion').addEventListener('input', function() {
        posicionInicialMRU = parseFloat(this.value);
        document.getElementById('mru-pos-value').textContent = posicionInicialMRU;
        if (!animacionMRU) {
            tiempoMRU = 0;
            dibujarMRU();
        }
    });
    
    // Funciones del simulador
    window.iniciarMRU = function() {
        if (animacionMRU) return;
        
        const inicioTime = Date.now() - (tiempoMRU * 1000);
        
        function animar() {
            tiempoMRU = (Date.now() - inicioTime) / 1000;
            dibujarMRU();
            animacionMRU = requestAnimationFrame(animar);
            
            // Detener al final del canvas
            const posicion = posicionInicialMRU + velocidadMRU * tiempoMRU;
            if (posicion > 100) {
                detenerMRU();
            }
        }
        
        animar();
    };
    
    window.detenerMRU = function() {
        if (animacionMRU) {
            cancelAnimationFrame(animacionMRU);
            animacionMRU = null;
        }
    };
    
    window.reiniciarMRU = function() {
        detenerMRU();
        tiempoMRU = 0;
        dibujarMRU();
    };
    
    function dibujarMRU() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Dibujar pista
        ctx.fillStyle = '#e0e0e0';
        ctx.fillRect(0, 120, canvas.width, 60);
        
        // Marcas de distancia
        ctx.fillStyle = '#666';
        ctx.font = '12px Arial';
        for (let i = 0; i <= 100; i += 20) {
            const x = (i / 100) * (canvas.width - 40) + 20;
            ctx.fillText(i + 'm', x - 10, 115);
            ctx.fillRect(x, 180, 2, 10);
        }
        
        // Calcular posición del móvil
        const posicion = posicionInicialMRU + velocidadMRU * tiempoMRU;
        const x = Math.min((posicion / 100) * (canvas.width - 40) + 20, canvas.width - 20);
        
        // Dibujar móvil (auto)
        ctx.fillStyle = '#2196f3';
        ctx.fillRect(x - 15, 130, 30, 40);
        ctx.fillStyle = '#fff';
        ctx.fillRect(x - 10, 135, 8, 8);
        ctx.fillRect(x + 2, 135, 8, 8);
        
        // Actualizar información
        document.getElementById('mru-info').textContent = 
            `Tiempo: ${tiempoMRU.toFixed(1)}s | Posición: ${posicion.toFixed(1)}m | Velocidad: ${velocidadMRU}m/s`;
    }
    
    // Dibujar estado inicial
    dibujarMRU();
}

// ============================================
// SIMULADOR 2: ÓRBITAS PLANETARIAS
// ============================================
function crearSimuladorOrbitas(contenedor) {
    contenedor.innerHTML = `
        <div style="background: white; padding: 20px; border-radius: 12px;">
            <h4 style="margin: 0 0 15px 0; color: #0b5e7e;">🪐 Simulador de Órbitas</h4>
            
            <div style="margin-bottom: 15px;">
                <label style="display: block; margin-bottom: 5px; font-weight: 600;">
                    Radio orbital (píxeles): <span id="orbita-radio-value">100</span>
                </label>
                <input type="range" id="orbita-radio" min="50" max="150" value="100" 
                       style="width: 100%;">
            </div>
            
            <div style="margin-bottom: 15px;">
                <label style="display: block; margin-bottom: 5px; font-weight: 600;">
                    Velocidad angular: <span id="orbita-vel-value">1</span>
                </label>
                <input type="range" id="orbita-velocidad" min="0.5" max="3" step="0.1" value="1" 
                       style="width: 100%;">
            </div>
            
            <canvas id="canvas-orbitas" width="400" height="400" 
                    style="border: 2px solid #1a4a6f; border-radius: 8px; width: 100%; max-width: 400px; display: block; margin: 15px auto; background: #000;"></canvas>
            
            <div style="text-align: center; margin-top: 15px;">
                <button onclick="iniciarOrbita()" 
                        style="background: #4caf50; color: white; border: none; padding: 10px 25px; 
                               border-radius: 25px; font-weight: 600; cursor: pointer; margin: 0 5px;">
                    ▶ Iniciar
                </button>
                <button onclick="detenerOrbita()" 
                        style="background: #f44336; color: white; border: none; padding: 10px 25px; 
                               border-radius: 25px; font-weight: 600; cursor: pointer; margin: 0 5px;">
                    ⏸ Detener
                </button>
            </div>
            
            <div id="orbita-info" style="margin-top: 15px; text-align: center; font-weight: 600; color: #1a6d8a;">
                Ángulo: 0° | Período estimado: 0.0s
            </div>
        </div>
    `;
    
    // Variables del simulador
    let animacionOrbita = null;
    let anguloOrbita = 0;
    let radioOrbita = 100;
    let velocidadAngular = 1;
    
    const canvas = document.getElementById('canvas-orbitas');
    const ctx = canvas.getContext('2d');
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    
    // Event listeners
    document.getElementById('orbita-radio').addEventListener('input', function() {
        radioOrbita = parseFloat(this.value);
        document.getElementById('orbita-radio-value').textContent = radioOrbita;
        if (!animacionOrbita) dibujarOrbita();
    });
    
    document.getElementById('orbita-velocidad').addEventListener('input', function() {
        velocidadAngular = parseFloat(this.value);
        document.getElementById('orbita-vel-value').textContent = velocidadAngular.toFixed(1);
    });
    
    // Funciones del simulador
    window.iniciarOrbita = function() {
        if (animacionOrbita) return;
        
        function animar() {
            anguloOrbita += velocidadAngular * 0.02;
            if (anguloOrbita >= 2 * Math.PI) anguloOrbita -= 2 * Math.PI;
            
            dibujarOrbita();
            animacionOrbita = requestAnimationFrame(animar);
        }
        
        animar();
    };
    
    window.detenerOrbita = function() {
        if (animacionOrbita) {
            cancelAnimationFrame(animacionOrbita);
            animacionOrbita = null;
        }
    };
    
    function dibujarOrbita() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Fondo espacial
        ctx.fillStyle = '#000';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        // Estrellas de fondo
        for (let i = 0; i < 50; i++) {
            const x = Math.random() * canvas.width;
            const y = Math.random() * canvas.height;
            ctx.fillStyle = '#fff';
            ctx.fillRect(x, y, 1, 1);
        }
        
        // Dibujar órbita
        ctx.strokeStyle = '#444';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(centerX, centerY, radioOrbita, 0, 2 * Math.PI);
        ctx.stroke();
        
        // Dibujar Sol (centro)
        const gradientSol = ctx.createRadialGradient(centerX, centerY, 5, centerX, centerY, 20);
        gradientSol.addColorStop(0, '#ffff00');
        gradientSol.addColorStop(1, '#ff6600');
        ctx.fillStyle = gradientSol;
        ctx.beginPath();
        ctx.arc(centerX, centerY, 20, 0, 2 * Math.PI);
        ctx.fill();
        
        // Calcular posición del planeta
        const planetaX = centerX + radioOrbita * Math.cos(anguloOrbita);
        const planetaY = centerY + radioOrbita * Math.sin(anguloOrbita);
        
        // Dibujar planeta
        const gradientPlaneta = ctx.createRadialGradient(planetaX, planetaY, 2, planetaX, planetaY, 10);
        gradientPlaneta.addColorStop(0, '#4fc3f7');
        gradientPlaneta.addColorStop(1, '#0288d1');
        ctx.fillStyle = gradientPlaneta;
        ctx.beginPath();
        ctx.arc(planetaX, planetaY, 10, 0, 2 * Math.PI);
        ctx.fill();
        
        // Vector velocidad
        const velX = -radioOrbita * Math.sin(anguloOrbita) * 0.3;
        const velY = radioOrbita * Math.cos(anguloOrbita) * 0.3;
        ctx.strokeStyle = '#00ff00';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(planetaX, planetaY);
        ctx.lineTo(planetaX + velX, planetaY + velY);
        ctx.stroke();
        
        // Actualizar información
        const anguloGrados = (anguloOrbita * 180 / Math.PI).toFixed(0);
        const periodoEstimado = (2 * Math.PI / (velocidadAngular * 0.02) / 60).toFixed(1);
        document.getElementById('orbita-info').textContent = 
            `Ángulo: ${anguloGrados}° | Período estimado: ${periodoEstimado}s`;
    }
    
    // Dibujar estado inicial
    dibujarOrbita();
}

// ============================================
// SIMULADOR 3: MOVIMIENTO ARMÓNICO SIMPLE
// ============================================
function crearSimuladorMAS(contenedor) {
    contenedor.innerHTML = `
        <div style="background: white; padding: 20px; border-radius: 12px;">
            <h4 style="margin: 0 0 15px 0; color: #0b5e7e;">⚡ Simulador de MAS</h4>
            
            <div style="margin-bottom: 15px;">
                <label style="display: block; margin-bottom: 5px; font-weight: 600;">
                    Amplitud (m): <span id="mas-amp-value">50</span>
                </label>
                <input type="range" id="mas-amplitud" min="20" max="100" value="50" 
                       style="width: 100%;">
            </div>
            
            <div style="margin-bottom: 15px;">
                <label style="display: block; margin-bottom: 5px; font-weight: 600;">
                    Frecuencia (Hz): <span id="mas-freq-value">1</span>
                </label>
                <input type="range" id="mas-frecuencia" min="0.5" max="3" step="0.1" value="1" 
                       style="width: 100%;">
            </div>
            
            <canvas id="canvas-mas" width="600" height="300" 
                    style="border: 2px solid #1a4a6f; border-radius: 8px; width: 100%; max-width: 600px; display: block; margin: 15px auto;"></canvas>
            
            <div style="text-align: center; margin-top: 15px;">
                <button onclick="iniciarMAS()" 
                        style="background: #4caf50; color: white; border: none; padding: 10px 25px; 
                               border-radius: 25px; font-weight: 600; cursor: pointer; margin: 0 5px;">
                    ▶ Iniciar
                </button>
                <button onclick="detenerMAS()" 
                        style="background: #f44336; color: white; border: none; padding: 10px 25px; 
                               border-radius: 25px; font-weight: 600; cursor: pointer; margin: 0 5px;">
                    ⏸ Detener
                </button>
                <button onclick="reiniciarMAS()" 
                        style="background: #ff9800; color: white; border: none; padding: 10px 25px; 
                               border-radius: 25px; font-weight: 600; cursor: pointer; margin: 0 5px;">
                    🔄 Reiniciar
                </button>
            </div>
            
            <div id="mas-info" style="margin-top: 15px; text-align: center; font-weight: 600; color: #1a6d8a;">
                Tiempo: 0.0s | Posición: 0.0m | Velocidad: 0.0m/s
            </div>
        </div>
    `;
    
    // Variables del simulador
    let animacionMAS = null;
    let tiempoMAS = 0;
    let amplitudMAS = 50;
    let frecuenciaMAS = 1;
    let historialPosiciones = [];
    
    const canvas = document.getElementById('canvas-mas');
    const ctx = canvas.getContext('2d');
    
    // Event listeners
    document.getElementById('mas-amplitud').addEventListener('input', function() {
        amplitudMAS = parseFloat(this.value);
        document.getElementById('mas-amp-value').textContent = amplitudMAS;
    });
    
    document.getElementById('mas-frecuencia').addEventListener('input', function() {
        frecuenciaMAS = parseFloat(this.value);
        document.getElementById('mas-freq-value').textContent = frecuenciaMAS.toFixed(1);
    });
    
    // Funciones del simulador
    window.iniciarMAS = function() {
        if (animacionMAS) return;
        
        const inicioTime = Date.now() - (tiempoMAS * 1000);
        
        function animar() {
            tiempoMAS = (Date.now() - inicioTime) / 1000;
            dibujarMAS();
            animacionMAS = requestAnimationFrame(animar);
        }
        
        animar();
    };
    
    window.detenerMAS = function() {
        if (animacionMAS) {
            cancelAnimationFrame(animacionMAS);
            animacionMAS = null;
        }
    };
    
    window.reiniciarMAS = function() {
        detenerMAS();
        tiempoMAS = 0;
        historialPosiciones = [];
        dibujarMAS();
    };
    
    function dibujarMAS() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Configuración
        const centerY = canvas.height / 2;
        const centerX = 100;
        const omega = 2 * Math.PI * frecuenciaMAS;
        
        // Calcular posición y velocidad
        const posicion = amplitudMAS * Math.cos(omega * tiempoMAS);
        const velocidad = -amplitudMAS * omega * Math.sin(omega * tiempoMAS);
        
        // Guardar historial
        historialPosiciones.push(posicion);
        if (historialPosiciones.length > 400) historialPosiciones.shift();
        
        // Dibujar línea de equilibrio
        ctx.strokeStyle = '#ccc';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(0, centerY);
        ctx.lineTo(canvas.width, centerY);
        ctx.stroke();
        
        // Dibujar resorte (simplificado)
        ctx.strokeStyle = '#666';
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.moveTo(30, centerY);
        const numEspiras = 12;
        for (let i = 0; i <= numEspiras; i++) {
            const x = 30 + (centerX - 30 + posicion) * (i / numEspiras);
            const y = centerY + (i % 2 === 0 ? -10 : 10);
            ctx.lineTo(x, y);
        }
        ctx.stroke();
        
        // Dibujar masa
        const masaX = centerX + posicion;
        ctx.fillStyle = '#e53935';
        ctx.fillRect(masaX - 15, centerY - 15, 30, 30);
        ctx.strokeStyle = '#000';
        ctx.lineWidth = 2;
        ctx.strokeRect(masaX - 15, centerY - 15, 30, 30);
        
        // Dibujar gráfica de posición vs tiempo
        ctx.strokeStyle = '#2196f3';
        ctx.lineWidth = 2;
        ctx.beginPath();
        historialPosiciones.forEach((pos, index) => {
            const x = 200 + index;
            const y = centerY - pos;
            if (index === 0) {
                ctx.moveTo(x, y);
            } else {
                ctx.lineTo(x, y);
            }
        });
        ctx.stroke();
        
        // Etiquetas de ejes
        ctx.fillStyle = '#666';
        ctx.font = '12px Arial';
        ctx.fillText('Posición (m)', 10, 20);
        ctx.fillText('Tiempo', canvas.width - 70, canvas.height - 10);
        
        // Actualizar información
        document.getElementById('mas-info').textContent = 
            `Tiempo: ${tiempoMAS.toFixed(2)}s | Posición: ${posicion.toFixed(1)}m | Velocidad: ${velocidad.toFixed(1)}m/s`;
    }
    
    // Dibujar estado inicial
    dibujarMAS();
}

// ============================================
// LOG DE CARGA
// ============================================
console.log('🎮 Módulo de simuladores cargado correctamente');
console.log('Simuladores disponibles: MRU, Órbitas, MAS');
