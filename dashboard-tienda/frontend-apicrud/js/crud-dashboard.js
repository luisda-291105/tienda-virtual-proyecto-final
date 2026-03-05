/* // URL raíz de la API. Tomada del módulo de almacenamiento si está presente. */
// const API_ROOT = window.API_ROOT || 'http://localhost:3000';

// Dependencia al módulo de almacenamiento/networking
// Debe cargarse antes de este script en la página
if (!window.StorageModule) {
    console.warn('StorageModule no definido: asegúrate de incluir storage-module.js antes de crud-dashboard.js');
}

// 1. Obtener todos los productos (y guardarlos en localStorage)
function getAllProducts() {
    console.log('[crud] getAllProducts');
    return StorageModule.fetchProducts()
        .then((data) => {
            StorageModule.saveProducts(data);
            displayProducts(data);
        })
        .catch((error) => {
            console.error('Error al obtener productos:', error);
            const cached = StorageModule.loadProducts();
            if (cached.length) {
                console.warn('Mostrando datos desde localStorage');
                displayProducts(cached);
            }
        });
}

// 2. Obtener un producto por ID (utilizado solo internamente)
function getProductById(id) {
    console.log('[crud] getProductById', id);
    return StorageModule.fetchProducts() // not used in current workflow
        .then((products) => products.find(p => p.id == id))
        .then(product => displayProductDetails(product))
        .catch((error) => {
            console.error('Error al obtener producto por ID:', error);
        });
}

// 3. Crear un nuevo producto
function createProduct(productData) {
    console.log('[crud] createProduct', productData);
    return StorageModule.createProduct(productData)
        .then((data) => {
            alert('Producto creado correctamente!');
            StorageModule.clearEditProduct();
            window.location.href = 'listado-pro.html';
        })
        .catch((error) => {
            console.error('Error al crear producto:', error);
        });
}

// 4. Actualizar un producto existente
function updateProduct(id, productData) {
    console.log('[crud] updateProduct', id, productData);
    return StorageModule.updateProduct(id, productData)
        .then((data) => {
            alert('Producto actualizado correctamente!');
            StorageModule.clearEditProduct();
            window.location.href = 'listado-pro.html';
        })
        .catch((error) => {
            console.error('Error al actualizar producto:', error);
        });
}

// 5. Eliminar un producto
function deleteProduct(id) {
    console.log('[crud] deleteProduct', id);
    StorageModule.deleteProduct(id)
        .then((data) => {
            alert('Producto eliminado correctamente!');
            getAllProducts();
        })
        .catch((error) => {
            console.error('Error al eliminar producto:', error);
        });
}

// -----------------------------------------------------------------------------
// helpers para renderizado y almacenamiento local
// -----------------------------------------------------------------------------

function displayProducts(products) {
    console.log('[crud] displayProducts', products.length);
    StorageModule.saveProducts(products);

    const tbody = document.querySelector('#tabla-productos');
    if (!tbody) return; // no estamos en página de listado

    tbody.innerHTML = '';
    products.forEach((p) => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${p.id}</td>
            <td>${p.nombre}</td>
            <td>${p.descripcion || ''}</td>
            <td>${p.precio}</td>
            <td>${p.stock}</td>
            <td>${p.imagen ? `<img src="${p.imagen}" width="50"/>` : ''}</td>
            <td>
                <button class="btn btn-sm btn-warning edit-btn" data-id="${p.id}">Editar</button>
                <button class="btn btn-sm btn-danger delete-btn" data-id="${p.id}">Eliminar</button>
            </td>
        `;
        tbody.appendChild(tr);
    });

    // attach handlers después de crear filas
    tbody.querySelectorAll('.edit-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const id = btn.getAttribute('data-id');
            const prod = products.find(x => x.id == id);
            StorageModule.setEditProduct(prod);
            window.location.href = 'crear-pro.html';
        });
    });

    tbody.querySelectorAll('.delete-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const id = btn.getAttribute('data-id');
            if (confirm('¿Eliminar producto?')) {
                deleteProduct(id);
            }
        });
    });
}

function displayProductDetails(product) {
    // placeholder, podrías usarlo para un modal o vista simple
    console.log('Detalles del producto', product);
}

// inicialización básica según página
window.addEventListener('DOMContentLoaded', () => {
    console.log('[crud] DOMContentLoaded');

    // si la tabla existe, cargamos lista
    if (document.querySelector('#tabla-productos')) {
        getAllProducts();
    }

    // buscador de productos (filtrar en memoria)
    const search = document.querySelector('input[type="search"]');
    if (search) {
        search.addEventListener('input', (e) => {
            const term = e.target.value.trim().toLowerCase();
            const productos = StorageModule.loadProducts();
            const filtrados = productos.filter(p => p.nombre.toLowerCase().includes(term));
            displayProducts(filtrados);
        });
    }

    // manejador del formulario de creación/edición
    const submitBtn = document.querySelector('button[type="button"]');
    if (submitBtn) {
        submitBtn.addEventListener('click', handleFormSubmit);


        // si hay producto para editar, precargamos
        const prod = StorageModule.getEditProduct();
        if (prod) {
            const nombreInput = document.getElementById('nombre-pro');
            const precioInput = document.getElementById('precio-pro');
            const stockInput = document.getElementById('stock-pro');
            const descTextarea = document.getElementById('descripcion-pro');
            const imgUrlInput = document.getElementById('imagen-url');
            const imgPreview = document.getElementById('imagen-preview');

            if (nombreInput) nombreInput.value = prod.nombre;
            if (precioInput) precioInput.value = prod.precio;
            if (stockInput) stockInput.value = prod.stock;
            if (descTextarea) descTextarea.value = prod.descripcion;
            if (imgUrlInput) imgUrlInput.value = prod.imagen || '';
            if (imgPreview && prod.imagen) imgPreview.src = prod.imagen;

            submitBtn.textContent = 'Actualizar Producto';
            submitBtn.setAttribute('data-id', prod.id);
        } else {
            // si no estamos editando, asegurar texto correcto
            submitBtn.textContent = 'Crear Producto';
            submitBtn.removeAttribute('data-id');
        }

        // actualizar vista previa de imagen si el usuario cambia la URL
        const imgUrlInput = document.getElementById('imagen-url');
        if (imgUrlInput) {
            imgUrlInput.addEventListener('input', (e) => {
                const preview = document.getElementById('imagen-preview');
                if (preview) preview.src = e.target.value;
            });
        }
    }
});

function handleFormSubmit(e) {
    e.preventDefault();
    const btn = e.target;
    const id = btn.getAttribute('data-id');

    console.log('[crud] handleFormSubmit, id=', id);
    const nombre = document.getElementById('nombre-pro')?.value;
    const precio = parseFloat(document.getElementById('precio-pro')?.value || 0);
    const stock = parseInt(document.getElementById('stock-pro')?.value || 0, 10);
    const descripcion = document.getElementById('descripcion-pro')?.value;
    const imagen = document.getElementById('imagen-url')?.value;

    const prodData = { nombre, descripcion, precio, stock, imagen };

    if (id) {
        // comparar con valores originales
        const original = StorageModule.getEditProduct();
        if (original) {
            const unchanged = original.nombre === nombre &&
                              original.descripcion === descripcion &&
                              original.precio == precio &&
                              original.stock == stock &&
                              original.imagen === imagen;
            if (unchanged) {
                alert('No se realizaron cambios en el producto');
                return;
            }
        }
        updateProduct(id, prodData);
    } else {
        createProduct(prodData);
    }
}

