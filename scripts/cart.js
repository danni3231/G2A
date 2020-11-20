const cartContainer = document.querySelector('.cart__container');

function renderCart(list) {
    cartContainer.innerHTML = '';

    list.forEach(function (elem) {
        const newProduct = document.createElement('section');
        newProduct.classList.add('product--cart');

        const url = `product.html?${elem.id}-${elem.title}`;

        newProduct.innerHTML = `
        <div class="product__img product__img--cart">
            <img src="" alt="">
        </div>
        <div class="product__info product__info--cart"> 
            <h2>${elem.title}</h2>
            <div class="product__price product__price--cart">
                <p>$${elem.newPrice}</p>
                <s>$${elem.lastPrice}</s>
            </div>
        </div>

        <div class="btn"><button>delete</button></div>
        
        `;

        if (elem.storageImgs) {
            elem.storageImgs.forEach(function (imageRef) {
                storageRef.child(imageRef).getDownloadURL().then(function (url) {
                    // Or inserted into an <img> element:
                    var img = newProduct.querySelector('img');

                    if (url.includes('coverImg')) {
                        img.src = url;
                    }

                }).catch(function (error) {
                    // Handle any errors
                });
            })
        }

        const deleteBtn = newProduct.querySelector('.btn');

        deleteBtn.addEventListener('click', function () {
            firebase.auth().onAuthStateChanged(function (user) {
                if (user) {
                    usersRef.doc(user.uid).collection('shopping cart').doc(elem.id)
                        .delete()
                        .then(() => {
                            alert('Se eliminó el producto del carrito');
                            getCart();
                        });

                } else {
                    alert("debes iniciar sesion");
                }
            });
        });


        cartContainer.appendChild(newProduct);
    });
}

const pSubtotal = document.querySelector('.summary__subtotal');
const pTotal = document.querySelector('.summary__total');
const pDiscount = document.querySelector('.summary__discount');

let subtotal = 0.00;
let total = 0.00;
let discount = 0.00;

function getCart() {

    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            // si el usuario existe quiere decir que inició sesión, se registró o ya tenía sesión iniciada

            usersRef.doc(user.uid).collection('shopping cart')
                .get()
                .then((querySnapshot) => {
                    subtotal = 0.00;
                    total = 0.00;
                    discount = 0.00;
                    const objects = [];
                    querySnapshot.forEach((doc) => {
                        const obj = doc.data();
                        obj.id = doc.id;
                        total += parseFloat(obj.newPrice);
                        subtotal += parseFloat(obj.lastPrice);
                        objects.push(obj);
                        console.log(`${doc.id} => ${doc.data()}`);
                    });
                    pSubtotal.innerText = `$${subtotal.toFixed(2)}`;
                    pTotal.innerText = `$${total.toFixed(2)}`;
                    pDiscount.innerText = `$${(total - subtotal).toFixed(2)}`;


                    renderCart(objects);
                });

        }
    });
}

// render inicial con la cart
getCart();

const btnCheckout = document.querySelector('.checkout');
 btnCheckout.addEventListener('click', () => {
     window.location.href = 'checkout.html';
 });
