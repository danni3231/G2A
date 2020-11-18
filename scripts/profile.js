const upload = document.querySelector(".upload");

var imagePaths = [];

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
        devices: devices,

        storageImgs: imagePaths,
    }

    function handleThen (docRef) {
        alert("The videogame was upload ")
        upload.title.value = '';
        upload.shortDescription.value = '';
        upload.description.value = '';
        upload.genre.value = '';
        upload.features.value = '';
        upload.lastPrice.value = '';
        upload.newPrice.value = '';
        upload.coverImg.value = '';
        upload.cardImg.value = '';
        upload.RefImg.value = '';
        upload.RefImg.value = '';

        for (let item of inputsDevices){
            item.checked = false;
        }

        imagePaths = []; 
    }
    
    function handleCatch (error) {
        console.error("Error adding document: ", error);
    }

    productsRef
    .add(newProduct)
    .then(handleThen)
    .catch(handleCatch);

});

const imgsInputs = upload.querySelectorAll('.inputImg');

imgsInputs.forEach(function(input, index) {
  
  input.addEventListener('change', function () {
  
    // Create a reference to 'mountains.jpg'
    var newImageRef = storageRef.child(`products/${input.name}${Math.floor(Math.random()*999999999)}.jpg`);
  
    var file = input.files[0]; // use the Blob or File API
  
    newImageRef.put(file).then(function(snapshot) {
      console.log('Uploaded a blob or file!');
      imagePaths.push(snapshot.metadata.fullPath);
    });
    
  });


});

const fileMulti = document.querySelector('.inputImg--Multi');
fileMulti.addEventListener('change', function() {

  Array.from(fileMulti.files).forEach(function(file, index) {

    console.log(file);
    var newImageRef = storageRef.child(`products/${fileMulti.name}${Math.floor(Math.random()*999999999)}.jpg`);

    newImageRef.put(file).then(function(snapshot) {
      console.log(snapshot)
      console.log('Uploaded a blob or file!');
      imagePaths.push(snapshot.metadata.fullPath);
    });
  });
});


