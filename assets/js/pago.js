document.addEventListener('DOMContentLoaded', function() {
    // Mostrar los productos del carrito
    const cart = JSON.parse(localStorage.getItem('tennispro-cart')) || [];
    const orderItemsContainer = document.getElementById('order-items');
    const orderTotalElement = document.getElementById('order-total');
    
    let total = 0;
    
    if (cart.length === 0) {
        orderItemsContainer.innerHTML = '<p>No hay productos en el carrito</p>';
    } else {
        let itemsHTML = '<ul>';
        cart.forEach(item => {
            itemsHTML += `<li>${item.name} - $${item.price.toFixed(2)}</li>`;
            total += item.price;
        });
        itemsHTML += '</ul>';
        orderItemsContainer.innerHTML = itemsHTML;
    }
    
    orderTotalElement.textContent = total.toFixed(2);
    
    // Manejar el envío del formulario
    const paymentForm = document.getElementById('payment-form');
    
    paymentForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        if (validateForm()) {
            // Vaciar el carrito
            localStorage.removeItem('tennispro-cart');
            
            // Mostrar mensaje de éxito
            alert('¡Pago realizado con éxito! Gracias por tu compra.\nSe ha vaciado tu carrito de compras.');
            
            // Actualizar la ventana principal y cerrar esta
            if (window.opener && !window.opener.closed) {
                window.opener.postMessage('cartUpdated', '*');
                window.opener.focus();
            }
            window.close();
        }
    });
    
    function validateForm() {
        // Validar campos obligatorios
        const requiredFields = ['nombre', 'email', 'direccion', 'cp', 'tarjeta', 'vencimiento', 'cvv'];
        let isValid = true;
        
        requiredFields.forEach(fieldId => {
            const field = document.getElementById(fieldId);
            if (!field.value.trim()) {
                field.style.borderColor = 'red';
                isValid = false;
            } else {
                field.style.borderColor = '#ddd';
            }
        });
        
        // Validar formato de email
        const email = document.getElementById('email').value;
        if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            alert('Por favor ingresa un correo electrónico válido');
            document.getElementById('email').style.borderColor = 'red';
            isValid = false;
        }
        
        // Validar tarjeta (16 dígitos)
        const tarjeta = document.getElementById('tarjeta').value.replace(/\s/g, '');
        if (tarjeta.length !== 16 || !/^\d+$/.test(tarjeta)) {
            alert('El número de tarjeta debe tener 16 dígitos');
            document.getElementById('tarjeta').style.borderColor = 'red';
            isValid = false;
        }
        
        // Validar CVV (3 dígitos)
        const cvv = document.getElementById('cvv').value;
        if (cvv.length !== 3 || !/^\d+$/.test(cvv)) {
            alert('El CVV debe tener 3 dígitos');
            document.getElementById('cvv').style.borderColor = 'red';
            isValid = false;
        }
        
        if (!isValid) {
            alert('Por favor corrige los campos marcados en rojo');
        }
        
        return isValid;
    }
});