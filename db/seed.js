import { collection, addDoc } from "firebase/firestore";
import db from "./firebase-config.js";
import  products  from "../products.js";

const itemsCollectionRef = collection(db, "items");

const promises = products.map(product => addDoc(itemsCollectionRef, product));

Promise.all(promises).then(() => {
    console.log("Done!")
    process.exit(0);
});

