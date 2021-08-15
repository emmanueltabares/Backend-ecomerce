const socket = io.connect('http://localhost:3000', { forceNew: true })

newProduct = (title, price, thumbnail) => {
    e.preventDefault();

    const newProduct = {
        title: title,
        price: price,
        thumbnail: thumbnail
    }

    socket.emit('new-product', newProduct)

}






