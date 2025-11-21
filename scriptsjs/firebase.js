
    // Importa los módulos necesarios de Firebase
    import { initializeApp } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-app.js";
    import { getFirestore, collection, addDoc } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-firestore.js";

    // Tu objeto de configuración de Firebase (EL QUE COPIASTE DEL PASO 3)
const firebaseConfig = {
  apiKey: "AIzaSyDBQLMd7MWVI2IPz96oMt2YbK30oXuu0mA",
  authDomain: "tenis-9ae6b.firebaseapp.com",
  projectId: "tenis-9ae6b",
  storageBucket: "tenis-9ae6b.firebasestorage.app",
  messagingSenderId: "103861083118",
  appId: "1:103861083118:web:1a7657358306bcaeeb4cff"
};

    // Inicializa Firebase
    const app = initializeApp(firebaseConfig);
    // Inicializa Cloud Firestore
    const db = getFirestore(app);

    // Hace que 'db' sea accesible globalmente o pásalo a tu modal.js
    window.db = db; // Esta es una forma sencilla para empezar
    window.collection = collection;
    window.addDoc = addDoc;
 
