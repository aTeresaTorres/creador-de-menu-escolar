// ========================================================
// REFERENCIAS DOM
// ========================================================
const $ = (id) => document.getElementById(id);

const pantallaCaptura = $('pantalla-captura');
const pantallaResultado = $('pantalla-resultado');
const textoMenu = $('texto-menu');
const btnGenerar = $('btn-generar');
const btnVerPreview = $('btn-ver-preview');
const estadoIA = $('estado-ia');

// ========================================================
// API KEY (configuración persistente en localStorage)
// ========================================================
const API_KEY_STORAGE = 'menu-escolar-groq-key';

const btnApiToggle = $('btn-api-toggle');
const btnApiClose = $('btn-api-close');
const apiPanel = $('api-panel');
const inApiKey = $('in-api-key');
const btnApiSave = $('btn-api-save');
const btnApiClear = $('btn-api-clear');
const btnApiVisibility = $('btn-api-toggle-visibility');
const apiFeedback = $('api-feedback');
const apiStatusDot = $('api-status-dot');

function getApiKey() {
  return localStorage.getItem(API_KEY_STORAGE) || '';
}

function setApiKey(key) {
  if (key && key.trim()) {
    localStorage.setItem(API_KEY_STORAGE, key.trim());
  } else {
    localStorage.removeItem(API_KEY_STORAGE);
  }
  actualizarEstadoApi();
}

function actualizarEstadoApi() {
  const key = getApiKey();
  const tiene = key && key.startsWith('gsk_');
  apiStatusDot.classList.toggle('api-dot-on', tiene);
  apiStatusDot.classList.toggle('api-dot-off', !tiene);
  inApiKey.value = key;
}

function mostrarFeedbackApi(msg, tipo = '') {
  apiFeedback.textContent = msg;
  apiFeedback.className = 'api-feedback ' + tipo;
}

// Abrir/cerrar el panel
btnApiToggle.addEventListener('click', () => {
  apiPanel.hidden = !apiPanel.hidden;
  if (!apiPanel.hidden) {
    inApiKey.focus();
    mostrarFeedbackApi('');
  }
});

btnApiClose.addEventListener('click', () => {
  apiPanel.hidden = true;
});

// Mostrar/ocultar la key
btnApiVisibility.addEventListener('click', () => {
  inApiKey.type = inApiKey.type === 'password' ? 'text' : 'password';
});

// Guardar
btnApiSave.addEventListener('click', () => {
  const val = inApiKey.value.trim();
  if (!val) {
    mostrarFeedbackApi('Escribe una API Key antes de guardar.', 'error');
    return;
  }
  if (!val.startsWith('gsk_')) {
    mostrarFeedbackApi('La API Key debe empezar con "gsk_".', 'error');
    return;
  }
  setApiKey(val);
  mostrarFeedbackApi('Guardada correctamente.', 'exito');
  setTimeout(() => { apiPanel.hidden = true; }, 900);
});

// Borrar
btnApiClear.addEventListener('click', () => {
  setApiKey('');
  inApiKey.value = '';
  mostrarFeedbackApi('API Key borrada.', 'error');
});

// Guardar con Enter
inApiKey.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') btnApiSave.click();
});

// Inicializar
actualizarEstadoApi();

// ========================================================
// ESTRUCTURA DE DATOS
// ========================================================
const diasData = {
  lunes: { label: 'LUNES', cls: 'card-lunes', titleCls: 'title-lunes', items: [] },
  martes: { label: 'MARTES', cls: 'card-martes', titleCls: 'title-martes', items: [] },
  miercoles: { label: 'MIÉRCOLES', cls: 'card-miercoles', titleCls: 'title-miercoles', items: [] },
  jueves: { label: 'JUEVES', cls: 'card-jueves', titleCls: 'title-jueves', items: [] },
  viernes: { label: 'VIERNES', cls: 'card-viernes', titleCls: 'title-viernes', items: [] }
};

let guisadosData = [
  { dia: 'LUNES', key: 'lunes', value: '' },
  { dia: 'MARTES', key: 'martes', value: '' },
  { dia: 'MIÉRCOLES', key: 'miercoles', value: '' },
  { dia: 'JUEVES', key: 'jueves', value: '' },
  { dia: 'VIERNES', key: 'viernes', value: '' }
];

