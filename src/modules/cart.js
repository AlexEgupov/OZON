const cart = () => {
    //Получение элементов со страницы
    const cartBtn = document.getElementById('cart')
    const cartModal = document.querySelector('.cart')
    const cartCloseBtn = cartModal.querySelector('.cart-close')

    //Функция для открытия модального окна с корзиной
    const openCart = () => {
        cartModal.style.display = 'flex'
    }
    //Функция для закрытия модального окна с корзиной
    const closeCart = () => {
        cartModal.style.display = ''
    }

    //Открытие корзины при клике на иконку корзины
    cartBtn.addEventListener('click', openCart)
    //Закрытие корзины при клике на крестик
    cartCloseBtn.addEventListener('click', closeCart)
}

export default cart