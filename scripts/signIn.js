  
const signIn = document.querySelector('.signIn');

signIn.addEventListener('submit', function (event) {
  event.preventDefault();

  const email = signIn.email.value;
  const password = signIn.password.value;

  firebase.auth().signInWithEmailAndPassword(email, password)
  .then(function () {

    window.location.href = 'index.html';

  })
  .catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    console.log(error)
    alert(errorMessage);
  });
});