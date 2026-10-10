# Generador de Menú Escolar con IA

Una aplicación web que convierte una descripción hablada o escrita del menú de una cooperativa escolar en un **menú semanal listo para imprimir o descargar como imagen**.

Funciona **100% en el navegador**. No necesita servidor, no guarda nada en la nube, y cada usuario usa su propia API Key de Groq.

---

## ¿Qué hace?

- Escribes (o dictas con el micrófono de tu teclado) el menú de la semana.
- La IA lo organiza automáticamente por día: **lunes, martes, miércoles, jueves y viernes**.
- Detecta también los **guisados del día**.
- Reconoce **aguas, refrescos y bebidas** como parte del menú de cada día.
- Permite editar manualmente la sección **"Diariamente"** (gelatinas, flanes, palomitas, etc.).
- Genera imágenes descargables:
  - Menú semanal completo
  - Menú individual por día
  - Sección "Diariamente" sola
- Guarda tu configuración (escuela, precios, productos diarios) en tu navegador.
- La API Key de Groq también se guarda localmente y nunca se comparte.

---

## Cómo usarla

### 1. Abre la aplicación

Entra a la URL de GitHub Pages de este repositorio:

```
https://ateresatorres.github.io/creador-de-menu-escolar/
```

### 2. Configura tu API Key de Groq

La app usa **Groq** para interpretar el texto del menú con IA. Necesitas una API Key **gratuita**.

