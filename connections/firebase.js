import { API_URL, APIKEY, AUTHDOMAIN, DATABASEURL, PROJECTID, STORAGEBUCKET, MESSAGINGSENDERID, APPID } from "@env";
import { initializeApp } from "firebase/app";
import { getDatabase, push, ref as refDatabase, onValue } from 'firebase/database';
import { getStorage, ref, uploadBytes } from "firebase/storage";

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

/* Push String type data to Firebase. */
const saveItem = (data) => {
    push(
        refDatabase(database, 'items/'),
        { 'product': data, 'amount': 1 });
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

module.exports = uploadImage;
