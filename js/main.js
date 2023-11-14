const shopContent = document.getElementById("shopContent");
const verCarrito = document.getElementById("verCarrito");
const modalContainer = document.getElementById("modal-container");
const cantidadCart = document.getElementById("cantidadCart");

let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

productos.forEach((item) => {
    let content = document.createElement("div");
    content.className = "card";
    content.innerHTML = `
     <img src="${item.img}">
     <h3>${item.nombre}</h3>
     <p class="price">$${item.precio}</p> 
    `;

    shopContent.append(content);

    let comprar = document.createElement("button")
    comprar.innerText = "Comprar";
    comprar.className = "comprar"

    content.append(comprar);

    comprar.addEventListener("click", ()=> {

    const repeat = carrito.some((repeatItem) => repeatItem.id === item.id);

    if(repeat){
        carrito.map((prod) =>{
            if(prod.id === item.id){
                prod.cantidad++;
            }
        });
    }   else {
        carrito.push({
            id: item.id,
            img: item.img,
            nombre: item.nombre,
            precio: item.precio,
            cantidad: item.cantidad,
        });
        carritoCounter();
        saveLocal();
    }
    


    });

});

// Local Storage set item
const saveLocal = () => {
    localStorage.setItem("carrito", JSON.stringify(carrito));
};







