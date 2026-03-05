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

// --------------------------------------------------------------------------------
// CLIENTES
// --------------------------------------------------------------------------------
function getAllClients() {
    console.log('[crud] getAllClients');
    return StorageModule.fetchClients()
        .then((data) => {
            StorageModule.saveClients(data);
            displayClients(data);
        })
        .catch((error) => {
            console.error('Error al obtener clientes:', error);
            const cached = StorageModule.loadClients();
            if (cached.length) {
                console.warn('Mostrando clientes desde localStorage');
                displayClients(cached);
            }
        });
}

function createClient(clientData) {
    console.log('[crud] createClient', clientData);
    return StorageModule.createClient(clientData)
        .then(() => {
            alert('Cliente creado!');
            StorageModule.clearEditClient();
            window.location.href = 'listado-clientes.html';
        })
        .catch(console.error);
}

function updateClient(id, clientData) {
    console.log('[crud] updateClient', id);
    return StorageModule.updateClient(id, clientData)
        .then(() => {
            alert('Cliente actualizado!');
            StorageModule.clearEditClient();
            window.location.href = 'listado-clientes.html';
        })
        .catch(console.error);
}

function deleteClient(id) {
    console.log('[crud] deleteClient', id);
    StorageModule.deleteClient(id)
        .then(() => {
            alert('Cliente eliminado');
            getAllClients();
        })
        .catch(console.error);
}

function displayClients(clients) {
    console.log('[crud] displayClients', clients.length);
    StorageModule.saveClients(clients);

    const tbody = document.querySelector('#tabla-clientes');
    if (!tbody) return;
    tbody.innerHTML = '';
    clients.forEach(c => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${c.id_cliente || c.id}</td>
            <td>${c.nombre}</td>
            <td>${c.apellido}</td>
            <td>${c.email}</td>
            <td>${c.celular || ''}</td>
            <td>${c.direccion || ''}</td>
            <td>
                <button class="btn btn-sm btn-warning edit-btn" data-id="${c.id_cliente || c.id}">Editar</button>
                <button class="btn btn-sm btn-danger delete-btn" data-id="${c.id_cliente || c.id}">Eliminar</button>
            </td>
        `;
        tbody.appendChild(tr);
    });

    tbody.querySelectorAll('.edit-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const id = btn.getAttribute('data-id');
            const cli = clients.find(x => (x.id_cliente||x.id)==id);
            StorageModule.setEditClient(cli);
            window.location.href = 'crear-cliente.html';
        });
    });

    tbody.querySelectorAll('.delete-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const id = btn.getAttribute('data-id');
            if (confirm('¿Eliminar cliente?')) {
                deleteClient(id);
            }
        });
    });
}

// --------------------------------------------------------------------------------
// USUARIOS
// --------------------------------------------------------------------------------
function getAllUsers() {
    console.log('[crud] getAllUsers');
    return StorageModule.fetchUsers()
        .then((data) => {
            StorageModule.saveUsers && StorageModule.saveUsers(data);
            displayUsers(data);
        })
        .catch(console.error);
}

function createUser(userData) {
    console.log('[crud] createUser', userData);
    return StorageModule.createUser(userData)
        .then(() => {
            alert('Usuario creado!');
            window.location.href = 'listado-usuarios.html';
        })
        .catch(console.error);
}

function updateUser(id, userData) {
    console.log('[crud] updateUser', id);
    return StorageModule.updateUser(id, userData)
        .then(() => {
            alert('Usuario actualizado');
            window.location.href = 'listado-usuarios.html';
        })
        .catch(console.error);
}

function deleteUser(id) {
    console.log('[crud] deleteUser', id);
    StorageModule.deleteUser(id)
        .then(() => {
            alert('Usuario eliminado');
            getAllUsers();
        })
        .catch(console.error);
}

function displayUsers(users) {
    console.log('[crud] displayUsers', users.length);
    StorageModule.saveUsers && StorageModule.saveUsers(users);
    const tbody = document.querySelector('#tabla-usuarios');
    if (!tbody) return;
    tbody.innerHTML = '';
    users.forEach(u => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${u.id}</td>
            <td>${u.usuario}</td>
            <td>${u.rol}</td>
            <td>${u.created_at || u.fecha_creacion || ''}</td>
            <td>
                <button class="btn btn-sm btn-warning edit-btn" data-id="${u.id}">Editar</button>
                <button class="btn btn-sm btn-danger delete-btn" data-id="${u.id}">Eliminar</button>
            </td>
        `;
        tbody.appendChild(tr);
    });
    tbody.querySelectorAll('.edit-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const id = btn.getAttribute('data-id');
            const u = users.find(x => x.id == id);
            StorageModule.setEditUser && StorageModule.setEditUser(u);
            window.location.href = 'crear-usuario.html';
        });
    });
    tbody.querySelectorAll('.delete-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const id = btn.getAttribute('data-id');
            if (confirm('¿Eliminar usuario?')) {
                deleteUser(id);
            }
        });
    });
}

