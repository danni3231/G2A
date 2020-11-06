const profileUsername = document.querySelector(".profile__username");
const profileEmail = document.querySelector(".profile__email");

//console.log(userinfo);

const upload = document.querySelector(".upload");

console.log(upload);

upload.addEventListener('submit', function (event) {
    event.preventDefault();

    const inputsDevices = upload.querySelector(".form__deviceBtn").getElementsByTagName('input');
    var devices=[];
    var features=[];

    for (let item of inputsDevices){
        if(item.checked){
            devices.push(item.name);
        }
    }

    features = upload.features.value.split(",");

    const newProduct = {
        title: upload.title.value,
        shortDescription: upload.shortDescription.value,
        description: upload.description.value,
        genre: upload.genre.value,
        features: features,
        lastPrice: upload.lastPrice.value,
        newPrice: upload.newPrice.value,
        devices: devices
    }

    function handleThen (docRef) {
        
    }
    
    function handleCatch (error) {
        console.error("Error adding document: ", error);
    }

    productsRef
    .add(newProduct)
    .then(handleThen)
    .catch(handleCatch);

});


