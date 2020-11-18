const profileIn = document.querySelector('.profile__in');
const profileOut = document.querySelector('.profile__out');
const usernames = document.querySelectorAll('.username');
const email = document.querySelector('.email');
const profileLogOut = document.querySelector('.profile__logOut');

const uploadAuth = document.querySelector(".profile__form");

var userinfo;

firebase.auth().onAuthStateChanged(function (user) {
  if (user) {
    // si el usuario existe quiere decir que inició sesión, se registró o ya tenía sesión iniciada
    profileIn.classList.remove('hidden');
    profileOut.classList.add('hidden');

    usersRef.doc(user.uid).get().then(function (doc) {
      if (doc.exists) {
        const data = doc.data();
        userinfo = data;

        if (email) {
          email.innerText = data.email;
        }

        for (const username of usernames) {
          username.innerText = data.username;
        }

        console.log(uploadAuth);
        if(uploadAuth && data.admin){
          uploadAuth.classList.remove('hidden');
        }
      }
    });

  } else {
    // si no existe quiere decir que no ha iniciado sesión o acaba de cerrar sesión
    profileIn.classList.add('hidden');
    profileOut.classList.remove('hidden');
  }
});

// cerrar sesión

profileLogOut.addEventListener('click', function (event) {
  event.preventDefault();
  firebase.auth().signOut();
});
