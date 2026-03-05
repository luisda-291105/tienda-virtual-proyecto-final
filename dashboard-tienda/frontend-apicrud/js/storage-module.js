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
};

// export for modules if needed (not using ES modules here)
window.StorageModule = StorageModule;
