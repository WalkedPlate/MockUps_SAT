// Estado del wizard
let pasoActual = 1;
const totalPasos = 4;

// Datos del formulario
let datosFormulario = {
    paso1: {},
    paso2: {},
    paso3: {},
    paso4: {}
};

// Datos ficticios para sectoristas
const sectoristas = [
    { id: 1, nombre: "Franco Mendoza", area: "Tributaria - MEPECOS", activo: true, cartera: 1247 },
    { id: 2, nombre: "Richard López", area: "Tributaria - Especialista", activo: true, cartera: 856 },
    { id: 3, nombre: "Ortega Pantoja", area: "Tributaria - PRICOS", activo: true, cartera: 2103 },
    { id: 4, nombre: "Juan Silva", area: "No Tributaria", activo: true, cartera: 674 },
    { id: 5, nombre: "Ana Rodríguez", area: "Coactiva", activo: false, cartera: 0 },
    { id: 6, nombre: "María López", area: "Tributaria - MEPECOS", activo: true, cartera: 934 }
];

// Inicializar wizard
document.addEventListener('DOMContentLoaded', function() {
    mostrarPaso(pasoActual);

    // Event listeners
    const btnSiguiente = document.getElementById('btn-siguiente');
    const btnAnterior = document.getElementById('btn-anterior');

    if (btnSiguiente) {
        btnSiguiente.addEventListener('click', siguientePaso);
    }

    if (btnAnterior) {
        btnAnterior.addEventListener('click', anteriorPaso);
    }
});

function mostrarPaso(numeroPaso) {
    // Ocultar todos los pasos
    const pasos = document.querySelectorAll('.paso-contenido');
    pasos.forEach(paso => paso.style.display = 'none');

    // Mostrar paso actual
    const pasoActualDiv = document.getElementById(`paso-${numeroPaso}`);
    if (pasoActualDiv) {
        pasoActualDiv.style.display = 'block';
    } else {
        // Si no existe el div, crear el contenido dinámicamente
        crearContenidoPaso(numeroPaso);
    }

    // Actualizar indicadores
    actualizarIndicadores();

    // Actualizar botones
    actualizarBotones();
}

function crearContenidoPaso(numeroPaso) {
    const contenedor = document.querySelector('.tarjeta');
    const contenidoExistente = contenedor.querySelector('.paso-contenido');

    if (contenidoExistente) {
        contenidoExistente.remove();
    }

    let html = '';

    switch(numeroPaso) {
        case 2:
            html = crearPaso2();
            break;
        case 3:
            html = crearPaso3();
            break;
        case 4:
            html = crearPaso4();
            break;
    }

    const navegacion = contenedor.querySelector('.wizard-navegacion');
    navegacion.insertAdjacentHTML('beforebegin', html);
}

function crearPaso2() {
    return `
        <div id="paso-2" class="paso-contenido">
            <h3 class="mb-3">Fechas y Horarios</h3>
            
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1.5rem;">
                <div class="grupo-form">
                    <label class="etiqueta">Fecha de Inicio</label>
                    <input type="date" class="campo" value="2025-02-01">
                </div>
                
                <div class="grupo-form">
                    <label class="etiqueta">Fecha de Fin</label>
                    <input type="date" class="campo" value="2025-02-28">
                </div>
                
                <div class="grupo-form">
                    <label class="etiqueta">Hora de Inicio</label>
                    <input type="time" class="campo" value="09:00">
                </div>
                
                <div class="grupo-form">
                    <label class="etiqueta">Hora de Fin</label>
                    <input type="time" class="campo" value="17:00">
                </div>
            </div>
            
            <div class="grupo-form">
                <label class="etiqueta">Días Activos</label>
                <div style="display: flex; gap: 1rem; margin-top: 0.5rem;">
                    <label style="display: flex; align-items: center; gap: 0.5rem;">
                        <input type="checkbox" checked> Lunes
                    </label>
                    <label style="display: flex; align-items: center; gap: 0.5rem;">
                        <input type="checkbox" checked> Martes
                    </label>
                    <label style="display: flex; align-items: center; gap: 0.5rem;">
                        <input type="checkbox" checked> Miércoles
                    </label>
                    <label style="display: flex; align-items: center; gap: 0.5rem;">
                        <input type="checkbox" checked> Jueves
                    </label>
                    <label style="display: flex; align-items: center; gap: 0.5rem;">
                        <input type="checkbox" checked> Viernes
                    </label>
                    <label style="display: flex; align-items: center; gap: 0.5rem;">
                        <input type="checkbox"> Sábado
                    </label>
                    <label style="display: flex; align-items: center; gap: 0.5rem;">
                        <input type="checkbox"> Domingo
                    </label>
                </div>
            </div>
        </div>
    `;
}

