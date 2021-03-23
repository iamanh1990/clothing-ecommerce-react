import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
  apiKey: 'AIzaSyB7CnKYtkaHMzJjwcrWc-ERBswVwqe1ZbQ',
  authDomain: 'clothing-ecommerce-2a70b.firebaseapp.com',
  projectId: 'clothing-ecommerce-2a70b',
  storageBucket: 'clothing-ecommerce-2a70b.appspot.com',
  messagingSenderId: '730341188154',
  appId: '1:730341188154:web:b55c91247707f187f0cb03',
  measurementId: 'G-Y5MPNCCHLN',
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

//create new user in firebase
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
      console.log('error creating user', error.message);
    }
  }
  return userRef;
};

//google provider
export const googleProvider = new firebase.auth.GoogleAuthProvider();
googleProvider.setCustomParameters({
  prompt: 'select_account',
});

//sign in with google popup
export const signInWithGoogle = () => auth.signInWithPopup(googleProvider);

//to update the data from app to firestore
export const addCollectionAndDocuments = async (
  collectionKey,
  objectsToAdd
) => {
  const collectionRef = firestore.collection(collectionKey);
  const batch = firestore.batch();
  objectsToAdd.forEach((obj) => {
    const newDocRef = collectionRef.doc();
    batch.set(newDocRef, obj);
  });
  return await batch.commit();
};

//Helper func to transform snapshot docs into needed format
export const convertCollectionsSnapshotToMap = (collections) => {
  const transformedCollections = collections.docs.map((doc) => {
    const { title, items } = doc.data();
    return {
      routeName: encodeURI(title.toLowerCase()),
      id: doc.id,
      title,
      items,
    };
  });

  return transformedCollections.reduce((accumulator, collection) => {
    accumulator[collection.title.toLowerCase()] = collection;
    return accumulator;
  }, {});
};

//get current user logged in from database
export const getCurrentUser = () => {
  return new Promise((resolve, reject) => {
    const unsubscribe = auth.onAuthStateChanged((userAuth) => {
      unsubscribe(); // stop listening to Auth state change
      resolve(userAuth);
    }, reject);
  });
};

export default firebase;
