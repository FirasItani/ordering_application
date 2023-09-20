import { menuArray } from './data.js'
import { v4 as uuidv4 } from 'https://jspm.dev/uuid';

let arrayOfOrders = []


const modal = document.getElementById('modal')
const formData = document.getElementById('form-modal')




let total = 0

document.addEventListener('click', e => {
    if(e.target.dataset.add) {
        addItemToList(e.target.dataset.add)
    }
    if(e.target.dataset.remove) {
        removeOrder(e.target.dataset.remove)
    }
    if(e.target.id === 'order-complete-btn') {
        orderReadyNow()
    }
})

function renderHtml() {
    // const menus = document.getElementById('menus')
    menuArray.forEach(show =>
        menus.innerHTML += `
    <div class = "menu-list">
        <p class="emoji">${show.emoji}</p>
        <div class="menu-info">
            <h1 class="menu-name">${show.name}</h1>
            <p class="menu-type">${show.ingredients}</p>
            <h3 class="menu-price">$${show.price}</h3>
        </div>
        <button class="add-menu-btn" data-add="${show.id}">+</button>
    </div>`
    )
}
renderHtml()

function addItemToList(orderId) {
  const targetOrderObj = menuArray.filter(select => select.id == orderId)[0]
    arrayOfOrders.push(targetOrderObj)
    arrayOfOrders = arrayOfOrders.map(it => {
        return {
            ...it,
            uuid: uuidv4()
        }
    })
    renderOrderList()
}

function renderOrderList() {
    const orderContainer = document.getElementById('order-container')
    let htmlOrderPage = ``
    total = 0
    arrayOfOrders.forEach(order => {
        total += order.price
        htmlOrderPage +=`
            <div class="item">
                <p class="order-name">${order.name}</p>
                <button class="order-remove-btn" data-remove="${order.uuid}">Remove</button>
                <p class="order-price">$${order.price}</p>
            </div>`
    })
    render1()
    orderContainer.innerHTML = htmlOrderPage    
}

function render1() {
    const heading = `<h2 class="order-text">Your Order</h2>`              
    document.getElementById('your-order').innerHTML = heading
    totalPrice()
}

function totalPrice() {
    const output =`
    <div class="total-order">
        <h1 class="total-price-text">Total price:</h1>
        <h2 class="order-total-price">$${total}</h2>
    </div>
    <button class="order-complete-btn" id="order-complete-btn">Complete order</button>`
    document.getElementById('bottom').innerHTML = output
}

function removeOrder(idRemover) {
    arrayOfOrders = arrayOfOrders.filter( remove => remove.uuid !== idRemover)
    renderOrderList()
}

function orderReadyNow() {
    modal.style.display = 'block'
}

document.getElementById('close-btn').addEventListener('click', () => {
    modal.style.display = 'none'
})

formData.addEventListener('submit', function(e) {
    const orderEl = document.getElementById('order')
    const fullName = document.getElementById('fullName')
    const cardNumber = document.getElementById('cardNumber')
    const cardCVV = document.getElementById('cardCVV')
    e.preventDefault()
    const orderFormData = new FormData(formData)
    const nameUser = orderFormData.get('fullName')
        
        orderEl.innerHTML = `
        <div class="design-text">
            <h1 class="text-message">Thanks,<span class="modal-display-name"> ${nameUser} ❤️</span> Your order is on its way...</h1>
        </div>`
        modal.style.display = 'none'
        fullName.value = ''
        cardNumber.value = ''
        cardCVV.value = ''
})





