
  const form = document.querySelector('.formpedido');
  const button = form.querySelector('button[type="submit"]');

  if (button) {
    button.addEventListener('click', function(event) {
      event.preventDefault();
    
      const nombre = form.querySelector('#nombre').value;
      const apellido = form.querySelector('#apellido').value;
      const email = form.querySelector('#email').value;
      const torta = form.querySelector('#torta').value;
      const cantidad = form.querySelector('#cantidad').value;

      const mensaje = `Resumen del pedido:\n\nNombre: ${nombre}\nApellido: 
      ${apellido}\nEmail: ${email}\nSabor de la torta: ${torta}\nCantidad: ${cantidad}`;

      alert(mensaje);
    )};