function crearPaso3() {
    // Sectoristas/Gestores inventados
    const gestores = [
        { id: 1, nombre: "Carlos Mendoza", area: "Tributaria MEPECOS", experiencia: "3 años" },
        { id: 2, nombre: "Lucia Vargas", area: "Tributaria MEPECOS", experiencia: "2 años" },
        { id: 3, nombre: "Miguel Torres", area: "Tributaria PRICOS", experiencia: "4 años" },
        { id: 4, nombre: "Ana Castillo", area: "Tributaria PRICOS", experiencia: "1 año" },
        { id: 5, nombre: "Roberto Silva", area: "No Tributaria", experiencia: "5 años" },
        { id: 6, nombre: "Patricia Rojas", area: "No Tributaria", experiencia: "2 años" },
        { id: 7, nombre: "David López", area: "Coactiva", experiencia: "3 años" },
        { id: 8, nombre: "Carmen Díaz", area: "Coactiva", experiencia: "1 año" }
    ];

    let gestoresList = gestores.map(g => `
        <div style="display: flex; align-items: center; justify-content: space-between; padding: 0.75rem; border: 1px solid var(--borde); border-radius: 6px; margin-bottom: 0.5rem;">
            <label style="display: flex; align-items: center; gap: 0.75rem; flex: 1; cursor: pointer;">
                <input type="checkbox" name="gestores" value="${g.id}">
                <div>
                    <div style="font-weight: 500;">${g.nombre}</div>
                    <div style="font-size: 0.875rem; color: var(--gris-medio);">${g.area}</div>
                </div>
            </label>
            <div style="text-align: right; font-size: 0.875rem;">
                <div style="color: var(--gris-medio);">Experiencia:</div>
                <div style="font-weight: 500;">${g.experiencia}</div>
            </div>
        </div>
    `).join('');

    return `
        <div id="paso-3" class="paso-contenido">
            <h3 class="mb-3">Seleccionar Gestores</h3>
            
            <div class="grupo-form">
                <label class="etiqueta">Buscar Gestor</label>
                <input type="text" class="campo" placeholder="Buscar por nombre o área...">
            </div>
            
            <div class="grupo-form">
                <label class="etiqueta">Gestores Disponibles</label>
                <div id="lista-gestores" style="max-height: 300px; overflow-y: auto;">
                    ${gestoresList}
                </div>
            </div>
            
            <div style="background-color: var(--sat-azul-suave); padding: 1rem; border-radius: 6px;">
                <h4 style="color: var(--sat-azul-principal); margin-bottom: 0.5rem;">
                    <i class="fas fa-question-circle"></i> Puntos para Discusión
                </h4>
                <ul style="color: var(--gris-oscuro); margin-left: 1rem;">
                    <li><strong>¿Qué son exactamente los "gestores"?</strong> ¿Son sectoristas, asesores, supervisores?</li>
                    <li><strong>¿Quién asigna qué?</strong> ¿Admin selecciona personal disponible y Supervisor asigna Sectoristas?</li>
                    <li><strong>¿Diferencia entre roles?</strong> Gestor vs Sectorista vs Asesor vs Supervisor</li>
                </ul>
            </div>
        </div>
    `;
}

