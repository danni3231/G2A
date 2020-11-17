const storeContainer = document.querySelector('.store__container');

function renderProducts(list) {
    storeContainer.innerHTML = '';

    list.forEach(function (elem) {
        const newProduct = document.createElement('section');
        newProduct.classList.add('card');

        const url = `product.html?${elem.id}-${elem.title}`;

        newProduct.innerHTML = `
        <div class="card__info">

            <img class="card__img" src="" alt="">

            <h2><a href="${url}"> ${elem.title} <a></h2>
            <div>
                <p>
                    $${elem.newPrice}
                    <s>$${elem.lastPrice}</s>
                </p>
                <div class="btn--card"><button>add to cart</button></div>
            </div>

        </div>
        `;

        if (elem.storageImgs) {
            elem.storageImgs.forEach(function (imageRef) {
                storageRef.child(imageRef).getDownloadURL().then(function (url) {
                    // Or inserted into an <img> element:
                    var img = newProduct.querySelector('img');

                    if (url.includes('cardImg')) {
                        img.src = url;
                    }

                }).catch(function (error) {
                    // Handle any errors
                });
            })
        }

        // al hacer click al botón de editar
        const addBtn = newProduct.querySelector('.btn--card');
        addBtn.addEventListener('click', function () {

            firebase.auth().onAuthStateChanged(function (user) {
                if (user) {
                    // si el usuario existe quiere decir que inició sesión, se registró o ya tenía sesión iniciada

                    usersRef.doc(user.uid).collection('shopping cart').doc(elem.id)
                        .set(elem)
                        .then(function () {
                            console.log("se agrego el juego");
                        });

                } else {
                    // si no existe quiere decir que no ha iniciado sesión o acaba de cerrar sesión
                    alert("debes iniciar sesion");
                }
            });

        });

        storeContainer.appendChild(newProduct);
    });
}

function getProducts() {
    productsRef  // referencia de la colección
        .get() // pide todos los documentos de la colección
        .then((querySnapshot) => {
            const objects = [];
            querySnapshot.forEach((doc) => {
                const obj = doc.data();
                obj.id = doc.id;
                objects.push(obj);
                console.log(`${doc.id} => ${doc.data()}`);
            });
            renderProducts(objects);
        });
}

// render inicial con todos los productos
getProducts();