/*---------------------------------------------------------------------
    File Name: custom.js
---------------------------------------------------------------------*/


/*---------------------my script-------------------------------*/
// variables
const body = document.querySelector('.main-layout')
    shoppingCart = document.querySelector('#shopping-cart tbody')
    removeAll = document.querySelector('.clear')

//eventListeners
function eventListener() {
    body.addEventListener('click', addToCart)
    shoppingCart.addEventListener('click', clear)
    removeAll.addEventListener('click', clearAll)
    document.addEventListener('DOMContentLoaded', loadedCart)
}
eventListener()

//functions
// add to cart function
function addToCart(e) {
    e.preventDefault()
    // if exist
    if (e.target.classList.contains('buynow')) {
        const shops = e.target.previousElementSibling
        // get shops
        getShop(shops)
    }
}

// get information of shop
function getShop(shops) {

    const shop = {
        Img: shops.querySelector('img').src,
        price: shops.querySelector('h4 span').textContent,
        id: shops.nextElementSibling.getAttribute('data-id')
    }
//   create tr of table in HTML
    const row = document.createElement('tr')

    row.innerHTML = `
      <tr>
          <td>
            <img src ="${shop.Img}" width="50px">
          </td>
           <td>${shop.price}</td>
           <td>
                <a class ="remove" href="#" data-id="${shop.id}">X</a>
            </td>
      </tr>`
    shoppingCart.appendChild(row)
    addToLocalStorage(shop)

}

// remove item from list
function clear(e) {
    e.preventDefault()
    let  shopId;
    // if class remove exist
    if (e.target.classList.contains('remove')) {
        e.target.parentElement.parentElement.remove()
        shopId = e.target.getAttribute('data-id')
    }
    removeIdShop(shopId)
}

// remove all
function clearAll(e) {
    e.preventDefault()
    shoppingCart.remove()
    clearAllFromLocalStorage()
}

// add to local storage
function addToLocalStorage(shop) {
    // get shopping
    const shopping = getFromLocalStorage()
    // push shop to array
    shopping.push(shop)
    // set string of array to local storage
    localStorage.setItem('shops', JSON.stringify(shopping))

}

// get from local storage
function getFromLocalStorage() {
    let shop;
    // get array of local storage
    if (localStorage.getItem('shops')) {
        shop = JSON.parse(localStorage.getItem('shops'))

    } else {
        shop = []
    }
    return shop
}

// remove item from local storage
function removeIdShop(shopId) {
    // get shops
    const shopping = getFromLocalStorage();
    // foreach in array
    shopping.forEach((elm, index) => {
        if (elm.id === shopId) {
            shopping.splice(index, 1)
        }
    });
    // set new array to local storage
    localStorage.setItem('shops', JSON.stringify(shopping))
}

// remove all items from local storage
function clearAllFromLocalStorage() {
    localStorage.clear()

}

// show shops when document loaded in to cart
function loadedCart() {
    const shopping = getFromLocalStorage()

    shopping.forEach((info) => {

//   create tr of table in HTML
        const row = document.createElement('tr')

        row.innerHTML = `
      <tr>
          <td>
            <img src ="${info.Img}" width="50px">
          </td>
           <td>${info.price}</td>
           <td>
                <a class ="remove" href="#" data-id="${info.id}">X</a>
            </td>
      </tr>`
        shoppingCart.appendChild(row)
    })
}


/*----------------------------------------------------*/