function crearPaso4() {
    return `
        <div id="paso-4" class="paso-contenido">
            <h3 class="mb-3">Carga de Ciudadanos</h3>
            
            <div class="grupo-form">
                <label class="etiqueta">Subir Archivo Excel</label>
                <div style="border: 2px dashed var(--borde); border-radius: 8px; padding: 2rem; text-align: center; background-color: var(--gris-claro);">
                    <i class="fas fa-cloud-upload-alt" style="font-size: 3rem; color: var(--gris-medio); margin-bottom: 1rem;"></i>
                    <p style="margin: 0; color: var(--gris-medio);">Arrastra tu archivo aquí o</p>
                    <button class="btn btn-secundario mt-1" onclick="simularCargaArchivo()">
                        <i class="fas fa-folder-open"></i> Seleccionar Archivo
                    </button>
                </div>
            </div>
            
            <!-- Después de "cargar" archivo -->
            <div id="archivo-cargado" style="display: none;">
                <div style="background-color: var(--verde-exito); color: white; padding: 0.75rem; border-radius: 6px; margin-bottom: 1.5rem;">
                    <i class="fas fa-check-circle"></i> Archivo cargado: <strong>base_saldos_febrero.xlsx</strong>
                    <br><small>2,847 filas • 27 columnas detectadas</small>
                </div>
                
                <div class="grupo-form">
                    <label class="etiqueta">Tipo de Archivo</label>
                    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); gap: 1rem;">
                        <label class="tipo-archivo activo">
                            <input type="radio" name="tipo-archivo" value="base-saldos" checked onchange="cambiarTipoArchivo('base-saldos')">
                            <div>
                                <strong>Base de Saldos</strong>
                                <small>25+ columnas</small>
                            </div>
                        </label>
                        <label class="tipo-archivo">
                            <input type="radio" name="tipo-archivo" value="base-contactos" onchange="cambiarTipoArchivo('base-contactos')">
                            <div>
                                <strong>Base de Contactos</strong>
                                <small>~6 columnas</small>
                            </div>
                        </label>
                        <label class="tipo-archivo">
                            <input type="radio" name="tipo-archivo" value="papeletas" onchange="cambiarTipoArchivo('papeletas')">
                            <div>
                                <strong>Papeletas</strong>
                                <small>15+ columnas</small>
                            </div>
                        </label>
                    </div>
                </div>
                
                <!-- Mapeo por categorías -->
                <div id="mapeo-contenedor">
                    ${crearMapeoBaseSaldos()}
                </div>
                
                <!-- Vista previa compacta -->
                <div class="grupo-form">
                    <label class="etiqueta">Vista Previa de Datos</label>
                    <div id="vista-previa">
                        ${crearVistaPrevia()}
                    </div>
                </div>
            </div>
        </div>
    `;
}

function crearMapeoBaseSaldos() {
    return `
        <div class="grupo-form">
            <label class="etiqueta">Mapeo de Columnas por Categorías</label>
            
            <!-- Campos Obligatorios -->
            <div class="categoria-mapeo obligatorio">
                <h4><i class="fas fa-exclamation-circle"></i> Campos Obligatorios</h4>
                <div class="mapeo-grid">
                    ${crearCampoMapeo('Código Contribuyente', 'COL_A', 'codigo_contribuyente', true)}
                    ${crearCampoMapeo('Documento de Identidad', 'COL_B', 'documento', true)}
                    ${crearCampoMapeo('Nombre/Razón Social', 'COL_C', 'nombre', true)}
                    ${crearCampoMapeo('Monto Total Deuda', 'COL_D', 'monto_total', true)}
                </div>
            </div>
            
            <!-- Campos de Contacto -->
            <div class="categoria-mapeo contacto">
                <h4><i class="fas fa-phone"></i> Información de Contacto</h4>
                <div class="mapeo-grid">
                    ${crearCampoMapeo('Teléfono Principal', 'COL_E', 'telefono1', false)}
                    ${crearCampoMapeo('Teléfono Secundario', 'COL_F', 'telefono2', false)}
                    ${crearCampoMapeo('Email', 'COL_G', 'email', false)}
                    ${crearCampoMapeo('Dirección Fiscal', 'COL_H', 'direccion', false)}
                </div>
            </div>
            
            <!-- Campos de Deuda Tributaria -->
            <div class="categoria-mapeo deuda">
                <h4><i class="fas fa-dollar-sign"></i> Detalles de Deuda</h4>
                <div class="mapeo-grid">
                    ${crearCampoMapeo('Impuesto Predial', 'COL_I', 'impuesto_predial', false)}
                    ${crearCampoMapeo('Arbitrios', 'COL_J', 'arbitrios', false)}
                    ${crearCampoMapeo('Multas Tributarias', 'COL_K', 'multas_tributarias', false)}
                    ${crearCampoMapeo('Intereses Moratorios', 'COL_L', 'intereses', false)}
                    ${crearCampoMapeo('Costas Procesales', 'COL_M', 'costas', false)}
                    ${crearCampoMapeo('Fecha Vencimiento', 'COL_N', 'fecha_vencimiento', false)}
                </div>
            </div>
            
            <!-- Campos Administrativos -->
            <div class="categoria-mapeo admin">
                <h4><i class="fas fa-building"></i> Información Administrativa</h4>
                <div class="mapeo-grid">
                    ${crearCampoMapeo('Distrito', 'COL_O', 'distrito', false)}
                    ${crearCampoMapeo('Sector', 'COL_P', 'sector', false)}
                    ${crearCampoMapeo('Manzana', 'COL_Q', 'manzana', false)}
                    ${crearCampoMapeo('Lote', 'COL_R', 'lote', false)}
                    ${crearCampoMapeo('Sub Lote', 'COL_S', 'sub_lote', false)}
                    ${crearCampoMapeo('Tipo Contribuyente', 'COL_T', 'tipo_contribuyente', false)}
                </div>
            </div>
            
            <!-- Mostrar más campos -->
            <div style="text-align: center; margin: 1rem 0;">
                <button class="btn btn-secundario" onclick="toggleCamposAdicionales()">
                    <i class="fas fa-plus"></i> Mostrar 8 campos adicionales
                </button>
            </div>
            
            <!-- Botón auto-detectar 
            <div style="text-align: center;">
                <button class="btn btn-primario" onclick="autoDetectarColumnas()">
                    <i class="fas fa-magic"></i> Auto-detectar Columnas Comunes
                </button>
            </div>
            
            -->
        </div>
    `;
}

