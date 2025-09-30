const cartItems = [];
const cartImage = {
    Waffle: "img/image-waffle-thumbnail.jpg",
    Brûlée: "img/image-creme-brulee-thumbnail.jpg",
    Macaron: "img/image-macaron-thumbnail.jpg",
    Classic: "img/image-tiramisu-thumbnail.jpg",
    Pistachio: "img/image-baklava-thumbnail.jpg",
    Lemon: "img/image-meringue-thumbnail.jpg",
    red: "img/image-cake-thumbnail.jpg",
    Salted: "img/image-brownie-thumbnail.jpg",
    vanilla: "img/image-panna-cotta-thumbnail.jpg",

}

const cartBox = document.getElementById('cart');
const cartTitle = document.getElementById('cart-title');
const cartImg = document.getElementById('cart-img');
const cartText = document.getElementById('cart-text');
const addInfo = document.querySelector('.add-info');
const itemsConfirmed = document.getElementById('confirm-items');

function addToCart(name, price, id) {
    cartItems.push({ name, price, id, number: 1 });

    cartDisplayItems()
    document.querySelectorAll('.utility-btn').forEach((btn) => {
        if (btn.dataset.id === id) btn.classList.add('show');

    })
    addInfo.classList.add('show');

}

function cartDisplayItems() {
    cartTitle.innerHTML = `Your Cart (${cartItems.length})`;
    cartImg.classList.add('show');
    cartText.innerHTML = "";
    itemsConfirmed.innerHTML = "";
    cartItems.forEach((item, index) => {
        cartText.innerHTML += `<div class="cart-container">
            <div class="cart-order" data-index='${index}'>
                <div class="order-text">
                    <h5>${item.name}</h5>
                    <p><span class="special"></span><span class="num-pick" data-id='${item.id}'>${item.number} </span><span class="left">x</span> @ $<span class="price">${(item.price).toFixed(2)}</span> <span class="total"> $${(item.price * item.number).toFixed(2)}</span></p>
                </div>
                <div class="order-remove">
                    <img src="img/icon-remove-item.svg" alt="icon-remove-item" onclick="trashOrder(${index}, '${item.id}')">
                </div>
        </div>
        </div>`
        itemsConfirmed.innerHTML += `
          <div class="confirm-row">
                <div class="confirm-card">
                    <div class="confirm-img">
                        <img src="${cartImage[item.id]}">
                    </div>
                    <div class="order-text">
                        <h5>${item.name}</h5>
                        <p><span class="special"></span><span class="num-con" data-id='${item.id}'>${item.number} </span><span class="left">x</span> @ $<span class="price">${(item.price).toFixed(2)}</span> </p>
                    </div>
               
                </div>
            <p class="total"> $${(item.price * item.number).toFixed(2)}</p>
          </div>
        `
    })

    if (cartItems.length === 0) {
        cartImg.classList.remove('show');
        cartText.innerHTML = `<p class="cart-tex">Your added items will appear here</p>`;
        addInfo.classList.remove('show')
    }
    let total = 0;
    cartItems.forEach((item) => {
        total += (item.number * item.price);
    })
    document.querySelectorAll('.total-sum').forEach((sum) => {
        sum.innerHTML = "$" + total.toFixed(2);
    })
}
function subCart(id) {
    let number
    document.querySelectorAll('.num-pick').forEach((pick) => {
        if (pick.dataset.id === id) {
            const arrIdx = pick.closest('.cart-order').dataset.index
            number = Math.max(cartItems[arrIdx].number - 1, 1)
            cartItems[arrIdx].number = number
            cartDisplayItems()
        }

    })
    document.querySelectorAll('.count').forEach((touch) => {
        if (touch.dataset.id === id) {
            touch.innerHTML = number

        }
    })
}
// function subCart(id) {
//     document.querySelectorAll('.count').forEach((touch) => {
//         if (touch.dataset.id === id) {
//             touch.innerHTML = Math.max(1, parseInt(touch.innerHTML) - 1);
//             let numCount = parseInt(touch.innerHTML);

//             document.querySelectorAll('.num-pick').forEach((pick) => {
//                 if (pick.dataset.id === id) {
//                     pick.innerHTML = `${numCount}`;
//                     const arrIdx = pick.closest('.cart-order').dataset.index
//                     cartItems[arrIdx].number = numCount
//                 }

//             })


//         }


//     })

// }
function addCart(id) {
    let number
    document.querySelectorAll('.num-pick').forEach((pick) => {
        if (pick.dataset.id === id) {
            const arrIdx = pick.closest('.cart-order').dataset.index
            number = cartItems[arrIdx].number + 1
            cartItems[arrIdx].number = number
            cartDisplayItems()
        }

    })
    document.querySelectorAll('.count').forEach((touch) => {
        if (touch.dataset.id === id) {
            touch.innerHTML = number
            

        }
    })
}
// function addCart(id) {
//     document.querySelectorAll('.count').forEach((touch) => {
//         if (touch.dataset.id === id) {
//             touch.innerHTML = parseInt(touch.innerHTML) + 1
//             let numCount = touch.innerHTML;

//             document.querySelectorAll('.num-pick').forEach((pick) => {
//                 if (pick.dataset.id === id) {
//                     pick.innerHTML = `${numCount}`;
//                     const arrIdx = pick.closest('.cart-order').dataset.index
//                     cartItems[arrIdx].number = numCount
//                 }

//             })

//         }
//     })

// }


function trashOrder(index, id) {


    cartItems.splice(index, 1);


    document.querySelectorAll('.utility-btn').forEach((btn) => {
        if (btn.dataset.id === id) btn.classList.remove('show');

    })
    document.querySelectorAll('.count').forEach((touch) => {
        if (touch.dataset.id === id) {
            touch.innerHTML = 1;

        }

    })
    cartDisplayItems();

}

function submitBtn() {
    document.querySelector('.order-confirm').classList.add('show');
    document.querySelector('.overlay').classList.add('show');
    document.body.style.overflow = 'hidden';

}

function newOrder() {
    document.querySelector('.order-confirm').classList.remove('show');
    document.querySelector('.overlay').classList.remove('show');
    document.querySelectorAll('.utility-btn').forEach((btn) => {
        btn.classList.remove('show');

    })
    
    cartItems.splice(0)

    document.body.style.overflow = 'scroll';
    cartDisplayItems()

    document.querySelectorAll('.count').forEach((touch) => {
            touch.innerHTML = 1;
    })
}