let diariamenteItems = [
  { nombre: 'GELATINAS', precio: '$10', activo: true },
  { nombre: 'FLAN', precio: '$12', activo: true },
  { nombre: 'PALOMITAS', precio: '$10', activo: true },
  { nombre: 'CARLOTAS', precio: '$15', activo: true },
  { nombre: 'CACAHUATES', precio: '$10', activo: true },
  { nombre: 'AGUA NATURAL', precio: '$15', activo: true },
  { nombre: 'CHOCOMILK', precio: '$15', activo: true },
  { nombre: 'GALLETA DE AVENA', precio: '$13', activo: true },
  { nombre: 'GALLETA DE NUÉZ', precio: '$10', activo: true },
  { nombre: 'CHOCOBANANA', precio: '$10', activo: true },
  { nombre: 'HIELITOS', precio: '$10', activo: true },
  { nombre: 'YOGURT CON FRUTA', precio: '$15', activo: true },
  { nombre: 'FRUTA PICADA', precio: '$12', activo: true },
  { nombre: 'ARRÓZ CON LECHE', precio: '$15', activo: true },
  { nombre: 'ENERGÉTICAS', precio: '$30', activo: true }
];

// ========================================================
// PERSISTENCIA
// ========================================================
const STORAGE_KEY = 'menu-escolar-config-v1';

function guardarEstado() {
  try {
    const estado = {
      linea1: $('in-linea1').value,
      linea2: $('in-linea2').value,
      footerInfantil: $('in-footer-infantil').value,
      footerMaestros: $('in-footer-maestros').value,
      diariamenteItems: diariamenteItems,
      timestamp: Date.now()
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(estado));
  } catch (e) {
    console.warn('No se pudo guardar configuración:', e);
  }
}

function cargarEstado() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return false;
    const estado = JSON.parse(raw);

    if (estado.linea1) $('in-linea1').value = estado.linea1;
    if (estado.linea2) $('in-linea2').value = estado.linea2;
    if (estado.footerInfantil) $('in-footer-infantil').value = estado.footerInfantil;
    if (estado.footerMaestros) $('in-footer-maestros').value = estado.footerMaestros;

    if (Array.isArray(estado.diariamenteItems) && estado.diariamenteItems.length > 0) {
      diariamenteItems = estado.diariamenteItems;
    }
    return true;
  } catch (e) {
    console.warn('No se pudo cargar configuración:', e);
    return false;
  }
}

// ========================================================
// RENDER DE CONTROLES
// ========================================================
function renderDias() {
  const container = $('dias-container');
  container.innerHTML = '';
  ['lunes', 'martes', 'miercoles', 'jueves', 'viernes'].forEach(key => {
    const dia = diasData[key];
    const div = document.createElement('div');
    div.innerHTML = `
      <div class="day-group-title ${dia.titleCls}">${dia.label}</div>
      <div class="items-container" id="items-${key}" data-key="${key}"></div>
      <button class="add-row-btn" type="button" onclick="agregarItemDia('${key}')">+ Agregar platillo</button>
    `;
    container.appendChild(div);
    renderDiaItems(key);
  });
}

function renderDiaItems(key) {
  const container = $(`items-${key}`);
  if (!container) return;
  container.innerHTML = '';
  diasData[key].items.forEach((item, idx) => {
    const row = document.createElement('div');
    row.className = 'item-row';
    row.innerHTML = `
      <div class="checkbox-wrap">
        <input type="checkbox" ${item.activo ? 'checked' : ''} onchange="toggleDiaItem('${key}', ${idx})">
      </div>
      <input type="text" value="${item.nombre}" oninput="updateDiaItem('${key}', ${idx}, 'nombre', this.value)">
      <input type="text" class="price-input" value="${item.precio}" oninput="updateDiaItem('${key}', ${idx}, 'precio', this.value)">
      <button class="btn-remove" type="button" onclick="eliminarDiaItem('${key}', ${idx})">✕</button>
    `;
    container.appendChild(row);
  });
}