function crearCampoMapeo(etiqueta, columnaExcel, campo, obligatorio) {
    const icono = obligatorio ? '<i class="fas fa-asterisk" style="color: var(--rojo-error); font-size: 0.75rem;"></i>' : '';

    return `
        <div class="campo-mapeo">
            <label>${etiqueta} ${icono}</label>
            <div class="mapeo-fila">
                <span class="columna-excel">${columnaExcel}</span>
                <i class="fas fa-arrow-right"></i>
                <select class="campo select">
                    <option value="${campo}" selected>${etiqueta}</option>
                    <option value="ignorar">Ignorar</option>
                    <option value="documento">Documento</option>
                    <option value="nombre">Nombre</option>
                    <option value="telefono">Teléfono</option>
                    <option value="email">Email</option>
                    <option value="monto">Monto</option>
                </select>
            </div>
        </div>
    `;
}

function crearVistaPrevia() {
    return `
        <div class="vista-previa-contenedor">
            <div class="vista-previa-header">
                <span>📊 Resumen: 2,847 registros • 3 errores detectados</span>
                <button class="btn btn-secundario btn-sm">Ver detalles completos</button>
            </div>
            <div class="vista-previa-tabla">
                <table style="width: 100%; border-collapse: collapse;">
                    <thead>
                        <tr style="background-color: var(--gris-claro);">
                            <th>Documento</th>
                            <th>Nombre</th>
                            <th>Teléfono</th>
                            <th>Monto</th>
                            <th>Estado</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>12345678</td>
                            <td>Juan Pérez López</td>
                            <td>999123456</td>
                            <td>S/ 1,250.00</td>
                            <td><span class="badge verde">✓ Válido</span></td>
                        </tr>
                        <tr>
                            <td>87654321</td>
                            <td>Ana María Rodríguez</td>
                            <td>988654321</td>
                            <td>S/ 850.50</td>
                            <td><span class="badge verde">✓ Válido</span></td>
                        </tr>
                        <tr style="background-color: #fef2f2;">
                            <td>1234567</td>
                            <td>Luis Torres</td>
                            <td>-</td>
                            <td>S/ 0.00</td>
                            <td><span class="badge rojo">⚠ Error</span></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    `;
}

function siguientePaso() {
    if (pasoActual < totalPasos) {
        pasoActual++;
        mostrarPaso(pasoActual);
    }
}

function anteriorPaso() {
    if (pasoActual > 1) {
        pasoActual--;
        mostrarPaso(pasoActual);
    }
}

function actualizarIndicadores() {
    const pasos = document.querySelectorAll('.paso');
    pasos.forEach((paso, index) => {
        const numeroPaso = index + 1;
        paso.classList.remove('activo', 'completado');

        if (numeroPaso === pasoActual) {
            paso.classList.add('activo');
        } else if (numeroPaso < pasoActual) {
            paso.classList.add('completado');
        }
    });
}

