// Función para cargar el carrito desde localStorage
function loadCart() {
    const cart = JSON.parse(localStorage.getItem('tennispro-cart')) || [];
    const cartItemsContainer = document.getElementById('cart-items');
    const orderSummary = document.getElementById('order-summary');
    const cartCount = document.getElementById('cart-count');
    
    // Actualizar contador del carrito
    cartCount.textContent = cart.length;
    
    if (cart.length === 0) {
        cartItemsContainer.innerHTML = `
            <div class="empty-cart">
                <span class="icon solid fa-shopping-cart"></span>
                <h3>Tu carrito está vacío</h3>
                <p>Agrega productos desde nuestro catálogo</p>
                <a href="index.html" class="button">Ver productos</a>
            </div>
        `;
        orderSummary.style.display = 'none';
        return;
    }
    
    // Crear tabla de productos
    let tableHTML = `
        <div class="table-wrapper">
            <table>
                <thead>
                    <tr>
                        <th>Producto</th>
                        <th>Precio</th>
                        <th>Total</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
    `;
    
    let subtotal = 0;
    
    cart.forEach((item, index) => {
        subtotal += item.price;
        
        tableHTML += `
            <tr>
                <td>${item.name}</td>
                <td>$${item.price.toFixed(2)}</td>
                <td>$${item.price.toFixed(2)}</td>
                <td><span class="remove-item" onclick="removeItem(${index})">✕</span></td>
            </tr>
        `;
    });
    
    tableHTML += `
                </tbody>
                <tfoot>
                    <tr>
                        <td colspan="2"></td>
                        <td><strong>$${subtotal.toFixed(2)}</strong></td>
                        <td></td>
                    </tr>
                </tfoot>
            </table>
        </div>
    `;
    
    cartItemsContainer.innerHTML = tableHTML;
    
    // Actualizar resumen
    document.getElementById('subtotal').textContent = subtotal.toFixed(2);
    document.getElementById('total').textContent = subtotal.toFixed(2);
    orderSummary.style.display = 'block';
}

// Función para eliminar un producto del carrito
function removeItem(index) {
    const cart = JSON.parse(localStorage.getItem('tennispro-cart')) || [];
    if (index >= 0 && index < cart.length) {
        cart.splice(index, 1);
        localStorage.setItem('tennispro-cart', JSON.stringify(cart));
        loadCart();
    }
}

// Cargar el carrito al iniciar la página
document.addEventListener('DOMContentLoaded', loadCart);