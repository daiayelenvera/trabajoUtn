
//--------------------------------------------------------------------------------------------
// FORMULARIO CONTACTO

const btnEnviarContacto = document.querySelector(".enviar-contacto")

let formContacto = document.getElementById("formContacto")
  formContacto.addEventListener('submit', function (event) {
    event.preventDefault()
  })

function enviarFormulario(event) {

  const validacionesContacto = {
    name: {
      presence: true,
      length: { minimum: 3 }
    },
    mail: {
      presence: true,
      length: { minimum: 5 },
      email: true,
    },
    message: {
      presence: true,
      length: { minimum: 15 },
    }
  };

  const formData = new FormData(formContacto);
  const errors = validate(
    Object.fromEntries(formData),
    validacionesContacto
  );

  // Selecciono la etiqueta <ul> para poner los errores de validaciones
  const listaErorres = document.querySelector("#errores-contacto");

  // Si hay errores, los mostramos. Sino los hay, mandamos los datos al servidor
  if (errors) {
    event.preventDefault();
    //Borro los errores que hayan quedado
    listaErorres.innerHTML = "";

    Object.values(errors).forEach(function (error) {
      const listItem = document.createElement("li");
      listItem.textContent = error[0];
      listaErorres.appendChild(listItem);
    });
    // Validate.js
  }
  else {
    listaErorres.innerHTML = "";

    var nombre = document.getElementById("name").value;

    alert(nombre + ". Tu mensaje ha sido enviado con éxito! Muchas Gracias ");
  }
}
btnEnviarContacto.addEventListener("click", enviarFormulario)

//--------------------------------------------------------------------------  

//------------------------------------------------------------------------
// CARRITO DE COMPRAS

// Obtenemos todos los botones de "Añadir al carrito"
// const addCartButtons = document.querySelectorAll('.add-cart-button');

// // Creamos un objeto para almacenar los productos seleccionados y su cantidad
// const cart = {};

// // Agregamos un evento 'click' a cada botón "Añadir al carrito"
// addCartButtons.forEach(button => {
//   button.addEventListener('click', event => {
//     // Obtenemos el precio y nombre del producto seleccionado
//     const price = parseFloat(event.target.previousElementSibling.textContent.slice(1));
//     const name = event.target.parentElement.querySelector('h3').textContent;

//     // Si el producto ya está en el carrito, aumentamos su cantidad en 1
//     if (cart[name]) {
//       cart[name] += 1;
//     } else {
//       // Si el producto no está en el carrito, lo agregamos con cantidad 1
//       cart[name] = 1;
//     }

//     // Actualizamos la vista del carrito con la lista de productos y la cantidad de cada uno
//     const cartList = document.querySelector('#cart-list');
//     cartList.innerHTML = '';
//     Object.keys(cart).forEach(product => {
//       const item = document.createElement('li');
//       item.textContent = `${product}: ${cart[product]}`;
//       cartList.appendChild(item);
//     });

//     // Actualizamos el total de la compra
//     const totalPrice = document.querySelector('#total-price');
//     const currentTotal = parseFloat(totalPrice.textContent.slice(1));
//     totalPrice.textContent = `$${currentTotal + price}`;
//   });
// });
//--------------------------------------------------------------------------------------------

//--------------------------------------------------------------------------------------------
// FORMULARIO RESUMEN

const preciosTortas = {
  chocolate: 3000,
  vainilla: 2000,
  frutas: 2500,
};

const validacionesResumen = {
  nombre: {
      presence: true,
      length: { minimum: 3 }
  },
  apellido: {
      presence: true,
      length: { minimum: 3 }
  },
  email: {
      presence: true,
      length: { minimum: 5 },
      email: true,
  },
  torta: {
      presence: true,
  },
  cantidad: {
      presence: true,
      numericality: true,
  },
};


// Asistente Wizard
// ---------------
const form = document.getElementById("myForm");
const pasoUno = document.querySelector(".paso-uno")
const pasoDos = document.querySelector(".paso-dos")
const btnAtras = document.querySelector(".btn-atras")
const btnSiguiente = document.querySelector(".btn-siguiente")

pasoDos.style.display = "none"
btnAtras.style.display = "none"

