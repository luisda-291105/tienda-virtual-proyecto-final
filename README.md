# tienda-virtual-proyecto-final
Proyecto final de tienda virtual.
Incluye un **backend Node/Express con MySQL** y un **dashboard estático** que consume la API.

## Estructura
- `BACKEND_TIENDA_NODE_MYSQL/`: servidor REST con rutas para productos, clientes, pedidos, usuarios.
- `dashboard-tienda/frontend-apicrud/`: interfaz administrativa HTML/JavaScript.

## Uso rápido
1. Configurar `.env` con credenciales de MySQL y ejecutar `npm install` dentro de `BACKEND_TIENDA_NODE_MYSQL`.
2. Iniciar el servidor:
   ```powershell
   cd BACKEND_TIENDA_NODE_MYSQL
   node server.js
   ```
   Se levantará en http://localhost:3000 y se inicializará la base de datos.
3. Abrir las páginas del dashboard en el navegador (por ejemplo `dashboard-tienda/frontend-apicrud/listado-pro.html`).
   Las páginas usan `fetch` para comunicarse con la API; si las abres con `file://` el script tomará automáticamente `http://localhost:3000` como origen.

## Funcionalidad del dashboard
- Crud completo para **productos** (creación, listado, edición, eliminación).
- Los datos se guardan en `localStorage` y se sincronizan con la base de datos mediante la API.
- Cualquier cambio en el listado refresca automáticamente la vista.

> El backend ya está preparado para demás recursos (clientes, pedidos, usuarios); puedes replicar la lógica del dashboard para ellos.

