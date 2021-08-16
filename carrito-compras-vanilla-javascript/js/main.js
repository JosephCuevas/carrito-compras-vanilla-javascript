const clickButton = document.querySelectorAll('.button');
let carrito = [];
const tbody = document.querySelector('.tbody');

clickButton.forEach(btn => {
    btn.addEventListener('click', addToCarritoItem);
})

function addToCarritoItem(e) {
    const button = e.target;
    const item = button.closest('.card');
    const itemTitle = item.querySelector('.card-title').textContent;
    const itemPrice = item.querySelector('.precio').textContent;
    const itemImg = item.querySelector('.card-img-top').src;

    const newItem = {
        title: itemTitle,
        precio: itemPrice,
        img: itemImg,
        cantidad: 1
    }

    addItemCarrito(newItem);
}

function addItemCarrito(newItem) {
    const alert = document.querySelector('.hide');

    setTimeout( function() {
        alert.classList.add('hide')
    }, 2000)
    alert.classList.remove('hide')

    const inputElement = tbody.getElementsByClassName('input-element')
    for(let i=0; i<carrito.length; i++) {
        if(carrito[i].title.trim() === newItem.title.trim()){
            carrito[i].cantidad ++;
            const inputValue = inputElement[i];
            inputValue.value++;
            carritoTotal();
            return null;
        }
    }

    carrito.push(newItem);
    renderCarrito();
}

function renderCarrito() {
    tbody.innerHTML = '';
    carrito.map(item => {
        const tr = document.createElement('tr');
        tr.classList.add('itemCarrito');
        const content = `
        <th scope="row">1</th>
        <td class="table-producto"><img src=${item.img} alt=""></td>
        <h6 class="title">${item.title}</h6>
        <td class="table-precio"><p>${item.precio}</p></td>
        <td class="table-cantidad">
            <input type="number" min="1" value=${item.cantidad} class="input-element"> 
            <button class="delete btn btn-danger">X</button>
        </td>
        `;
        tr.innerHTML = content;
        tbody.append(tr);
        tr.querySelector('.delete').addEventListener('click', removeItemCarrito);
        tr.querySelector('.input-element').addEventListener('change', sumaCantidad)
    });
    carritoTotal();
}

function carritoTotal() {
    let total = 0;
    const itemCarTotal = document.querySelector('.itemCardTotal');
    carrito.forEach(item => {
        const precio = Number(item.precio.replace("$", ""));
        total = total + precio*item.cantidad;
    });
    itemCarTotal.innerHTML = `Total: $${total}`;
    addLocalStorage();
}

function removeItemCarrito(e) {
    const remove = document.querySelector('.remove');
    const buttonDelete = e.target;
    const tr = buttonDelete.closest('.itemCarrito');
    const title = tr.querySelector('.title').textContent;
    for(let i = 0; i < carrito.length ; i++) {
        if(carrito[i].title.trim() === title.trim()) {
            carrito.splice(i, 1);
        }
    }
    setTimeout(() => {
        remove.classList.add('remove');
    }, 2000);
    remove.classList.remove('remove')
    tr.remove();
    carritoTotal();
}

function sumaCantidad(e) {
    const sumaInput = e.target;
    const tr = sumaInput.closest('.itemCarrito');
    const title = tr.querySelector('.title').textContent;
    carrito.forEach(item => {
        if(item.title.trim() === title) {
            sumaInput.value <1 ? (sumaInput.value = 1) : sumaInput.value;
            item.cantidad = sumaInput.value;
            carritoTotal();
        }
    });
}

function addLocalStorage() {
    localStorage.setItem('carrito', JSON.stringify(carrito));
}

window.onload = function() {
    const storage = JSON.parse(localStorage.getItem('carrito'));
    if(storage) {
        carrito = storage;
        renderCarrito();
    }
}