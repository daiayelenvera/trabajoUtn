
//RESUMEN DE COMPRA
function generarPDF() {
    // Obtener los valores del formulario
    var nombre = document.getElementById('nombre').value;
    var apellido = document.getElementById('apellido').value;
    var email = document.getElementById('email').value;
    var torta = document.getElementById('torta').value;
    var cantidad = document.getElementById('cantidad').value;

    // Crear un nuevo documento PDF
    var doc = new jsPDF();

    // Agregar contenido al PDF
    doc.text(20, 20, 'RESUMEN');
    doc.text(20, 30, '-----------------------');
    doc.text(20, 40, 'Nombre: ' + nombre);
    doc.text(20, 50, 'Apellido: ' + apellido);
    doc.text(20, 60, 'Email: ' + email);
    doc.text(20, 70, 'Usted compró '+ cantidad +" torta/s de " + torta);
    doc.text(20, 80, '***Muchas gracias por su compra!! :) *** ');
 

    // Guardar el PDF como un archivo
    doc.save('formulario.pdf');
}
//---------------------------------------------------------------------
// POP ALERT
function enviarFormulario() {
    var nombre = document.getElementById("name").value;
    var email = document.getElementById("email").value;
    var mensaje = document.getElementById("message").value;
  
    alert(nombre + ". Tu mensaje ha sido enviado con éxito! Muchas Gracias " );
  }
//--------------------------------------------------------------------------  

let addCartButtons = document.querySelectorAll(".add-cart-button")

let listaDeTortas = []

function agregarAlCarrito(eventoClick) {
    //Seleccionar la torta que eligio
    let item = eventoClick.target.parentElement
    let tortaNombre = item.querySelector('h3')
    let tortaPrecio = item.querySelector('h4').textContent.replace('$', '')
    let torta = {nombre: tortaNombre, precio: tortaPrecio}

    //Agregar la torta a la lista y guardarla en localStorage
    listaDeTortas.push(torta)
    localStorage.setItem('resumen', listaDeTortas)

    console.log(listaDeTortas)
}

function resumenCarrito() {
    let chocolate = listaDeTortas.filter(torta => torta === 'Torta de chocolate')
    let vainilla = listaDeTortas.filter(torta => torta === 'Torta de vainilla')
    let frutas = listaDeTortas.filter(torta => torta === 'Torta de frutas')

    console.log('Cantidad de Torta de chocolate' , chocolate.length)
    console.log('Cantidad de Torta de vainilla' , vainilla.length)
    console.log('Cantidad de Torta de frutas' , frutas.length)
}

for (let button of addCartButtons) {
    button.addEventListener('click', agregarAlCarrito)
}

$(document).ready(function() {
  $('.formulario').submit(function(event) {

    var nombre = $('#nombre').val();
    var apellido = $('#apellido').val();
    var email = $('#email').val();
    
    validacionCorrecta = true;
    
    if(nombre === '' || apellido === '' || email === '') {
      alert('Por favor complete todos los campos');
      event.preventDefault();
      return false;
    }
    
    var regexNombre = /^[a-zA-ZÀ-ÿ\s]+$/;
    if(!regexNombre.test(nombre)) {
      $('#nombre-error').text('Por favor ingrese un nombre válido (sólo letras y espacios en blanco)').show();
      event.preventDefault();
      var validacionCorrecta = false;
    } else if (nombre.length < 3) {
      $('#nombre-error').text('Ingrese un nombre válido (mínimo 3 caracteres)').show();
      event.preventDefault();
      var validacionCorrecta = false;
    } else {
      $('#nombre-error').hide();
    }



    var regexApellido = /^[a-zA-ZÀ-ÿ\s]+$/;
    if(!regexApellido.test(apellido)) {
      $('#apellido-error').text('Por favor ingrese un apellido válido (sólo letras y espacios en blanco)').show();
      event.preventDefault();
      var validacionCorrecta = false;
    } else if(apellido.length < 3) {
      $('#apellido-error').text('El apellido debe tener al menos 3 caracteres').show();
      event.preventDefault();
      var validacionCorrecta = false;
    } else {
      $('#apellido-error').hide();
    } 

    var regexEmail = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if(!regexEmail.test(email)) {
      $('#email-error').text('Por favor ingrese un email válido').show();
      event.preventDefault();
      var validacionCorrecta = false;
    } else {
      $('#email-error').hide();
    }
      
   
    })

        
