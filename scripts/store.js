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
                            alert("se agrego el juego al carrito");
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

const objects = [];
function getProducts() {
    productsRef  // referencia de la colección
        .get() // pide todos los documentos de la colección
        .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                const obj = doc.data();
                obj.id = doc.id;
                objects.push(obj);
                //console.log(`${doc.id} => ${doc.data()}`);
            });
            renderProducts(objects);
        });
}

// render inicial con todos los productos
getProducts();



const filters = document.querySelector('.filters').querySelector('form');

console.log(filters);

filters.addEventListener('input', function () {
    let copy = objects.slice();

    const sort = filters.sort.value;

    switch (sort) {
        case 'a-z':
            copy.sort(function (a, b) {
                if (a.title > b.title) {
                    return 1;
                  }
                  if (a.title < b.title) {
                    return -1;
                  }
                  return 0;
            });
            break;
        case 'z-a':
            copy.sort(function (a, b) {
                if (a.title < b.title) {
                    return 1;
                  }
                  if (a.title > b.title) {
                    return -1;
                  }
                  return 0;
            });
            break;
    }

    const genre = filters.genre.value;

    if (genre != '') {
        copy = copy.filter(function (elem) {
            if (elem.genre.toLowerCase().includes(genre)) {
                return true;
            } else {
                return false;
            }
        });
    }

    const platform = filters.platform.value;

    if (platform != '') {
        copy = copy.filter(function (elem) {
            let contains = false;
            for (const device of elem.devices) {
                if (device.toLowerCase() == platform) {
                    contains = true;
                }
            }

            if (contains) {
                return true;
            } else {
                return false;
            }
        });
    }

    const features = filters.features.value;

    if (features != '') {
        copy = copy.filter(function (elem) {
            let contains = false;
            for (const feature of elem.features) {
                if (feature.toLowerCase() == features) {
                    contains = true;
                }
            }

            if (contains) {
                return true;
            } else {
                return false;
            }
        });
    }



    renderProducts(copy);
});