import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const config = {
  apiKey: "AIzaSyB7CnKYtkaHMzJjwcrWc-ERBswVwqe1ZbQ",
  authDomain: "clothing-ecommerce-2a70b.firebaseapp.com",
  projectId: "clothing-ecommerce-2a70b",
  storageBucket: "clothing-ecommerce-2a70b.appspot.com",
  messagingSenderId: "730341188154",
  appId: "1:730341188154:web:b55c91247707f187f0cb03",
  measurementId: "G-Y5MPNCCHLN",
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

export const createUserProfileDocument = async (userAuth, optionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...optionalData,
      });
    } catch (error) {
      console.log("error creating user", error.message);
    }
  }
  return userRef;
};

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({
  prompt: "select_account",
});

export const signInWithGoogle = () => auth.signInWithPopup(provider);
export default firebase;
