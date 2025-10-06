🧭 🔹 SECCIÓN DOCUMENTOS
1. /documentos/

Nombre: 📋 Listado de Documentos
Objetivo: ver todos los documentos con filtros.
Funciones:

Buscar por nombre / descripción.

Filtrar por etiquetas, fechas o usuario.

Descargar documentos.

Ver estado (vigente / caducado / pronto a vencer).
Botones:

+ Nuevo documento

Filtrar

Exportar a Excel / PDF (opcional)

2. /documentos/nuevo/

Nombre: ➕ Nuevo Documento
Objetivo: subir 1 o varios archivos.
Campos:

Nombre

Descripción

Fecha de creación (auto)

Fecha de caducidad

Días de aviso

Etiquetas (multi-select o crear nuevas)

Archivos (multi-upload drag & drop)
Botones:

Guardar

Cancelar

3. /documentos/editar/<id>/

Nombre: ✏️ Editar Documento
Objetivo: modificar información de un documento ya subido.
Permitir:

Cambiar nombre, descripción, etiquetas o fechas.

Sustituir archivo (si aplica).

Guardar historial de cambios (opcional).

4. /documentos/detalle/<id>/

Nombre: 🔍 Detalle del Documento
Objetivo: mostrar toda la información del documento seleccionado.
Contenido:

Nombre / descripción / etiquetas

Fechas

Descargas disponibles

Historial de modificaciones

Estado (vigente / caducado)

5. /documentos/buscar/

Nombre: 🔎 Buscar Documentos
Objetivo: buscador avanzado.
Permitir:

Búsqueda por texto libre.

Filtros por etiquetas / fechas / usuario.

Resultados en forma de tarjetas o tabla.

6. /documentos/avisos/

Nombre: ⏰ Avisos de Caducidad
Objetivo: mostrar documentos próximos a caducar o ya vencidos.
Permitir:

Ver lista de alertas ordenadas por prioridad.

Filtrar por días restantes (ej. < 15 días).

Enviar aviso por email (opcional).

🏷️ 🔹 SECCIÓN ETIQUETAS
7. /etiquetas/

Nombre: 🏷️ Listado de Etiquetas
Objetivo: mostrar todas las etiquetas con número de documentos asociados.
Campos:

Nombre de etiqueta

Color o ícono

Nº de documentos
Botones:

+ Nueva etiqueta

Editar

Eliminar

8. /etiquetas/nueva/

Nombre: ➕ Nueva Etiqueta
Objetivo: crear una nueva etiqueta.
Campos:

Nombre

Color (selector Tailwind o picker)
Botones:

Guardar

⚙️ 🔹 SECCIÓN SISTEMA / USUARIO
9. /configuracion/avisos/

Nombre: ⚙️ Configuración de Avisos
Objetivo: definir la política de avisos.
Opciones:

Días antes de la caducidad para enviar notificación.

Tipo de aviso (correo, alerta visual, etc.).

Activar/desactivar avisos automáticos.

10. /usuarios/

Nombre: 👤 Usuarios y Roles
Objetivo: administrar quién puede subir / ver / editar documentos.
Permitir:

Asignar roles (admin, lector, auditor, etc.).

Asignar etiquetas visibles por rol (opcional).

11. /login/ y /logout/

Nombre: 🔐 Inicio / cierre de sesión
Objetivo: autenticación de usuarios.
Funcionalidad:

Ingreso con usuario y contraseña.

Envío de código (2FA) como ya haces.

Generar y validar token JWT.

📊 🔹 (Opcional pero recomendable)
12. /dashboard/

Nombre: 📈 Panel principal / resumen
Objetivo: resumen general del sistema.
Mostrar:

Total documentos.

Documentos por etiqueta.

Próximos a caducar.

Gráficos (Chart.js).

💾 🔹 ESTRUCTURA DE PLANTILLAS (Django)
/templates/documentor/
│
├── documentos_list.html
├── documentos_new.html
├── documentos_edit.html
├── documentos_detail.html
├── documentos_search.html
├── documentos_avisos.html
│
├── etiquetas_list.html
├── etiquetas_new.html
│
├── configuracion_avisos.html
├── usuarios_list.html
├── dashboard.html
└── login.html

🚀 Resumen final — vistas mínimas necesarias
#	Página	Obligatoria	Descripción breve
1	/documentos/	✅	Listado con filtros
2	/documentos/nuevo/	✅	Subida de documentos
3	/documentos/buscar/	✅	Buscador avanzado
4	/documentos/avisos/	✅	Caducidades próximas
5	/etiquetas/	✅	Listado de etiquetas
6	/etiquetas/nueva/	✅	Crear etiqueta
7	/login/	✅	Acceso seguro
8	/dashboard/	🔹 Opcional pero útil	
9	/configuracion/avisos/	🔹 Opcional	
10	/usuarios/	🔹 Solo si manejas roles múltiples