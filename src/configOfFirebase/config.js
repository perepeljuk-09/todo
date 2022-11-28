import {initializeApp} from "firebase/app";
import {collection, getFirestore} from "firebase/firestore";
import {getStorage} from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyAW4rA3kLZHOFdw23kcus7AfOMmIUrfyQA",
    authDomain: "todo-react-15a2a.firebaseapp.com",
    projectId: "todo-react-15a2a",
    storageBucket: "todo-react-15a2a.appspot.com",
    messagingSenderId: "1051098800900",
    appId: "1:1051098800900:web:59ca4550cf9245602ce651",
    measurementId: "G-DL3ZT34S2T"
};
const app = initializeApp(firebaseConfig);
export const firestore = getFirestore(app)
export const todosRef = collection(firestore, "todos")
export const storage = getStorage(app)