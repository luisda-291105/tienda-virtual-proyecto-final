// Módulo encargado de manejar localStorage y comunicaciones con la API
// Además imprime trazas en consola para seguir el flujo de datos.

// Definimos la URL raíz una sola vez y la exponemos globalmente.
const API_ROOT = "http://localhost:3000";
window.API_ROOT = API_ROOT;

const StorageModule = {
    log(...args) {
        console.log("[StorageModule]", ...args);
    },

    // ********** localStorage **********
    saveProducts(products) {
        this.log("guardando", products.length, "productos en localStorage");
        localStorage.setItem("productos", JSON.stringify(products));
    },

    loadProducts() {
        const data = JSON.parse(localStorage.getItem("productos") || "[]");
        this.log("cargando", data.length, "productos desde localStorage");
        return data;
    },

    setEditProduct(prod) {
        this.log("marcando producto para edición", prod);
        localStorage.setItem("productoEdit", JSON.stringify(prod));
    },

    getEditProduct() {
        const json = localStorage.getItem("productoEdit");
        const obj = json ? JSON.parse(json) : null;
        this.log("producto en edición leído", obj);
        return obj;
    },

    clearEditProduct() {
        this.log("limpiando producto en edición");
        localStorage.removeItem("productoEdit");
    },

    // ********** comunicación con backend **********
    fetchProducts() {
        this.log("fetch -> GET /api/productos");
        return fetch(`${API_ROOT}/api/productos`).then((res) => {
            if (!res.ok) throw new Error("HTTP " + res.status);
            return res.json();
        });
    },

    createProduct(product) {
        this.log("fetch -> POST /api/productos", product);
        return fetch(`${API_ROOT}/api/productos`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(product),
        }).then((res) => {
            if (!res.ok) throw new Error("HTTP " + res.status);
            return res.json();
        });
    },

    updateProduct(id, product) {
        this.log(`fetch -> PUT /api/productos/${id}`, product);
        return fetch(`${API_ROOT}/api/productos/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(product),
        }).then((res) => {
            if (!res.ok) throw new Error("HTTP " + res.status);
            return res.json();
        });
    },

    deleteProduct(id) {
        this.log(`fetch -> DELETE /api/productos/${id}`);
        return fetch(`${API_ROOT}/api/productos/${id}`, {
            method: "DELETE",
        }).then((res) => {
            if (!res.ok) throw new Error("HTTP " + res.status);
            return res.json();
        });
    },

    // Usuario/roles
    // helpers localStorage
    saveUsers(users) {
        this.log("guardando", users.length, "usuarios en localStorage");
        localStorage.setItem("usuarios", JSON.stringify(users));
    },

    loadUsers() {
        const data = JSON.parse(localStorage.getItem("usuarios") || "[]");
        this.log("cargando", data.length, "usuarios desde localStorage");
        return data;
    },

    setEditUser(user) {
        this.log("marcando usuario para edición", user);
        localStorage.setItem("usuarioEdit", JSON.stringify(user));
    },

    getEditUser() {
        const json = localStorage.getItem("usuarioEdit");
        const obj = json ? JSON.parse(json) : null;
        this.log("usuario en edición leído", obj);
        return obj;
    },

    clearEditUser() {
        this.log("limpiando usuario en edición");
        localStorage.removeItem("usuarioEdit");
    },

    fetchUsers() {
        this.log("fetch -> GET /api/usuarios");
        return fetch(`${API_ROOT}/api/usuarios`).then((res) => {
            if (!res.ok) throw new Error("HTTP " + res.status);
            return res.json();
        });
    },

    createUser(user) {
        this.log("fetch -> POST /api/usuarios", user);
        return fetch(`${API_ROOT}/api/usuarios`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(user),
        }).then((res) => {
            if (!res.ok) throw new Error("HTTP " + res.status);
            return res.json();
        });
    },

    updateUser(id, user) {
        this.log(`fetch -> PUT /api/usuarios/${id}`, user);
        return fetch(`${API_ROOT}/api/usuarios/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(user),
        }).then((res) => {
            if (!res.ok) throw new Error("HTTP " + res.status);
            return res.json();
        });
    },

    deleteUser(id) {
        this.log(`fetch -> DELETE /api/usuarios/${id}`);
        return fetch(`${API_ROOT}/api/usuarios/${id}`, {
            method: "DELETE",
        }).then((res) => {
            if (!res.ok) throw new Error("HTTP " + res.status);
            return res.json();
        });
    },

    // Clientes
    saveClients(clients) {
        this.log("guardando", clients.length, "clientes en localStorage");
        localStorage.setItem("clientes", JSON.stringify(clients));
    },

    loadClients() {
        const data = JSON.parse(localStorage.getItem("clientes") || "[]");
        this.log("cargando", data.length, "clientes desde localStorage");
        return data;
    },

    setEditClient(cli) {
        this.log("marcando cliente para edición", cli);
        localStorage.setItem("clienteEdit", JSON.stringify(cli));
    },

    getEditClient() {
        const json = localStorage.getItem("clienteEdit");
        const obj = json ? JSON.parse(json) : null;
        this.log("cliente en edición leído", obj);
        return obj;
    },

    clearEditClient() {
        this.log("limpiando cliente en edición");
        localStorage.removeItem("clienteEdit");
    },

    fetchClients() {
        this.log("fetch -> GET /api/clientes");
        return fetch(`${API_ROOT}/api/clientes`).then((res) => {
            if (!res.ok) throw new Error("HTTP " + res.status);
            return res.json();
        });
    },

    createClient(client) {
        this.log("fetch -> POST /api/clientes", client);
        return fetch(`${API_ROOT}/api/clientes`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(client),
        }).then((res) => {
            if (!res.ok) throw new Error("HTTP " + res.status);
            return res.json();
        });
    },

    updateClient(id, client) {
        this.log(`fetch -> PUT /api/clientes/${id}`, client);
        return fetch(`${API_ROOT}/api/clientes/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(client),
        }).then((res) => {
            if (!res.ok) throw new Error("HTTP " + res.status);
            return res.json();
        });
    },

    deleteClient(id) {
        this.log(`fetch -> DELETE /api/clientes/${id}`);
        return fetch(`${API_ROOT}/api/clientes/${id}`, {
            method: "DELETE",
        }).then((res) => {
            if (!res.ok) throw new Error("HTTP " + res.status);
            return res.json();
        });
    },

    // Pedidos (orders)
    savePedidos(pedidos) {
        this.log("guardando", pedidos.length, "pedidos en localStorage");
        localStorage.setItem("pedidos", JSON.stringify(pedidos));
    },

    loadPedidos() {
        const data = JSON.parse(localStorage.getItem("pedidos") || "[]");
        this.log("cargando", data.length, "pedidos desde localStorage");
        return data;
    },

    setEditPedido(ped) {
        this.log("marcando pedido para edición", ped);
        localStorage.setItem("pedidoEdit", JSON.stringify(ped));
    },

    getEditPedido() {
        const json = localStorage.getItem("pedidoEdit");
        const obj = json ? JSON.parse(json) : null;
        this.log("pedido en edición leído", obj);
        return obj;
    },

    clearEditPedido() {
        this.log("limpiando pedido en edición");
        localStorage.removeItem("pedidoEdit");
    },

    fetchPedidos() {
        this.log("fetch -> GET /api/pedidos");
        return fetch(`${API_ROOT}/api/pedidos`).then((res) => {
            if (!res.ok) throw new Error("HTTP " + res.status);
            return res.json();
        });
    },

    createPedido(pedido) {
        this.log("fetch -> POST /api/pedidos", pedido);
        return fetch(`${API_ROOT}/api/pedidos`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(pedido),
        }).then((res) => {
            if (!res.ok) throw new Error("HTTP " + res.status);
            return res.json();
        });
    },

    updatePedido(id, pedido) {
        this.log(`fetch -> PUT /api/pedidos/${id}`, pedido);
        return fetch(`${API_ROOT}/api/pedidos/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(pedido),
        }).then((res) => {
            if (!res.ok) throw new Error("HTTP " + res.status);
            return res.json();
        });
    },

    deletePedido(id) {
        this.log(`fetch -> DELETE /api/pedidos/${id}`);
        return fetch(`${API_ROOT}/api/pedidos/${id}`, {
            method: "DELETE",
        }).then((res) => {
            if (!res.ok) throw new Error("HTTP " + res.status);
            return res.json();
        });
    },
};

// export for modules if needed (not using ES modules here)
window.StorageModule = StorageModule;
