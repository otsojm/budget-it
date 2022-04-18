import { API_KEY, AUTH_DOMAIN, DATABASE_URL, PROJECT_ID, STORAGE_BUCKET, MESSAGING_SENDER_ID, APP_ID } from "@env";
import { initializeApp } from "firebase/app";
import { getDatabase, push, ref as refDatabase, onValue, remove } from 'firebase/database';
import { getStorage, ref, uploadBytes, deleteObject } from "firebase/storage";

/* Web app's Firebase configuration. */
const firebaseConfig = {
    apiKey: API_KEY,
    authDomain: AUTH_DOMAIN,
    databaseURL: DATABASE_URL,
    projectId: PROJECT_ID,
    storageBucket: STORAGE_BUCKET,
    messagingSenderId: MESSAGING_SENDER_ID,
    appId: APP_ID
};

/* Initialize Firebase. */
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const storage = getStorage();

/* Return texts from Firebase. */
const returnText = () => {
    const databaseRef = refDatabase(database, 'texts');
    let items = [];
    onValue(databaseRef, (snapshot) => {
        const data = snapshot.val();
        if (data !== null) {
            Object.keys(data).forEach(key => {
                Object.values(data).forEach(value => {
                    items.push({ key: key, value: value.text })
                });
            });
        }
    });
    if (items.length > 0) {
        items.splice(items.length / 2, items.length / 2);
        return items;
    } else {
        return [];
    }
};

/* Delete data from Firebase. */
const deleteItem = (data, parameter) => {
    if (parameter == 'photo') {
        const storageRef = ref(storage, 'images/' + data.split("images%2F")[1].split("?alt")[0]);
        deleteObject(storageRef).then(() => {
            console.log('Photo deleted!');
        });
    } else if (parameter == 'text') {
        remove(
            refDatabase(database, 'texts/' + data.key)
        ).then(() => {
            console.log('Text deleted!')
        });
    }
};

/* Push String type data to Firebase. */
const uploadText = (data) => {
    push(
        refDatabase(database, 'texts/'),
        { 'text': data });
};

/* Push Expense data to Firebase. */
const uploadExpense = (selectedValue, description, amount) => {
    push(
        refDatabase(database, 'expense/'),
        { 'name': selectedValue, 'description': description, 'amount': amount });
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

module.exports = { returnText, uploadImage, uploadText, uploadExpense, uploadIncome, uploadSound, deleteItem };
