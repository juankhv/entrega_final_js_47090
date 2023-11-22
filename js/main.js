const shopContent = document.getElementById("shopContent");
const verCarrito = document.getElementById("verCarrito");
const modalContainer = document.getElementById("modal-container");
const cantidadCart = document.getElementById("cantidadCart");

let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

const getItems = async () => {
    const response = await fetch("datos.json");
    const datos = await response.json();

    datos.forEach((item) => {
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
            Toastify({
                text: "Producto agregado",
                duration: 3000,
                newWindow: true,
                close: true,
                gravity: "top", // `top` or `bottom`
                position: "right", // `left`, `center` or `right`
                stopOnFocus: true, // Prevents dismissing of toast on hover
                style: {
                  background: "linear-gradient(to right, #FF0000, #262626)",
                  textTransform: "uppercase",
                  fontSize: "0.75rem"
                },
                offset: {
                    x: '1.5rem', // horizontal axis - can be a number or a string indicating unity. eg: '2em'
                    y: '1.5rem' // vertical axis - can be a number or a string indicating unity. eg: '2em'
                  },
                onClick: function(){} // Callback after click
              }).showToast();
    
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
    
};

getItems();



// Local Storage set item
const saveLocal = () => {
    localStorage.setItem("carrito", JSON.stringify(carrito));
};







