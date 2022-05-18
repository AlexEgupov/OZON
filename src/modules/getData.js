const getData = () => {
    return fetch('https://ozon-f0ad6-default-rtdb.firebaseio.com/goods.json')
        .then((response) => {
            return response.json()
        })
}

export default getData