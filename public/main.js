const socket = io.connect();

newProduct = (e) => {
    e.preventDefault()
    console.log('EJECUTANDO NEWPRODUCT')
    const newProduct = {
        title: document.getElementById('title').value,
        price: document.getElementById('price').value,
        thumbnail: document.getElementById('thumbnail').value
    }

    socket.emit('new-product', newProduct);
    return false;
}

socket.on('products', (data) => {
    console.log('RECIBI MENSAJE')
    alert(JSON.stringify(data))
    console.log(data)

});
 





