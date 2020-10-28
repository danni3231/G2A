const profileIn = document.querySelector('.profile__in');
const profileOut = document.querySelector('.profile__out');
const authSignout = document.querySelector('.profile__signout');
const username = document.querySelector('.username')

firebase.auth().onAuthStateChanged(function(user) {
  if(user) {
    // si el usuario existe quiere decir que inició sesión, se registró o ya tenía sesión iniciada
    profileIn.classList.remove('hidden');
    profileOut.classList.add('hidden');


    usersRef.doc(user.uid).get().then(function (doc) {
      if(doc.exists) {
        const data = doc.data();
        username.innerText = data.username;
      }
    });
  } else {
    // si no existe quiere decir que no ha iniciado sesión o acaba de cerrar sesión
    profileIn.classList.add('hidden');
    profileOut.classList.remove('hidden');
  }
});

// cerrar sesión
/*
authSignout.addEventListener('click', function(event) {
  event.preventDefault();
  firebase.auth().signOut();
});
*/