const textContrasena = document.getElementById("text-contrasena");
const input = document.getElementById("range");
const cbUppercase = document.getElementById("uppercase");
const cbLowercase = document.getElementById("lowercase");
const cbNumbers = document.getElementById("number");
const cbSymbols = document.getElementById("symbol");
const btnGenerate = document.getElementById("btn-generate");
const btnGuardar = document.getElementById("btn-guardar");
const name_c = document.getElementById("name");
const btnDeleteTabla = document.getElementById("btn-delete-table");
const historial = document.getElementById("historial");
let lista = JSON.parse(localStorage.getItem("listado")) || [];

loadTable();

btnGenerate.addEventListener("click", validarCampos);
btnGuardar.addEventListener("click", guardar);
btnDeleteTabla.addEventListener("click", deleteTable);

function validarCampos() {
    let str = '';
    const uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const lowercase = 'abcdefghijklmnopqrstuvwxyz';
    const numbers = '0123456789';
    const symbols = '!@#$';

    if (!cbUppercase.checked && !cbLowercase.checked && !cbNumbers.checked && !cbSymbols.checked) {
        Swal.fire({
            icon: "error",
            title: "Olvidaste los parámetros",
            text: "Debes seleccionar al menos un parámetro"
        });
        return;
    } 

    if (cbUppercase.checked) {
        str += uppercase;
    }

    if (cbLowercase.checked) {
        str += lowercase;
    }

    if (cbNumbers.checked) {
        str += numbers;
    }
    
    if (cbSymbols.checked) {
        str += symbols;
    }

    generarContrasena(str);
}

function generarContrasena(str) {
    let pass = '';
    for (let i = 0; i < input.value; i++) {
        const char = Math.floor(Math.random() * str.length);
        pass += str.charAt(char);
    }

    textContrasena.value = pass;
}

function loadTable() {
    historial.innerHTML = '';
    lista.forEach(item => {
        historial.innerHTML += `
            <tr>
                <td>${item.nombre}</td>
                <td>${item.contraseña}</td>
                <td><button type="button" class="btn btn-danger" onclick="deleteOne('${item.contraseña}')"> x </button></td>
            </tr>`;
    });
}

function deleteOne(contraseña){
    const index = lista.findIndex(e => e.contraseña === contraseña);
    if (index !== -1) {
        lista.splice(index, 1);
        localStorage.setItem("listado", JSON.stringify(lista));
        loadTable();
    }
}

function deleteTable() {
    Swal.fire({
        title: "¿Estás seguro?",
        text: "Eliminarás los datos de tu tabla",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Sí, eliminar"
    }).then((result) => {
        if (result.isConfirmed) {
            localStorage.removeItem("listado");
            lista = [];
            loadTable();
            Swal.fire({
                title: "Datos eliminados",
                text: "Debes actualizar la página",
                icon: "success"
            });
        }
    });
}

function guardar() {
    if (name_c.value.trim() === "") {
        Swal.fire({
            icon: "error",
            title: "Olvidaste el nombre",
            text: "Debes ingresar un nombre para tu contraseña"
        });
        return;
    }

    if (textContrasena.value.trim() === "") {
        Swal.fire({
            icon: "error",
            title: "Olvidaste generar la contraseña",
            text: "Debes generar tu contraseña"
        });
        return;
    }

    const obj = {
        nombre: name_c.value,
        contraseña: textContrasena.value
    };

    lista.push(obj);
    localStorage.setItem("listado", JSON.stringify(lista));
    loadTable();
    name_c.value = "";
    textContrasena.value = "";
    Swal.fire({
        title: "Contraseña guardada",
        text: "Operación realizada con éxito",
        icon: "success"
    });
}