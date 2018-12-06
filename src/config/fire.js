import firebase from 'firebase';

  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyDYeMr6sCTYxY4dYr7j8gRNkt_6o3is7qg",
    authDomain: "photo-app-105d0.firebaseapp.com",
    databaseURL: "https://photo-app-105d0.firebaseio.com",
    projectId: "photo-app-105d0",
    storageBucket: "photo-app-105d0.appspot.com",
    messagingSenderId: "1044100414525"
  };
  const fire = firebase.initializeApp(config);
  export default fire;