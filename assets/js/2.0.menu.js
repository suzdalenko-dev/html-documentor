let menuData = [
  { title: 'Documentos', icon: '📄', roles: [], view: 'listado-general', submenu: [
    { title: 'Nuevo documento', icon: '➕', submenu: null , view: 'crear-nuevo-documento', roles: [] },
    { title: 'Listado general', icon: '📋', submenu: null, view: 'documentos-listado-general', roles: [] },
    { title: 'Avisos de caducidad', icon: '⏰', submenu: null , view: 'documentos-caducados', roles: [] }
  ]},
  { title: 'Etiquetas', icon: '🏷️', roles: [], submenu: [
    { title: 'Nueva etiqueta',  icon: '➕', submenu: null , view: 'crear-nueva-etiqueta', roles: []},
    { title: 'Listado etiquetas', icon: '🏷️', submenu: null , view: 'listado-etiquetas', roles: []}
  ]}
];