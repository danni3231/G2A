const signUp = document.querySelector('.signUp');

signUp.addEventListener('submit', function (event) {
  event.preventDefault();

  const email = signUp.email.value;
  const password = signUp.password.value;
  const username = signUp.username.value;
  
  firebase.auth().createUserWithEmailAndPassword(email, password)
  .then(function (credentials) {

    const uid = credentials.user.uid;

    usersRef.doc(uid).set({
      email: email,
      username: username,
    })
    .then(function () {
      window.location.href = 'index.html';
    });


  })
  .catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    console.log(error)
    alert(errorMessage);
  });
  
});
