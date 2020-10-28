  
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
    console.log(error);

    alert(error.message);
    //login.querySelector('.form__error').classList.remove('hidden');
    // ...
  });
});