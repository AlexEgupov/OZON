import renderCart from "./renderCart"
import postData from './postData'

const cart = () => {
    //Получение элементов со страницы
    const cartBtn = document.getElementById('cart')
    const cartModal = document.querySelector('.cart')
    const cartCloseBtn = cartModal.querySelector('.cart-close')
    const cartTotal = cartModal.querySelector('.cart-total > span')
    const cartSendBtn = cartModal.querySelector('.cart-confirm')
    const goodsWrapper = document.querySelector('.goods')
    const cartWrapper = document.querySelector('.cart-wrapper')

    //Функция для открытия модального окна с корзиной
    const openCart = () => {
        const cart = localStorage.getItem('cart') ?
            JSON.parse(localStorage.getItem('cart')) : []
        cartModal.style.display = 'flex'

        renderCart(cart)
        //Подсчет суммы товаров
        cartTotal.textContent = cart.reduce((sum, goodItem) => {
            return sum + goodItem.price
        }, 0)
    }
    //Функция для закрытия модального окна с корзиной
    const closeCart = () => {
        cartModal.style.display = ''
    }
    //Открытие корзины при клике на иконку корзины
    cartBtn.addEventListener('click', openCart)
    //Закрытие корзины при клике на крестик
    cartCloseBtn.addEventListener('click', closeCart)
    //Добавление предметов в корзину
    goodsWrapper.addEventListener('click', (event) => {
        if (event.target.classList.contains('btn-primary')) {
            const card = event.target.closest('.card')
            const key = card.dataset.key
            const goods = JSON.parse(localStorage.getItem('goods'))
            const cart = localStorage.getItem('cart') ?
                JSON.parse(localStorage.getItem('cart')) : []
            const goodItem = goods.find((item) => {
                return item.id === +key
            })

            cart.push(goodItem)

            localStorage.setItem('cart', JSON.stringify(cart))
        }
    })
    //Удаление предметов из корзины
    cartWrapper.addEventListener('click', (event) => {
        if (event.target.classList.contains('btn-primary')) {
            const cart = localStorage.getItem('cart') ?
                JSON.parse(localStorage.getItem('cart')) : []
            const card = event.target.closest('.card')
            const key = card.dataset.key
            const index = cart.findIndex((item) => {
                return item.id === +key
            })

            cart.splice(index, 1)

            localStorage.setItem('cart', JSON.stringify(cart))

            renderCart(cart)

            cartTotal.textContent = cart.reduce((sum, goodItem) => {
                return sum + goodItem.price
            }, 0)
        }
    })
    //Отправка данных из корзины
    cartSendBtn.addEventListener('click', () => {
        const cart = localStorage.getItem('cart') ?
            JSON.parse(localStorage.getItem('cart')) : []

        postData(cart).then(() => {                                 //Удаление предметов
            localStorage.removeItem('cart')                         //из корзины

            renderCart([])                                          //после

            cartTotal.textContent = 0                               //отправки
        })
    })
}

export default cart