function actualizarBotones() {
    const btnAnterior = document.getElementById('btn-anterior') || crearBotonAnterior();
    const btnSiguiente = document.getElementById('btn-siguiente');

    // Actualizar botón anterior
    btnAnterior.disabled = pasoActual === 1;

    // Actualizar botón siguiente
    if (pasoActual === totalPasos) {
        btnSiguiente.innerHTML = '<i class="fas fa-check"></i> Crear Campaña';
        btnSiguiente.className = 'btn btn-exito';
    } else {
        btnSiguiente.innerHTML = 'Siguiente <i class="fas fa-arrow-right"></i>';
        btnSiguiente.className = 'btn btn-primario';
    }
}

function crearBotonAnterior() {
    const navegacion = document.querySelector('.wizard-navegacion');
    const btnAnterior = document.createElement('button');
    btnAnterior.id = 'btn-anterior';
    btnAnterior.className = 'btn btn-secundario';
    btnAnterior.innerHTML = '<i class="fas fa-arrow-left"></i> Anterior';
    btnAnterior.addEventListener('click', anteriorPaso);

    navegacion.insertBefore(btnAnterior, navegacion.firstChild);
    return btnAnterior;
}

// Funciones para el paso 4
function simularCargaArchivo() {
    // Simular carga de archivo
    document.getElementById('archivo-cargado').style.display = 'block';

    // Scroll suave hacia el contenido cargado
    setTimeout(() => {
        document.getElementById('archivo-cargado').scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }, 100);
}

function cambiarTipoArchivo(tipo) {
    // Actualizar estilos de selección
    document.querySelectorAll('.tipo-archivo').forEach(el => {
        el.classList.remove('activo');
    });

    // Activar el seleccionado
    const seleccionado = document.querySelector(`input[value="${tipo}"]`).closest('.tipo-archivo');
    seleccionado.classList.add('activo');

    // Cambiar contenido del mapeo según tipo
    const mapeoContainer = document.getElementById('mapeo-contenedor');

    switch(tipo) {
        case 'base-saldos':
            mapeoContainer.innerHTML = crearMapeoBaseSaldos();
            break;
        case 'base-contactos':
            mapeoContainer.innerHTML = crearMapeoBaseContactos();
            break;
        case 'papeletas':
            mapeoContainer.innerHTML = crearMapeoPapeletas();
            break;
    }
}

function crearMapeoBaseContactos() {
    return `
        <div class="grupo-form">
            <label class="etiqueta">Mapeo de Columnas - Base de Contactos</label>
            
            <div class="categoria-mapeo obligatorio">
                <h4><i class="fas fa-exclamation-circle"></i> Campos Obligatorios</h4>
                <div class="mapeo-grid">
                    ${crearCampoMapeo('Código Contribuyente', 'COL_A', 'codigo', true)}
                    ${crearCampoMapeo('Documento', 'COL_B', 'documento', true)}
                </div>
            </div>
            
            <div class="categoria-mapeo contacto">
                <h4><i class="fas fa-phone"></i> Información de Contacto</h4>
                <div class="mapeo-grid">
                    ${crearCampoMapeo('Teléfono', 'COL_C', 'telefono', false)}
                    ${crearCampoMapeo('Email', 'COL_D', 'email', false)}
                    ${crearCampoMapeo('Dirección', 'COL_E', 'direccion', false)}
                    ${crearCampoMapeo('Nombre', 'COL_F', 'nombre', false)}
                </div>
            </div>
        </div>
    `;
}

