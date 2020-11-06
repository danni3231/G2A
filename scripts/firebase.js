var firebaseConfig = {
    apiKey: "AIzaSyBZTfiYmODgxwBvuAz7Tc2vDqKR98Bcllg",
    authDomain: "g2a-54426.firebaseapp.com",
    databaseURL: "https://g2a-54426.firebaseio.com",
    projectId: "g2a-54426",
    storageBucket: "g2a-54426.appspot.com",
    messagingSenderId: "235301313566",
    appId: "1:235301313566:web:76e109bcd728b79124e20f",
    measurementId: "G-384WRHBQR9"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  const db = firebase.firestore();
  const usersRef = db.collection('users');
  const productsRef = db.collection('products');
  var storageRef = firebase.storage().ref();