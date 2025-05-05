
// Función para agregar productos al carrito
function addToCart(productName, productPrice) {
    // Obtener carrito actual o crear uno nuevo
    const cart = JSON.parse(localStorage.getItem('tennispro-cart')) || [];
    
    // Agregar el nuevo producto
    cart.push({
        name: productName,
        price: productPrice
    });
    
    // Guardar en localStorage
    localStorage.setItem('tennispro-cart', JSON.stringify(cart));
    
    // Actualizar contador en todas las páginas
    const cartCountElements = document.querySelectorAll('#cart-count');
    cartCountElements.forEach(el => el.textContent = cart.length);
    
    // Mostrar mensaje al usuario (opcional)
    alert(`${productName} ha sido agregado al carrito`);
    
    // Prevenir el comportamiento predeterminado del botón
    return false;
}