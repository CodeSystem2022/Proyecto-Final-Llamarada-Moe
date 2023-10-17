// obtener referencias a elementos HTML por su ID
const modalContainer = document.getElementById("modal-container");
const modalOverlay = document.getElementById("modal-overlay");
const cartBtn = document.getElementById("cart-btn");
const cartCounter = document.getElementById("cart-counter");

// función para mostrar el carrito
const displayCart = () => {
  // Limpiar el contenido anterior del modal para evitar duplicados
  modalContainer.innerHTML = '';
  
  // mostrar el modal y la superposición
  modalContainer.style.display = "block";
  modalOverlay.style.display = "block";

  // crear la sección de encabezado del modal
  const modalHeader = document.createElement("div");

  // crear el botón de cierre del modal
  const modalClose = document.createElement("div");
  modalClose.innerText = "❌";
  modalClose.className = "modal-close";
  modalHeader.append(modalClose);

  // agregar un manejador de eventos para cerrar el modal
  modalClose.addEventListener("click", () => {
    modalContainer.style.display = "none";
    modalOverlay.style.display = "none";
  });

  // crear el título del modal
  const modalTitle = document.createElement("div");
  modalTitle.innerText = "Carrito";
  modalTitle.className = "modal-title";
  modalHeader.append(modalTitle);

  modalContainer.append(modalHeader);

  // sección del cuerpo del modal
  if (cart.length > 0) {
    // iterar sobre los productos en el carrito y crear elementos para cada uno
    cart.forEach((product) => {
      const modalBody = document.createElement("div");
      modalBody.className = "modal-body";
      modalBody.innerHTML = `
        <div class="product">
          <img class="product-img" src="${product.img}" />
          <div class="product-info">
            <h4>${product.productName}</h4>
          </div>
          <div class="quantity">
            <span class="quantity-btn-decrease">➖</span>
            <span class="quantity-input">${product.quantity}</span>
            <span class="quantity-btn-increase">➕</span>
          </div>
          <div class="price">$${product.price * product.quantity}</div> <!-- Agregamos el símbolo de pesos aquí -->
          <div class="delete-product">❌</div>
        </div>
      `;

      modalContainer.append(modalBody);

      // manejador de eventos para disminuir la cantidad de productos
      const decrease = modalBody.querySelector(".quantity-btn-decrease");
      decrease.addEventListener("click", () => {
        if (product.quantity > 1) {
          product.quantity--;
          displayCart();
          displayCounter();
        }
      });

      // manejador de eventos para aumentar la cantidad de productos
      const increase = modalBody.querySelector(".quantity-btn-increase");
      increase.addEventListener("click", () => {
        product.quantity++;
        displayCart();
        displayCounter();
      });

      // manejador de eventos para eliminar un producto del carrito
      const deleteProduct = modalBody.querySelector(".delete-product");
      deleteProduct.addEventListener("click", () => {
        deleteCartProduct(product.id);
      });
    });

    // crear el pie de página del modal con el total de la compra
    const total = cart.reduce((acc, product) => acc + product.price * product.quantity, 0);

    const modalFooter = document.createElement("div");
    modalFooter.className = "modal-footer";
    modalFooter.innerHTML = `
      <div class="total-price">TOTAL: $${total}</div> <!-- Agregamos el símbolo de pesos aquí -->
    `;

    modalContainer.append(modalFooter);
  } else {
    // si el carrito está vacío, mostrar un mensaje en el modal
    const modalText = document.createElement("h2");
    modalText.className = "modal-body";
    modalText.innerText = "Tu carrito está vacío";
    modalContainer.append(modalText);
  }
};

// agregar un manejador de eventos al botón de carrito para mostrar el carrito
cartBtn.addEventListener("click", displayCart);

// función para eliminar un producto del carrito
const deleteCartProduct = (id) => {
  // encontrar el índice del producto en el carrito por su ID
  const foundIndex = cart.findIndex((product) => product.id === id);

  if (foundIndex !== -1) {
    // si se encuentra, eliminar el producto del carrito
    cart.splice(foundIndex, 1);
    displayCart();
    displayCounter();
  }
};

// función para mostrar la cantidad de productos en el contador del carrito
const displayCounter = () => {
  // calcular la cantidad total de productos en el carrito
  const cartLength = cart.reduce((acc, product) => acc + product.quantity, 0);

  if (cartLength > 0) {
    // si hay productos en el carrito, mostrar el contador y actualizar el número
    cartCounter.style.display = "block";
    cartCounter.innerText = cartLength;
  } else {
    // si el carrito está vacío, ocultar el contador
    cartCounter.style.display = "none";
  }
};