function crearMapeoPapeletas() {
    return `
        <div class="grupo-form">
            <label class="etiqueta">Mapeo de Columnas - Papeletas</label>
            
            <div class="categoria-mapeo obligatorio">
                <h4><i class="fas fa-exclamation-circle"></i> Campo Principal</h4>
                <div class="mapeo-grid">
                    ${crearCampoMapeo('Código de Papeleta', 'COL_A', 'codigo_papeleta', true)}
                </div>
            </div>
            
            <div class="categoria-mapeo contacto">
                <h4><i class="fas fa-user"></i> Información del Infractor</h4>
                <div class="mapeo-grid">
                    ${crearCampoMapeo('Documento Infractor', 'COL_B', 'documento', false)}
                    ${crearCampoMapeo('Nombre Infractor', 'COL_C', 'nombre', false)}
                    ${crearCampoMapeo('Teléfono', 'COL_D', 'telefono', false)}
                    ${crearCampoMapeo('Email', 'COL_E', 'email', false)}
                </div>
            </div>
            
            <div class="categoria-mapeo deuda">
                <h4><i class="fas fa-car"></i> Información de Infracción</h4>
                <div class="mapeo-grid">
                    ${crearCampoMapeo('Monto Multa', 'COL_F', 'monto', false)}
                    ${crearCampoMapeo('Fecha Infracción', 'COL_G', 'fecha_infraccion', false)}
                    ${crearCampoMapeo('Tipo Infracción', 'COL_H', 'tipo_infraccion', false)}
                    ${crearCampoMapeo('Placa Vehículo', 'COL_I', 'placa', false)}
                    ${crearCampoMapeo('Estado Papeleta', 'COL_J', 'estado', false)}
                    ${crearCampoMapeo('Ubicación', 'COL_K', 'ubicacion', false)}
                </div>
            </div>
            
            <div style="text-align: center; margin: 1rem 0;">
                <button class="btn btn-secundario" onclick="toggleCamposAdicionales()">
                    <i class="fas fa-plus"></i> Mostrar 8 campos adicionales
                </button>
            </div>
        </div>
    `;
}