function agregarItemDia(key) {
  diasData[key].items.push({ nombre: 'Nuevo platillo', precio: '$0', activo: true });
  renderDiaItems(key);
}

function eliminarDiaItem(key, idx) {
  diasData[key].items.splice(idx, 1);
  renderDiaItems(key);
}

function toggleDiaItem(key, idx) {
  diasData[key].items[idx].activo = !diasData[key].items[idx].activo;
}

function updateDiaItem(key, idx, field, val) {
  diasData[key].items[idx][field] = val;
}

// ========================================================
// GUISADOS
// ========================================================
function renderGuisados() {
  const container = $('guisados-container');
  container.innerHTML = '';
  guisadosData.forEach((g, idx) => {
    const row = document.createElement('div');
    row.className = 'item-row';
    row.innerHTML = `
      <span style="font-weight:600; font-size:13px; min-width:80px; color:#444;">${g.dia}</span>
      <input type="text" value="${g.value}" oninput="updateGuisado(${idx}, this.value)">
    `;
    container.appendChild(row);
  });
}

function updateGuisado(idx, val) {
  guisadosData[idx].value = val;
}

// ========================================================
// DIARIAMENTE
// ========================================================
function renderDiariamente() {
  const container = $('diariamente-container');
  container.innerHTML = '';
  diariamenteItems.forEach((item, idx) => {
    const row = document.createElement('div');
    row.className = 'item-row';
    row.innerHTML = `
      <div class="checkbox-wrap">
        <input type="checkbox" ${item.activo ? 'checked' : ''} onchange="toggleDiario(${idx})">
      </div>
      <input type="text" value="${item.nombre}" oninput="updateDiario(${idx}, 'nombre', this.value)">
      <input type="text" class="price-input" value="${item.precio}" oninput="updateDiario(${idx}, 'precio', this.value)">
      <button class="btn-remove" type="button" onclick="eliminarDiario(${idx})">✕</button>
    `;
    container.appendChild(row);
  });
}

function toggleDiario(idx) {
  diariamenteItems[idx].activo = !diariamenteItems[idx].activo;
  guardarEstado();
}
function updateDiario(idx, field, val) {
  diariamenteItems[idx][field] = val;
  guardarEstado();
}
function eliminarDiario(idx) {
  diariamenteItems.splice(idx, 1);
  renderDiariamente();
  guardarEstado();
}
function agregarItemDiario() {
  diariamenteItems.push({ nombre: 'Nuevo producto', precio: '$10', activo: true });
  renderDiariamente();
  guardarEstado();
}

// ========================================================
// LLAMADA A LA IA — DIRECTO A GROQ (sin backend)
// ========================================================
const GROQ_URL = 'https://api.groq.com/openai/v1/chat/completions';
const MODELO = 'qwen/qwen3-32b';

