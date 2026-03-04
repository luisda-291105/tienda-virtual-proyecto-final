// 1. Obtener todos los productos
function getAllProducts() {
    fetch("/api/products")
        .then((response) => response.json())
        .then((data) => {
            // Mostrar productos en el dashboard
            displayProducts(data);
        })
        .catch((error) => {
            console.error("Error al obtener productos:", error);
        });
}

// 2. Obtener un producto por ID
function getProductById(id) {
    fetch(`/api/products/${id}`)
        .then((response) => response.json())
        .then((data) => {
            // Mostrar detalles del producto en el dashboard
            displayProductDetails(data);
        })
        .catch((error) => {
            console.error("Error al obtener producto por ID:", error);
        });
}

// 3. Crear un nuevo producto
function createProduct(productData) {
    fetch("/api/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(productData),
    })
        .then((response) => response.json())
        .then((data) => {
            // Mostrar mensaje de éxito
            alert("Producto creado correctamente!");
            // Refrescar la lista de productos
            getAllProducts();
        })
        .catch((error) => {
            console.error("Error al crear producto:", error);
        });
}

// 4. Actualizar un producto existente
function updateProduct(id, productData) {
    fetch(`/api/products/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(productData),
    })
        .then((response) => response.json())
        .then((data) => {
            // Mostrar mensaje de éxito
            alert("Producto actualizado correctamente!");
            // Refrescar la lista de productos
            getAllProducts();
        })
        .catch((error) => {
            console.error("Error al actualizar producto:", error);
        });
}

// 5. Eliminar un producto
function deleteProduct(id) {
    fetch(`/api/products/${id}`, {
        method: "DELETE",
    })
        .then((response) => response.json())
        .then((data) => {
            // Mostrar mensaje de éxito
            alert("Producto eliminado correctamente!");
            // Refrescar la lista de productos
            getAllProducts();
        })
        .catch((error) => {
            console.error("Error al eliminar producto:", error);
        });
}