1. Toca el botón **🔑** en la esquina superior derecha.
2. Si no tienes una key, toca **"Obtener una"** y crea una cuenta en [console.groq.com/keys](https://console.groq.com/keys).
3. Copia tu key (empieza con `gsk_...`).
4. Pégala en el campo y toca **Guardar**.

> El punto junto al 🔑 se pondrá **verde** cuando la key esté guardada.
> La key solo vive en tu navegador. No se envía a ningún servidor nuestro.

### 3. Escribe o dicta el menú

En la tarjeta **"Generar días con IA"**:

- **Opción A — Escribir**: toca el cuadro de texto y escribe el menú.
- **Opción B — Dictar**: toca el cuadro de texto y usa el **micrófono de tu teclado**.

Ejemplos de lo que puedes escribir o dictar:

> "El lunes tacos a 3 x 25 y aguas de jamaica a 15. El martes enchiladas a 30 con agua de horchata a 15. De guisado el lunes picadillo y el martes chicharrón."

> "Lunes tortas a 20, aguas de limón a 15. Martes flautas a 25, agua de tamarindo a 15. Miércoles tostadas a 20. Guisados: lunes picadillo, martes chicharrón, miércoles tinga."

### 4. Toca "Aplicar a los días"

La IA organizará todo automáticamente:

- Cada platillo y bebida irá al día correcto.
- Los guisados se colocarán en su sección.
- Los precios se normalizan (ej. "3 por 25" → `3 X $25`).

### 5. Revisa y ajusta

Después de aplicar la IA, puedes **editar cualquier cosa a mano**:

- **Comidas por día**: agrega, edita o elimina platillos con el botón ✕.
- Cada platillo tiene una **casilla** para activarlo/desactivarlo sin borrarlo.
- **Guisados del día**: un guisado por día.
- **Diariamente**: productos que se venden todos los días (gelatinas, flanes, etc.).
- **Textos finales**: personaliza las líneas de "Porción infantil" y "Porción maestros".

### 6. Toca "Ver menú completo"

Se desplaza a la vista previa con 3 secciones descargables:

1. **Menú semanal completo** — una sola imagen con los 5 días + diariamente + guisados.
2. **Menús por día** — una imagen por cada día que tenga platillos.
3. **Diariamente** — solo la lista de productos diarios.

Cada botón **"Descargar"** genera un archivo PNG listo para compartir o imprimir.

---

## Reglas que sigue la IA

Para que entiendas cómo interpreta lo que escribes:

| Lo que dices | Cómo lo interpreta |
|---|---|
| "tacos a 25" | `TACOS — $25` |
| "3 x 25" o "3 por 25" | `3 X $25` |
| "agua de jamaica a 15" | `AGUA DE JAMAICA — $15` (dentro del día) |
| "refresco 20" | `REFRESCO — $20` (dentro del día) |
| "de guisado el lunes picadillo" | Guisado del lunes: `PICADILLO` |
| Día no mencionado | Se deja vacío y no aparece en la vista previa |

**Reglas importantes:**

- La IA **nunca inventa** platillos, bebidas ni precios que no hayas mencionado.
- Las aguas y refrescos **siempre van dentro del día** correspondiente, no en "Diariamente".
- Todos los nombres se escriben en MAYÚSCULAS automáticamente.
- Ignora muletillas ("eh", "este", "a ver").

---

## Consejos para dictar con el teclado

Como usas el micrófono nativo del teclado, la calidad depende del sistema. Para mejores resultados:

- Habla **despacio y claro**, frase por frase.
- Si tu teclado no muestra el micrófono, actívalo en los ajustes (Gboard: *Ajustes → Voz → Dictado por voz*).
- Evita lugares con mucho ruido de fondo.
- Menciona el día **antes** de los platillos: *"El lunes… tacos a 25, aguas a 15"*.
- Si algo sale mal, puedes editarlo a mano antes de tocar "Aplicar a los días".

---

## Privacidad

- **No hay servidor.** Todo se ejecuta en tu navegador.
- **No se sube nada a la nube.** Los datos que editas se guardan en el `localStorage` de tu propio navegador.
- **Tu API Key es tuya.** Se guarda localmente y solo se usa para hablar directo con Groq.
- Puedes borrar todo en cualquier momento desde el botón **"Borrar"** del panel de API Key, o limpiando los datos del sitio en tu navegador.

---

## Problemas comunes

**La app dice "API Key inválida".**
→ Tu key puede estar mal copiada o haber expirado. Ve al botón 🔑 y vuelve a configurarla. Verifica que empiece con `gsk_`.

**No pasa nada cuando toco "Aplicar a los días".**
→ Revisa que hayas escrito al menos una frase completa. Si el mensaje de estado dice "Primero configura tu API Key", ábrela con el botón 🔑.

**La IA no detectó un platillo.**
→ Escríbelo de nuevo, con el día bien claro al inicio: *"El miércoles…"*. También puedes agregarlo a mano con el botón "+ Agregar platillo".

**Las imágenes se ven borrosas.**
→ Toca de nuevo "Descargar". El sistema genera el PNG a 2x de resolución; en pantallas muy grandes puede tardar un segundo.

**Se borraron mis productos diarios.**
→ Se guardan automáticamente en tu navegador. Si borraste datos del sitio, se pierden. Vuelve a agregarlos y se guardarán de nuevo.

---

## Para desarrolladores

Si quieres correr el proyecto localmente o modificarlo:

```bash
git clone https://github.com/aTeresaTorres/creador-de-menu-escolar.git
cd creador-de-menu-escolar
# Abre index.html en tu navegador o usa un servidor local:
python3 -m http.server 8000
```

**Estructura del proyecto:**

```
.
├── index.html   # Estructura de la app
├── style.css    # Estilos y diseño
├── app.js       # Lógica, IA, render y descargas
└── README.md
```

**Dependencias externas (vía CDN):**

- [html2canvas](https://html2canvas.hertzen.com/) — para generar las imágenes descargables.
- [Roboto](https://fonts.google.com/specimen/Roboto) — tipografía.
- [Groq API](https://console.groq.com/) — modelo de IA para interpretar el menú.

---

## 📄 Licencia

Uso libre para fines educativos y escolares. Siéntete libre de adaptarlo a tu cooperativa.

---

Hecho con ❤️ para las cooperativas escolares.