function ocultarSiguiente(event) {
  btnSiguiente.style.display = "none"
  btnAtras.style.display = "block"

  pasoUno.style.display = "none"
  pasoDos.style.display = "block"
}
function ocultarAtras(event) {
  btnAtras.style.display = "none"
  btnSiguiente.style.display = "block"

  pasoDos.style.display = "none"
  pasoUno.style.display = "block"
}

btnAtras.addEventListener("click", ocultarAtras)
btnSiguiente.addEventListener("click", ocultarSiguiente)
// ---------------
// Asistente Wizard


form.addEventListener("submit", function (event) {
  // Esto evita refrescar la pagina
  event.preventDefault();

  // Validate.js
  // Aca pongo las validaciones de Validate.js
  const formData = new FormData(form);
  const errors = validate(
      Object.fromEntries(formData),
      validacionesResumen
  );

  // Selecciono la etiqueta <ul> para poner los errores de validaciones
  const listaErorres = document.querySelector("#listaErrores");

  // Si hay errores, los mostramos. Sino los hay, mandamos los datos al servidor
  if (errors) {
      event.preventDefault();
      //Borro los errores que hayan quedado
      listaErorres.innerHTML = "";

      Object.values(errors).forEach(function (error) {
          const listItem = document.createElement("li");
          listItem.textContent = error[0];
          listaErorres.appendChild(listItem);
      });
      // Validate.js
  } else {
      //Borro los errores que hayan quedado
      listaErorres.innerHTML = "";

      //Aca utilizo jQuery para seleccionar las etiquetas HTML y guardar sus valores en variables
      // jQuery
      const nombre = $("#nombre").val();
      const apellido = $("#apellido").val();
      const email = $("#email").val();
      const tortaSeleccionada = $("#torta").val();
      const cantidad = parseInt($("#cantidad").val());
      // jQuery

      const precioTorta = preciosTortas[tortaSeleccionada];
      const precioTotal = precioTorta * cantidad;

      // INTEGRACION AJAX y Consumo de API externa
      $.ajax({
          url: `https://jsonplaceholder.typicode.com/posts`,
          method: 'POST',
          contentType: 'application/json',
          headers: {
              'Content-type': 'application/json; charset=UTF-8',
            },
          data: JSON.stringify({
              nombre,
              apellido,
              email,
              tortaSeleccionada,
              cantidad,
              precioTotal
          }),
          success: function (response) {
              console.log(response);

              const {nombre, apellido, email, tortaSeleccionada, cantidad, precioTotal} = response;

              const mensaje = `¡Se ha mandado la información con exito!\nNombre: ${nombre}\nApellido: ${apellido}\nEmail: ${email}\nTorta: ${tortaSeleccionada}\nCantidad: ${cantidad}\nPrecio Total: $${precioTotal}`;

              alert(mensaje);
          },
          error: function(xhr, textStatus, errorThrown) {
              alert('Hubo un problema en la petición AJAX: ' + errorThrown);
          }
      });


      
  }
});
//--------------------------------------------------------------------------------------------

//--------------------------------------------------------------------------------------------
// GENERAR PDF
document
  .getElementById("pdfBtn")
  .addEventListener("click", function () {
      const nombre = document.getElementById("nombre").value;
      const apellido = document.getElementById("apellido").value;
      const email = document.getElementById("email").value;
      const tortaSeleccionada = document.getElementById("torta").value;
      const cantidad = parseInt(
          document.getElementById("cantidad").value
      );

      const precioTorta = preciosTortas[tortaSeleccionada];
      const precioTotal = precioTorta * cantidad;

      const mensaje = `Nombre: ${nombre}\nApellido: ${apellido}\nEmail: ${email}\nTorta: ${tortaSeleccionada}\nCantidad: ${cantidad}\nPrecio Total: $${precioTotal}`;

      // Generar PDF
      const doc = new jsPDF();
      doc.text("**RESUMEN**", 10, 10);
      doc.text(mensaje, 10, 20);
      doc.text("Gracias por su compra! :)", 10, 80); // Agregar mensaje de agradecimiento
      doc.save(`${nombre}_${apellido}_pedido.pdf`);

      // Descargar PDF en una nueva ventana
      const pdfWindow = window.open("");
      pdfWindow.document.write(
          "<iframe width='100%' height='100%' src='" +
          doc.output("datauristring") +
          "'></iframe>"
      );
  });

  //--------------------------------------------------------------------------------------------