function toggleCamposAdicionales() {
    const btn = event.target;
    const camposAdicionales = document.getElementById('campos-adicionales');

    if (camposAdicionales) {
        // Si ya existen, ocultarlos
        camposAdicionales.remove();
        btn.innerHTML = '<i class="fas fa-plus"></i> Mostrar 15 campos adicionales';
    } else {
        // Crear y mostrar campos adicionales
        const html = `
            <div id="campos-adicionales" class="categoria-mapeo adicional">
                <h4><i class="fas fa-list"></i> Campos Adicionales</h4>
                <div class="mapeo-grid">
                    ${crearCampoMapeo('RUC', 'COL_L', 'ruc', false)}
                    ${crearCampoMapeo('Distrito', 'COL_M', 'distrito', false)}
                    ${crearCampoMapeo('Provincia', 'COL_N', 'provincia', false)}
                    ${crearCampoMapeo('Departamento', 'COL_O', 'departamento', false)}
                    ${crearCampoMapeo('Código Postal', 'COL_P', 'codigo_postal', false)}
                    ${crearCampoMapeo('Fecha Emisión', 'COL_Q', 'fecha_emision', false)}
                    ${crearCampoMapeo('Periodo Tributario', 'COL_R', 'periodo', false)}
                    ${crearCampoMapeo('Base Imponible', 'COL_S', 'base_imponible', false)}
                    ${crearCampoMapeo('IGV', 'COL_T', 'igv', false)}
                    ${crearCampoMapeo('Multa', 'COL_U', 'multa', false)}
                    ${crearCampoMapeo('Intereses Moratorios', 'COL_V', 'intereses_moratorios', false)}
                    ${crearCampoMapeo('Total Deuda', 'COL_W', 'total_deuda', false)}
                </div>
            </div>
        `;

        btn.closest('.categoria-mapeo').insertAdjacentHTML('afterend', html);
        btn.innerHTML = '<i class="fas fa-minus"></i> Ocultar campos adicionales';

        // Scroll hacia los nuevos campos
        document.getElementById('campos-adicionales').scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

function autoDetectarColumnas() {
    // Simular auto-detección
    const selects = document.querySelectorAll('#mapeo-contenedor select');

    // Animación de "procesando"
    const btn = event.target;
    const originalText = btn.innerHTML;
    btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Detectando...';
    btn.disabled = true;

    setTimeout(() => {
        // Simular cambios en algunos selects
        selects.forEach((select, index) => {
            if (Math.random() > 0.7) { // 30% de probabilidad de cambio
                select.style.backgroundColor = '#dcfce7'; // Verde claro
                select.style.borderColor = '#16a34a';
            }
        });

        // Mostrar mensaje de éxito
        btn.innerHTML = '<i class="fas fa-check"></i> Detección completada';
        btn.style.backgroundColor = 'var(--verde-exito)';
        btn.style.color = 'white';

        // Restaurar después de 2 segundos
        setTimeout(() => {
            btn.innerHTML = originalText;
            btn.disabled = false;
            btn.style.backgroundColor = '';
            btn.style.color = '';
        }, 2000);

    }, 1500);
}

function crearVistaPrevia() {
    return `
        <div class="vista-previa-contenedor">
            <div class="vista-previa-header">
                <span>📊 Resumen: 2,847 registros • 3 errores detectados</span>
                <button class="btn btn-secundario btn-sm" onclick="mostrarDetallesCompletos()">
                    Ver detalles completos
                </button>
            </div>
            <div class="vista-previa-tabla">
                <table style="width: 100%; border-collapse: collapse;">
                    <thead>
                        <tr style="background-color: var(--gris-claro);">
                            <th>Documento</th>
                            <th>Nombre</th>
                            <th>Teléfono</th>
                            <th>Monto</th>
                            <th>Estado</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>20123456789</td>
                            <td>EMPRESA CONSTRUCTORA SAC</td>
                            <td>999123456</td>
                            <td>S/ 15,250.00</td>
                            <td><span class="badge verde">✓ Válido</span></td>
                        </tr>
                        <tr>
                            <td>12345678</td>
                            <td>Juan Pérez López</td>
                            <td>988654321</td>
                            <td>S/ 850.50</td>
                            <td><span class="badge verde">✓ Válido</span></td>
                        </tr>
                        <tr style="background-color: #fef2f2;">
                            <td>1234567</td>
                            <td>Luis Torres García</td>
                            <td>-</td>
                            <td>S/ 0.00</td>
                            <td><span class="badge rojo">⚠ Error</span></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
        
        <!-- Modal para detalles completos (oculto inicialmente) -->
        <div id="modal-detalles" class="modal" style="display: none;">
            <div class="modal-contenido">
                <div class="modal-header">
                    <h3>Análisis Completo del Archivo</h3>
                    <button class="btn-cerrar" onclick="cerrarDetallesCompletos()">&times;</button>
                </div>
                <div class="modal-body">
                    ${crearAnalisisCompleto()}
                </div>
            </div>
        </div>
    `;
}

function mostrarDetallesCompletos() {
    document.getElementById('modal-detalles').style.display = 'flex';
    document.body.style.overflow = 'hidden'; // Prevenir scroll del fondo
}

function cerrarDetallesCompletos() {
    document.getElementById('modal-detalles').style.display = 'none';
    document.body.style.overflow = 'auto';
}

function crearAnalisisCompleto() {
    return `
        <div class="analisis-completo">
            <div class="resumen-estadisticas">
                <div class="stat-card">
                    <h4>Total Registros</h4>
                    <div class="stat-numero">2,847</div>
                </div>
                <div class="stat-card verde">
                    <h4>Válidos</h4>
                    <div class="stat-numero">2,834</div>
                </div>
                <div class="stat-card rojo">
                    <h4>Con Errores</h4>
                    <div class="stat-numero">13</div>
                </div>
                <div class="stat-card amarillo">
                    <h4>Duplicados</h4>
                    <div class="stat-numero">8</div>
                </div>
            </div>
            
            <div class="problemas-detectados">
                <h4>🚨 Problemas Detectados</h4>
                <div class="problema-item">
                    <span class="problema-tipo">Documentos inválidos:</span>
                    <span class="problema-detalle">5 registros con documentos de menos de 8 dígitos</span>
                </div>
                <div class="problema-item">
                    <span class="problema-tipo">Sin teléfono:</span>
                    <span class="problema-detalle">156 registros sin número de contacto</span>
                </div>
                <div class="problema-item">
                    <span class="problema-tipo">Monto cero:</span>
                    <span class="problema-detalle">8 registros con deuda S/ 0.00</span>
                </div>
                <div class="problema-item">
                    <span class="problema-tipo">Duplicados:</span>
                    <span class="problema-detalle">8 documentos aparecen más de una vez</span>
                </div>
            </div>
            
            <div class="acciones-correccion">
                <h4>🔧 Acciones Recomendadas</h4>
                <button class="btn btn-secundario">
                    <i class="fas fa-download"></i> Descargar Lista de Errores
                </button>
                <button class="btn btn-primario">
                    <i class="fas fa-check"></i> Continuar Solo con Válidos
                </button>
            </div>
        </div>
    `;
}