// --------------------------------------------------------------------------------
// PEDIDOS
// --------------------------------------------------------------------------------
function getAllPedidos() {
    console.log('[crud] getAllPedidos');
    return StorageModule.fetchPedidos()
        .then((data) => {
            StorageModule.savePedidos && StorageModule.savePedidos(data);
            displayPedidos(data);
        })
        .catch(console.error);
}

function createPedido(pedidoData) {
    console.log('[crud] createPedido', pedidoData);
    return StorageModule.createPedido(pedidoData)
        .then(() => {
            alert('Pedido creado!');
            StorageModule.clearEditPedido && StorageModule.clearEditPedido();
            window.location.href = 'listado-pedidos.html';
        })
        .catch(console.error);
}

function deletePedido(id) {
    console.log('[crud] deletePedido', id);
    StorageModule.deletePedido(id)
        .then(() => {
            alert('Pedido eliminado');
            getAllPedidos();
        })
        .catch(console.error);
}

function displayPedidos(pedidos) {
    console.log('[crud] displayPedidos', pedidos.length);
    StorageModule.savePedidos && StorageModule.savePedidos(pedidos);
    const tbody = document.querySelector('#tabla-pedidos');
    if (!tbody) return;
    tbody.innerHTML = '';
    pedidos.forEach(p => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${p.id}</td>
            <td>${p.nombre} ${p.apellido || ''}</td>
            <td>${p.email || ''}</td>
            <td>${p.fecha ? new Date(p.fecha).toLocaleDateString() : ''}</td>
            <td class="total-cell">calculando...</td>
            <td>${p.estado || ''}</td>
            <td>
                <button class="btn btn-sm btn-danger delete-btn" data-id="${p.id}">Eliminar</button>
            </td>
        `;
        tbody.appendChild(tr);
        const totalCell = tr.querySelector('.total-cell');
        // obtener detalles para calcular total
        fetch(`${window.API_ROOT || 'http://localhost:3000'}/api/pedidos/${p.id}`)
            .then(r=>r.json())
            .then(full => {
                const sum = (full.detalles || []).reduce((s,d)=>s + d.precio * d.cantidad,0);
                totalCell.textContent = `$${sum.toFixed(2)}`;
            })
            .catch(err=>{
                console.error('no se pudo calcular total', err);
                totalCell.textContent = '-';
            });
    });
    tbody.querySelectorAll('.delete-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const id = btn.getAttribute('data-id');
            if (confirm('¿Eliminar pedido?')) {
                deletePedido(id);
            }
        });
    });
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
            // determinar qué tabla estamos filtrando
            if (document.querySelector('#tabla-productos')) {
                const productos = StorageModule.loadProducts();
                const filtrados = productos.filter(p => p.nombre.toLowerCase().includes(term));
                displayProducts(filtrados);
            } else if (document.querySelector('#tabla-clientes')) {
                const clientes = StorageModule.loadClients();
                const filtrados = clientes.filter(c => (`${c.nombre} ${c.apellido}`.toLowerCase().includes(term) || c.email.toLowerCase().includes(term)));
                displayClients(filtrados);
            } else if (document.querySelector('#tabla-usuarios')) {
                const usuarios = StorageModule.loadUsers ? StorageModule.loadUsers() : [];
                const filtrados = usuarios.filter(u => u.usuario.toLowerCase().includes(term));
                displayUsers(filtrados);
            } else if (document.querySelector('#tabla-pedidos')) {
                const pedidos = StorageModule.loadPedidos();
                const filtrados = pedidos.filter(p => p.id.toString() === term);
                displayPedidos(filtrados);
            }
        });
    }

    // manejo de formularios específicos
    const formClient = document.getElementById('formulario-cliente');
    if (formClient) {
        const cli = StorageModule.getEditClient();
        if (cli) {
            formClient['nombre-cli'].value = cli.nombre || '';
            formClient['apellido-cli'].value = cli.apellido || '';
            formClient['email-cli'].value = cli.email || '';
            formClient['celular-cli'].value = cli.celular || '';
            formClient['direccion-cli'].value = cli.direccion || '';
            formClient['direccion2-cli'].value = cli.direccion2 || '';
            formClient['descripcion-cli'].value = cli.descripcion || '';
            formClient.dataset.id = cli.id_cliente || cli.id;
            formClient.querySelector('button[type="submit"]').textContent = 'Actualizar Cliente';
        }
        formClient.addEventListener('submit', (e) => {
            e.preventDefault();
            const data = {
                nombre: formClient['nombre-cli'].value,
                apellido: formClient['apellido-cli'].value,
                email: formClient['email-cli'].value,
                celular: formClient['celular-cli'].value,
                direccion: formClient['direccion-cli'].value,
                direccion2: formClient['direccion2-cli'].value,
                descripcion: formClient['descripcion-cli'].value,
            };
            const id = formClient.dataset.id;
            if (id) updateClient(id, data);
            else createClient(data);
        });
    }

    const formUser = document.getElementById('formulario-usuario');
    if (formUser) {
        formUser.addEventListener('submit', (e) => {
            e.preventDefault();
            const pass = formUser['contrasena'].value;
            const pass2 = formUser['confirmar_contrasena'].value;
            if (pass !== pass2) {
                alert('Las contraseñas no coinciden');
                return;
            }
            const data = {
                rol: formUser['rol'].value,
                usuario: formUser['usuario'].value,
                contrasena: pass
            };
            createUser(data);
        });
    }

    const formPedido = document.getElementById('formulario-pedido');
    if (formPedido) {
        // llenar clientes dentro del pedido
        StorageModule.fetchClients().then(clis => {
            const sel = formPedido['id_cliente'];
            sel.innerHTML = '<option selected>Seleccionar Cliente</option>';
            clis.forEach(c => {
                const opt = document.createElement('option');
                opt.value = c.id_cliente || c.id;
                opt.textContent = `${c.nombre} ${c.apellido}`;
                sel.appendChild(opt);
            });
        }).catch(console.error);

        const ped = StorageModule.getEditPedido && StorageModule.getEditPedido();
        if (ped) {
            formPedido['id_cliente'].value = ped.id_cliente;
            formPedido['metodo_pago'].value = ped.metodo_pago;
            formPedido['descuento'].value = ped.descuento || 0;
            formPedido['aumento'].value = ped.aumento || 0;
            formPedido.dataset.id = ped.id;
            formPedido.querySelector('button[type="submit"]').textContent = 'Actualizar Pedido';
        }

        // carrito interno del pedido (admin)
        let carrito = JSON.parse(localStorage.getItem('carrito') || '[]');
        const tabla = document.querySelector('#tabla-carrito tbody');
        const totalSpan = document.getElementById('total-pedido');
        function renderCarrito() {
            tabla.innerHTML = '';
            let total = 0;
            carrito.forEach((item, idx) => {
                const tr = document.createElement('tr');
                const subtotal = item.precio * item.cantidad;
                total += subtotal;
                tr.innerHTML = `
                    <td>${item.nombre}</td>
                    <td>${item.precio}</td>
                    <td><input type="number" min="1" value="${item.cantidad}" data-idx="${idx}" class="cantidad-input"/></td>
                    <td>${subtotal}</td>
                    <td><button class="btn btn-sm btn-danger remove-btn" data-idx="${idx}">X</button></td>
                `;
                tabla.appendChild(tr);
            });
            totalSpan.textContent = '$' + total;
            localStorage.setItem('carrito', JSON.stringify(carrito));
        }
        renderCarrito();
        tabla.addEventListener('click', (ev) => {
            if (ev.target.classList.contains('remove-btn')) {
                const idx = ev.target.dataset.idx;
                carrito.splice(idx, 1);
                renderCarrito();
            }
        });
        tabla.addEventListener('change', (ev) => {
            if (ev.target.classList.contains('cantidad-input')) {
                const idx = ev.target.dataset.idx;
                carrito[idx].cantidad = parseInt(ev.target.value, 10) || 1;
                renderCarrito();
            }
        });

        formPedido.addEventListener('submit', (e) => {
            e.preventDefault();
            const pedidoData = {
                id_cliente: formPedido['id_cliente'].value,
                metodo_pago: formPedido['metodo_pago'].value,
                descuento: parseFloat(formPedido['descuento'].value) || 0,
                aumento: parseFloat(formPedido['aumento'].value) || 0,
                productos: carrito.map(i => ({ id_producto: i.id, precio: i.precio, cantidad: i.cantidad }))
            };
            if (formPedido.dataset.id) {
                updatePedido(formPedido.dataset.id, pedidoData);
            } else {
                createPedido(pedidoData);
                localStorage.removeItem('carrito');
            }
        });
    }

    // manejador del formulario de creación/edición (productos también reutilizable)
    const submitBtn = document.querySelector('button[type="button"]');
    if (submitBtn) {
        submitBtn.addEventListener('click', handleFormSubmit);

        // si hay producto para editar, precargamos campos
        const prod = StorageModule.getEditProduct && StorageModule.getEditProduct();
        const nombreInput = document.getElementById('nombre-pro');
        const precioInput = document.getElementById('precio-pro');
        const stockInput = document.getElementById('stock-pro');
        const descTextarea = document.getElementById('descripcion-pro');
        const imgUrlInput = document.getElementById('imagen-url');
        const imgPreview = document.getElementById('imagen-preview');

        if (prod) {
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
        // const imgUrlInput = document.getElementById('imagen-url');
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

