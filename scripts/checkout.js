let cart = [];

firebase.auth().onAuthStateChanged(function (user) {

    if (user) {
        usersRef.doc(user.uid).collection('shopping cart')
            .get()
            .then((querySnapshot) => {
                cart = [];
                querySnapshot.forEach((doc) => {
                    const obj = doc.data();
                    obj.id = doc.id;
                    cart.push(obj);
                });
            });
    }
});

const checkout = document.querySelector('.checkout');

checkout.addEventListener('submit', (event) => {
    event.preventDefault();

    const name = checkout.name.value;
    const id = checkout.id.value;
    const cardNumber = checkout.cardNumber.value;
    const expirationDate = checkout.expirationDate.value;
    const code = checkout.code.value;


    const order = {

        name: name,
        id: id,
        cardNumber: cardNumber,
        expireDate: expirationDate,
        code: code,
        cart: cart

    }


    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            // Guarda los objetos del carrito en un arreglo.
            usersRef.doc(user.uid).collection('shopping cart')
                .get(order)
                .then((querySnapshot) => {

                    querySnapshot.forEach((doc) => {

                        usersRef.doc(user.uid)
                            .collection('shopping cart')
                            .doc(doc.id)
                            .delete()
                            .then(() => {
                                console.log('se elimino el producto');
                            });

                    });
                });
        }
    });


    function addInUserRef(order) {
        firebase.auth().onAuthStateChanged(function (user) {
            if (user) {
                // Guarda los objetos del carrito en un arreglo.
                usersRef.doc(user.uid).collection('orders')
                    .add(order)
                    .then(() => {
                        
                    });
            }
        });
    }

    ordersRef
        .add(order)
        .then(() => {

            addInUserRef(order);
            checkout.name.value = '';
            checkout.id.value = '';
            checkout.cardNumber.value = '';
            checkout.expirationDate.value = '';
            checkout.code.value = '';

            alert('¡Gracias por comprar en G2A!');
            window.location.href = 'store.html'
        })

    console.log(order);
});