btnGenerar.addEventListener('click', async () => {
  const texto = textoMenu.value.trim();
  if (texto.length < 5) {
    setEstadoIA('Escribe o dicta al menos unas palabras.', 'error');
    return;
  }

  // Validar API key antes de mandar
  const apiKey = getApiKey();
  if (!apiKey) {
    setEstadoIA('Primero configura tu API Key (botón 🔑 arriba).', 'error');
    apiPanel.hidden = false;
    inApiKey.focus();
    return;
  }

  btnGenerar.disabled = true;
  setEstadoIA('La IA está organizando los días...');

  const prompt = `
Eres un asistente que convierte descripciones habladas de menús escolares en JSON estructurado.

El usuario te dará un texto en español describiendo el menú de la cooperativa escolar.
Debes devolver SOLO un JSON válido con esta forma exacta:

{
  "linea1": "Primaria",
  "linea2": null,
  "dias": {
    "lunes": [{ "nombre": "TACOS", "precio": "$25", "activo": true }],
    "martes": [],
    "miercoles": [],
    "jueves": [],
    "viernes": []
  },
  "guisados": {
    "lunes": "PICADILLO",
    "martes": "",
    "miercoles": "",
    "jueves": "",
    "viernes": ""
  }
}

REGLAS IMPORTANTES:

1. TODO lo que el usuario mencione como comida o bebida va DENTRO DEL DÍA correspondiente en "dias".
   Esto incluye: tacos, tortas, aguas, refrescos, gelatinas, flanes, etc.
   NO existe una sección separada para bebidas: las aguas van como un platillo más del día.

2. Los precios se escriben con signo $ y respetan el formato que dijo el usuario.
   Ejemplos válidos: "$25", "3 X $25", "2 X $30", "$15".
   Si dice "3 por 25" o "3 x 25" → escribe "3 X $25".
   Si dice "tacos a 25" → escribe "$25".

3. Los nombres SIEMPRE en MAYÚSCULAS.
   Ejemplo: "agua de jamaica" → "AGUA DE JAMAICA".

4. En "guisados" cada día tiene UN solo guisado (string). Si no se menciona, déjalo "".

5. Si no se menciona un día, déjalo con array vacío [].

6. NUNCA inventes platillos, bebidas o precios que el usuario no mencionó.

7. Ignora muletillas ("eh", "este", "a ver", "o sea").

8. Devuelve SOLO el JSON, sin texto antes ni después, sin markdown, sin \`\`\`.

9. Nunca ignorar las aguas que también se mencionan en los menús de los diferentes días, no los omitas.

EJEMPLO:

Texto del usuario:
"El lunes tacos a 3 x 25 y aguas de jamaica a 15. El martes enchiladas a 30 con agua de horchata a 15. De guisado el lunes picadillo."

Respuesta esperada:
{
  "linea1": "Primaria",
  "linea2": null,
  "dias": {
    "lunes": [
      { "nombre": "TACOS", "precio": "3 X $25", "activo": true },
      { "nombre": "AGUA DE JAMAICA", "precio": "$15", "activo": true }
    ],
    "martes": [
      { "nombre": "ENCHILADAS", "precio": "$30", "activo": true },
      { "nombre": "AGUA DE HORCHATA", "precio": "$15", "activo": true }
    ],
    "miercoles": [],
    "jueves": [],
    "viernes": []
  },
  "guisados": {
    "lunes": "PICADILLO",
    "martes": "",
    "miercoles": "",
    "jueves": "",
    "viernes": ""
  }
}

Texto del usuario:
"""${texto}"""
`;

  try {
    let data = null;
    let lastError = null;

    for (let intento = 1; intento <= 3; intento++) {
      try {
        console.log(`Intento ${intento}/3 → Groq (${MODELO})...`);

        const response = await fetch(GROQ_URL, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${apiKey}`
          },
          body: JSON.stringify({
            model: MODELO,
            messages: [
              {
                role: 'system',
                content: 'Eres un asistente que devuelve EXCLUSIVAMENTE JSON válido, sin markdown ni texto adicional.'
              },
              { role: 'user', content: prompt }
            ],
            temperature: 0,
            response_format: { type: 'json_object' }
          })
        });

        if (!response.ok) {
          const errBody = await response.json().catch(() => ({}));
          const msg = errBody?.error?.message || `HTTP ${response.status}`;

          if (response.status === 401) {
            setApiKey('');
            setEstadoIA('API Key inválida. Vuelve a configurarla.', 'error');
            apiPanel.hidden = false;
            inApiKey.focus();
            throw new Error('API Key inválida');
          }

          if (response.status === 429 || response.status === 503) {
            lastError = new Error(msg);
            const espera = 2000 * intento;
            console.warn(`Groq ocupado. Reintento en ${espera / 1000}s...`);
            await new Promise((r) => setTimeout(r, espera));
            continue;
          }

          throw new Error(msg);
        }

        const json = await response.json();
        const textoRespuesta = json.choices[0].message.content;
        data = JSON.parse(textoRespuesta);
        console.log('Respuesta OK');
        break;
      } catch (err) {
        lastError = err;
        const esReintentable =
          err.message?.includes('rate limit') ||
          err.message?.includes('overloaded') ||
          err.message?.includes('503');

        if (esReintentable && intento < 3) {
          const espera = 2000 * intento;
          await new Promise((r) => setTimeout(r, espera));
          continue;
        }
        throw err;
      }
    }

    if (!data) throw lastError || new Error('No se obtuvo respuesta');

    // ============ APLICAR RESULTADOS ============
    ['lunes', 'martes', 'miercoles', 'jueves', 'viernes'].forEach(key => {
      if (Array.isArray(data.dias?.[key]) && data.dias[key].length > 0) {
        diasData[key].items = data.dias[key].map(i => ({
          nombre: i.nombre || '',
          precio: i.precio || '',
          activo: i.activo !== false
        }));
        renderDiaItems(key);
      }
    });

    if (data.guisados) {
      guisadosData.forEach(g => {
        if (data.guisados[g.key]) g.value = data.guisados[g.key];
      });
      renderGuisados();
    }

    if (data.linea1) $('in-linea1').value = data.linea1;
    if (data.linea2) {
      const select = $('in-linea2');
      const existe = Array.from(select.options).some(o => o.value === data.linea2);
      if (existe) select.value = data.linea2;
    }

    setEstadoIA('Días y guisados actualizados.', 'exito');
    actualizarTodo();
  } catch (err) {
    console.error(err);
    setEstadoIA('❌ ' + err.message, 'error');
  } finally {
    btnGenerar.disabled = false;
  }
});

function setEstadoIA(msg, tipo = '') {
  estadoIA.textContent = msg;
  estadoIA.className = 'estado ' + tipo;
}

// ========================================================
// RENDER DE VISTA PREVIA
// ========================================================
function renderDayBlock(key) {
  const items = diasData[key].items.filter(i => i.activo && i.nombre.trim() !== '');
  if (items.length === 0) return '';
  return items.map(i => `
    <div class="menu-item"><span>${i.nombre}</span><span class="dots"></span><span>${i.precio}</span></div>
  `).join('');
}

function actualizarMenuSemanal() {
  $('out-linea1').innerText = $('in-linea1').value;
  $('out-linea2').innerText = $('in-linea2').value;

  const renderContainer = $('dias-render');
  renderContainer.innerHTML = '';
  let hayDias = false;

  ['lunes', 'martes', 'miercoles', 'jueves', 'viernes'].forEach(key => {
    const dia = diasData[key];
    const itemsActivos = dia.items.filter(i => i.activo && i.nombre.trim() !== '');
    if (itemsActivos.length === 0) return;

    hayDias = true;
    const card = document.createElement('div');
    card.className = `menu-card ${dia.cls}`;
    card.innerHTML = `
      <div class="card-title">${dia.label}</div>
      <div class="menu-list">${renderDayBlock(key)}</div>
    `;
    renderContainer.appendChild(card);
  });

  const leftCol = document.querySelector('.left-column');
  if (leftCol) leftCol.style.display = hayDias ? '' : 'none';

  // Diariamente
  const diarioContainer = $('out-diariamente');
  diarioContainer.innerHTML = '';
  const activeDiario = diariamenteItems.filter(i => i.activo && i.nombre.trim() !== '');
  if (activeDiario.length === 0) {
    $('card-diariamente').style.display = 'none';
  } else {
    $('card-diariamente').style.display = '';
    activeDiario.forEach(i => {
      diarioContainer.innerHTML += `
        <div class="menu-item"><span>${i.nombre}</span><span class="dots"></span><span>${i.precio}</span></div>
      `;
    });
  }

  // Guisados: solo los que tienen valor
  const guisadosConValor = guisadosData.filter(g => g.value && g.value.trim() !== '');
  const cardG = $('card-guisados');
  const wrapG = $('card-guisados-wrap');
  if (guisadosConValor.length === 0) {
    cardG.style.display = 'none';
    wrapG.style.display = 'none';
  } else {
    cardG.style.display = '';
    wrapG.style.display = '';
    $('out-guisados').innerHTML = guisadosConValor.map(g => `
      <div class="guisado-item"><span>${g.dia}</span><span class="dots"></span><span>${g.value}</span></div>
    `).join('');
  }

  $('out-footer-infantil').innerText = $('in-footer-infantil').value;
  $('out-footer-maestros').innerText = $('in-footer-maestros').value;
}

function renderMenusDia() {
  const container = $('day-menus-container');
  container.innerHTML = '';
  const infantil = $('in-footer-infantil').value;
  const maestros = $('in-footer-maestros').value;

  let hayAlgunDia = false;

  ['lunes','martes','miercoles','jueves','viernes'].forEach(key => {
    const dia = diasData[key];
    const itemsActivos = dia.items.filter(i => i.activo && i.nombre.trim() !== '');
    if (itemsActivos.length === 0) return;

    hayAlgunDia = true;
    const guisado = guisadosData.find(g => g.key === key);

    const grupo = document.createElement('div');
    grupo.className = 'day-menu-group';

    const dayContainer = document.createElement('div');
    dayContainer.className = 'day-menu-container';
    dayContainer.id = `day-menu-${key}`;

    let html = `
      <div class="day-menu-title">MENÚ ${dia.label}</div>
      <ul class="day-menu-items">
    `;
    itemsActivos.forEach(item => {
      html += `
        <li class="day-menu-item">
          <span class="item-name">${item.nombre}</span>
          <span class="item-price">${item.precio}</span>
        </li>
      `;
    });
    html += `</ul>`;

    if (guisado && guisado.value && guisado.value.trim() !== '') {
      html += `
        <div class="day-menu-guisado">
          <span class="label">GUISADO DEL DIA</span>
          <span class="value">${guisado.value}</span>
        </div>
      `;
    }

    html += `
      <div class="day-menu-precios">
        <div class="precio-line infantil">${infantil}</div>
        <div class="precio-line maestros">${maestros}</div>
      </div>
    `;

    dayContainer.innerHTML = html;
    grupo.appendChild(dayContainer);

    const btn = document.createElement('button');
    btn.className = 'btn-descarga';
    btn.textContent = `Descargar menú ${dia.label.toLowerCase()}`;
    btn.onclick = () => descargarImagen(`day-menu-${key}`, `menu_${key}.png`);
    grupo.appendChild(btn);

    container.appendChild(grupo);
  });

  const divider = document.querySelector('.canvas-divider');
  if (divider) divider.style.display = hayAlgunDia ? '' : 'none';
}

function renderDiarioOnly() {
  const container = $('diario-only-items');
  container.innerHTML = '';
  const activeDiario = diariamenteItems.filter(i => i.activo && i.nombre.trim() !== '');

  const wrapper = $('diario-only-container');
  const divider = $('divider-diario');

  if (activeDiario.length === 0) {
    if (wrapper) wrapper.style.display = 'none';
    if (divider) divider.style.display = 'none';
    return;
  }

  if (wrapper) wrapper.style.display = '';
  if (divider) divider.style.display = '';

  activeDiario.forEach(item => {
    const li = document.createElement('li');
    li.className = 'diario-only-item';
    li.innerHTML = `<span>${item.nombre}</span><span class="price">${item.precio}</span>`;
    container.appendChild(li);
  });
}

function actualizarTodo() {
  actualizarMenuSemanal();
  renderMenusDia();
  renderDiarioOnly();
}

['in-linea1', 'in-linea2', 'in-footer-infantil', 'in-footer-maestros'].forEach(id => {
  const el = $(id);
  if (el) {
    el.addEventListener('input', () => { guardarEstado(); actualizarTodo(); });
    el.addEventListener('change', () => { guardarEstado(); actualizarTodo(); });
  }
});

// ========================================================
// DESCARGA
// ========================================================
function descargarImagen(elementId, fileName) {
  const el = $(elementId);
  if (!el) return;
  html2canvas(el, {
    scale: 2,
    useCORS: true,
    backgroundColor: '#ffffff',
    logging: false
  }).then(canvas => {
    const link = document.createElement('a');
    link.download = fileName;
    link.href = canvas.toDataURL('image/png');
    link.click();
  }).catch(err => {
    console.error(err);
    alert('Error al generar imagen.');
  });
}

// ========================================================
// BOTÓN VER MENÚ COMPLETO (solo hace scroll)
// ========================================================
btnVerPreview.addEventListener('click', () => {
  actualizarTodo();
  pantallaResultado.scrollIntoView({ behavior: 'smooth' });
});

// ========================================================
// INICIALIZACIÓN
// ========================================================
cargarEstado();
renderDias();
renderGuisados();
renderDiariamente();
actualizarTodo();
