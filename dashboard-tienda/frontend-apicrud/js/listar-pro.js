let search = document.querySelector("#input-search");
let tabla_pro = document.querySelector("#tabla-pro");
let body_table = document.querySelector("#tabla-pro tbody");
document.addEventListener("DOMContentLoaded", () => {
    GetProducts(); // traer las datos de la bd
});

async function GetProducts() {
    try {
        let urlTodosProductos = "http://localhost:3000/api/productos";

        let result = await fetch(urlTodosProductos, {
            method: "GET",
            headers: {
                "content-type": "aplication/json",
            }
        });

        if (result.status === 204) {
            console.log("no contect ,no hay contenido en la base de datos");
            return null;
        } else {
            let data = await result.json();
            
            MostrarProdustos(data);
        }
    } catch (error) {
        console.error(error);
    }
}

function MostrarProdustos(pro) {
    console.log("pro obtenido = ", pro);
    for (let index = 0; index < pro.length; index++) {
        body_table.innerHTML += `
            <tr>
                <th>${pro[index].id}</th>
                <th>${pro[index].nombre}</th>
                <th>${pro[index].descripcion}</th>
                <th>${pro[index].precio}</th>
                <th>${pro[index].stock}</th>
                <th>${pro[index].imagen}</th>
                <th>
                <button onclick="Editar(${pro[index].id})">✍🏻</button>
                <<button onclick="Eliminar(${pro[index].id})">✖️</button>
                </th>
            </tr>
        `;
    }
}

function Editar(id) {
    console.log("editaste ", id);
}

function Eliminar(id) {
    console.log("eliminaste ", id);
}