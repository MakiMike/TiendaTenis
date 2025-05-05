
    // Escuchar mensajes de la ventana de pago
    window.addEventListener('message', function(e) {
        if (e.data === 'cartUpdated') {
            // Recargar el carrito cuando se complete un pago
            loadCart();
        }
    });
