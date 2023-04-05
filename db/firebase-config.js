import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
	apiKey: "AIzaSyCY6Ei_cTtM6WT1bf_quHOULSxhlydePTA",
	authDomain: "ecommerce-724a2.firebaseapp.com",
	projectId: "ecommerce-724a2",
	storageBucket: "ecommerce-724a2.appspot.com",
	messagingSenderId: "163111198420",
	appId: "1:163111198420:web:8f2c1b5d57e60b08aea541",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
export default db;
