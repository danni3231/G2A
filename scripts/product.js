window.addEventListener('load', function () {

    // partimos el location con el separador -
    const parts = location.search.split('-');
    // usamos la primer parte y la limpiamos
    const uid = parts[0].replace('?', '');

    //referencia al producto con el uid específico
    productsRef.doc(uid)
        .get() // traer info de ese producto
        .then(function (snapshot) {

            const product = snapshot.data();

            if (product.storageImgs) {
                product.storageImgs.forEach(function (imageRef) {
                    storageRef.child(imageRef).getDownloadURL().then(function (url) {
                        // Or inserted into an <img> element:
                        var img = document.querySelector('.product__img').querySelector('img');

                        if (url.includes('coverImg')) {
                            img.src = url;
                        }

                    }).catch(function (error) {
                        // Handle any errors
                    });
                })
            }

            const info = document.querySelector('.product__info');
            info.querySelector('h1').innerText = product.title;
            info.querySelector('p').innerText = product.shortDescription;

            const prices = document.querySelector('.product__price');

            prices.querySelector('p').innerText = `$ ${product.newPrice}`;
            prices.querySelector('s').innerText = `$ ${product.lastPrice}`;

            document.querySelector('.product__description').innerText = product.description;

            const devices = document.querySelector('.product__devices');
            const tags = document.querySelector('.product__tags');

            for (let item of product.devices) {
                console.log(item);
                const img = document.createElement('img');
                if (item == 'steam' || item == 'xbox') {
                    img.src = `./data/device/${item}.svg`;
                } else {
                    img.src = `./data/device/${item}.png`;
                }

                devices.appendChild(img);

                const tag = document.createElement('p');
                tag.classList.add('product__tag');
                tag.innerText = item;

                tags.appendChild(tag);
            }

            for (let item of product.features) {
                const tag = document.createElement('p');
                tag.classList.add('product__tag');
                tag.innerText = item;

                tags.appendChild(tag);
            }

            // add references

            const refrencesContainer = document.querySelector('.product__references');

            function renderReferences(list) {
                refrencesContainer.innerHTML = '';

                let newList = [];

                for (let i = 0; i < 3; i++) {
                    let randomIndex = Math.floor(Math.random() * list.length);
                    newList.push(list[randomIndex]);
                    list.slice(randomIndex);
                }

                newList.forEach(function (elem) {
                    const newProduct = document.createElement('section');
                    newProduct.classList.add('card');
                    newProduct.classList.add('card--reference');

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

                    refrencesContainer.appendChild(newProduct);
                });
            }

            productsRef  // referencia de la colección
                .get() // pide todos los documentos de la colección
                .then((querySnapshot) => {
                    const objects = [];
                    querySnapshot.forEach((doc) => {
                        const obj = doc.data();
                        obj.id = doc.id;
                        objects.push(obj);
                    });

                    renderReferences(objects);
                });

        });

});