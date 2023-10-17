const shopContent = document.getElementById("shopContent");
const cart = [];

productos.forEach((product) => {
  const content = document.createElement("div");
  content.className = "card";
  content.innerHTML = `
    <img src="${product.img}" class="product-img"> 
    <h3 class="product-name">${product.productName}</h3> 
    <p class="product-price">$${product.price}</p> 
    <button class="buy-button">Comprar</button> 
  `;

  shopContent.append(content);

  const buyButton = content.querySelector(".buy-button"); // obtener el botón de compra dentro de esta tarjeta

  buyButton.addEventListener("click", () => {
    const repeat = cart.some((repeatProduct) => repeatProduct.id === product.id);

    if (repeat === true) {
      cart.map((cartProduct) => {
        if (cartProduct.id === product.id) {
          cartProduct.quantity++; // incrementar 1 a un producto repetido en el carrito
        }
      });
    } else {
      cart.push({
        id: product.id,
        productName: product.productName,
        price: product.price,
        quantity: 1, // inicializar la cantidad en 1 al agregar un nuevo producto
        img: product.img,
      });
    }
    // llamar a una función para actualizar el contador del carrito (si es necesario)
    displayCounter();
  });
});


// Obtener referencia al enlace del carrito por su ID
const cartLink = document.getElementById("cart-link");

// agregar un manejador de eventos al enlace del carrito
cartLink.addEventListener("click", (e) => {
  e.preventDefault(); // evitar que el enlace realice una navegación
  displayCart(); // llamar a la función para mostrar el carrito
});