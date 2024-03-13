const textContrasena = document.getElementById("text-contrasena")
const input = document.getElementById("range")
const cbUppercase = document.getElementById("uppercase")
const cbLowercase = document.getElementById("lowercase")
const cbNumbers = document.getElementById("number")
const cbSymbols = document.getElementById("symbol")
const btnGenerate = document.getElementById("btn-generate")
const btnguardar = document.getElementById("btn-guardar")
const name_c=document.getElementById("name")
const btn_delete_tabla=document.getElementById("btn-delete-table")

lista=JSON.parse(localStorage.getItem("listado"))|| [] 

loadtable()

btnGenerate.addEventListener("click",validarCampos)
btnguardar.addEventListener("click",guardar)
btn_delete_tabla.addEventListener("click",delete_table)

function validarCampos() {
    let str = ''
    const uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
    const lowercase = 'abcdefghijklmnopqrstuvwxyz'
    const numbers = '0123456789'
    const symbols = '!@#$'





    if(
        cbUppercase.checked === false &&
        cbLowercase.checked === false &&
        cbNumbers.checked === false &&
        cbSymbols.checked === false
    ) {
        Swal.fire({
            icon: "error",
            title: "olvidaste los parametros",
            text: "debes selccionar parametros"
          });
        return
    } 

    if(cbUppercase.checked === true) {
        str += uppercase
    }

    if(cbLowercase.checked === true) {
        str += lowercase
    }

    if(cbNumbers.checked === true) {
        str += numbers
    }
    
    if(cbSymbols.checked === true) {
        str += symbols
    }

    generarContrasena(str)
    

}

function generarContrasena(str) {
    let pass = ''
    for (let i = 1; i <= input.value; i++) {
        const char = Math.floor(Math.random() * str.length + 1)
        pass += str.charAt(char)
    }

    textContrasena.value = pass
}


function loadtable() {
  
  
  lista.forEach(item => {
   tabla=document.getElementById("historial")
   tabla.innerHTML+=
   `
  <tr>
  <td>${item.nombre}</td>
  <td>${item.contraseña}</td>
  <td><button type="button" class="btn btn-danger" onclick="deleteOne(${item.contraseña})"> x </button> </td>
  </tr>
   `
  })

 }


 function deleteOne(contraseña){
  const index=lista.findIndex((e)=>{
return e.contraseña==contraseña
})

console.log(lista.splice(index,1))


}





function delete_table() {
    Swal.fire({
      title: "¿estas seguro?",
      text: "eliminaras los datos de tu tabla",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "si,eliminar!"
    }).then((result) => {
      if (result.isConfirmed) {
      

        localStorage.clear("listado")
        tabla.innerHTML=" ";
        Swal.fire({
          title: "datos eliminados!",
          text: "deberas actualizar la pagina",
          icon: "success"
        });
      }
    });
  
  

    
   

  }


function guardar() {
    
  if (name_c.value===null || name_c.value== "") {

    Swal.fire({
        icon: "error",
        title: "olvidaste el nombre",
        text: "debes selccionar un nombre para tu contraseña"
      });

    return
}

if (textContrasena.value===null || textContrasena.value==" ") 
{
  Swal.fire({
    icon: "error",
    title: "olvidaste generar contraseña",
    text: "debes generar tu contraseña"
  });

return
}


    let obj={
       nombre:name_c.value,
        contraseña:textContrasena.value ,
        }

lista.push(obj)

localStorage.setItem("listado" ,JSON.stringify(lista))
JSON.parse(localStorage.getItem(lista))

name_c.value=" ";
textContrasena.value="";





lista.forEach(item => {
 tabla=document.getElementById("historial")
 tabla.innerHTML+=
 `
<tr>
<td>${item.nombre}</td>
<td>${item.contraseña}</td>
<td><button type="button" class="btn btn-danger" onclick="deleteOne(${item.contraseña})"> x </button> </td>
</tr>
 `
})


Swal.fire({
    title: "contraseña guardada!",
    text: "operacion realizada con exito!",
    icon: "success"
  });
}


