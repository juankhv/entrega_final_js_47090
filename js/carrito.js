const mostrarCarrito = () => {
    modalContainer.innerHTML = "";
    modalContainer.style.display = "flex";
    const modalHeader = document.createElement("div");
    modalHeader.className = "modal-header";
    modalHeader.innerHTML = `
      <h1 class= "modal-header-title">Carrito</h1>
    `;
    modalContainer.append(modalHeader);
    
    const modalButton = document.createElement("h1");
    modalButton.innerText = "x";
    modalButton.className = "modal-header-button";

    modalButton.addEventListener("click", () => {
        modalContainer.style.display = "none"
    });

    modalHeader.append(modalButton);


    carrito.forEach((item) => {
        let carritoContent = document.createElement("div")
        carritoContent.className = "modal-content"
        carritoContent.innerHTML = `
          <img src= "${item.img}">
          <h3>${item.nombre}</h3>
          <p>$${item.precio}</p>
          <span class= "restar"> - </span>
          <p>${item.cantidad}</p>
          <span class= "sumar"> + </span>
          <p>Total: $${item.cantidad * item.precio}</p>
          <span class= "delete-item"> ❌ </span>

        
        `;
        modalContainer.append(carritoContent);

        let restar = carritoContent.querySelector(".restar")
        
        restar.addEventListener("click" , () => {
            if (item.cantidad !== 1){
                item.cantidad--;
            }
            saveLocal();
            mostrarCarrito();
        });

        let sumar = carritoContent.querySelector(".sumar");
        
        sumar.addEventListener("click" , () => {
            item.cantidad++;
            saveLocal();
            mostrarCarrito();
        });
        

        let eliminar = carritoContent.querySelector(".delete-item");
        
        eliminar.addEventListener("click", () => {
            Swal.fire({
                title: "¿Estas seguro?",
                text: "Vas a eliminar un producto del carrito",
                icon: "question"
              });
            
              eliminarItem(item.id);
        });


    });

    const total = carrito.reduce ((acc, sku) => acc + sku.precio * sku.cantidad, 0);
    const totalBuy = document.createElement("div")
    totalBuy.className = "total-content"
    totalBuy.innerHTML = `Total la pagar: $${total}`;
    
    modalContainer.append(totalBuy);

};

verCarrito.addEventListener("click", mostrarCarrito);

const eliminarItem = (id) => {
    const foundId = carrito.find((element) => element.id === id);

    carrito = carrito.filter((carritoId) =>{
        return carritoId !== foundId;
    });
    carritoCounter();
    saveLocal();
    mostrarCarrito();
        
};

const carritoCounter = () => {
    cantidadCart.style.display = "block";
    const carritoLength = carrito.length;
    localStorage.setItem("carritoLength", JSON.stringify(carritoLength))
    cantidadCart.innerText = JSON.parse(localStorage.getItem("carritoLength"));
}

carritoCounter();

