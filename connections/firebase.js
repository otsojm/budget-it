import { API_URL, APIKEY, AUTHDOMAIN, DATABASEURL, PROJECTID, STORAGEBUCKET, MESSAGINGSENDERID, APPID } from "@env";
import { initializeApp } from "firebase/app";
import { getDatabase, push, ref as refDatabase, onValue } from 'firebase/database';
import { getStorage, ref, uploadBytes, deleteObject } from "firebase/storage";

/* Web app's Firebase configuration. */
const firebaseConfig = {
    apiKey: APIKEY,
    authDomain: AUTHDOMAIN,
    databaseURL: DATABASEURL,
    projectId: PROJECTID,
    storageBucket: STORAGEBUCKET,
    messagingSenderId: MESSAGINGSENDERID,
    appId: APPID
};

/* Initialize Firebase. */
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const storage = getStorage();

/* Delete data from Firebase. */
const deleteItem = (data) => {
    console.log(data.split("images%2F")[1].split("?alt")[0]);

    const storageRef = ref(storage, 'images/' + data.split("images%2F")[1].split("?alt")[0]);

    deleteObject(storageRef).then(() => {
        console.log('Data deleted!');
    });
};

/* Push String type data to Firebase. */
const uploadText = (data) => {
    push(
        refDatabase(database, 'items/'),
        { 'product': data, 'amount': 1 });
};

/* Push Expense data to Firebase. */
const uploadExpense = (selectedValue, amount) => {
    push(
        refDatabase(database, 'expense/'),
        { 'name': selectedValue, 'amount': amount });
};

/* Push Income data to Firebase. */
const uploadIncome = (selectedValue, amount) => {
    push(
        refDatabase(database, 'income/'),
        { 'name': selectedValue, 'amount': amount });
};

/* Push Sound type data to Firebase. */
const uploadSound = (data) => {
    /*
     push(
         refDatabase(database, 'items/'),
         { 'product': data, 'amount': 1 });
         */
};

/* Push Image type data to Firebase. */
const uploadImage = async (uri) => {
    const response = await fetch(uri);
    const blob = await response.blob();

    const time = Date.now().toString();

    const storageRef = ref(storage, 'images/' + time);

    uploadBytes(storageRef, blob).then((snapshot) => {
        console.log('Uploaded a blob or file!');
    });
}

module.exports = { uploadImage, uploadText, uploadExpense, uploadIncome, uploadSound, deleteItem };
