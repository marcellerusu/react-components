import {useState, useEffect} from 'react';
import firebase from "firebase/app";
import 'firebase/storage';
import 'firebase/firestore';
import 'firebase/auth';

// firebase.initializeApp(firebaseConfig);

export const db = firebase.firestore();

export const storage = firebase.storage();

// Promise<{url: string}>
export const uploadImage = image => {
  const uploadTask = storage.ref(`images/${image.name}`).put(image);
  return new Promise((res, rej) => {
    uploadTask.on(
      'state_changed',
      snapshot => {},
      error => rej(error),
      async () => {
        res(storage
          .ref("images")
          .child(image.name)
          .getDownloadURL());
      }
    )
  })
};


// const [posts] = useCollection('blog');
export const useCollection = (collectionRef) => {
  const collection = db.collection(collectionRef);
  const [items, setItems] = useState([]);
  const getData = () => {
    const unsubscribe = collection.onSnapshot(res => {
      let data = [];
      res.forEach(item => { // res is not an array
        data.push(({...item.data(), id: item.id}));
      });
      setItems(data);
    });
    return () => unsubscribe();
  };
  useEffect(getData, []); // TODO: might need to add back currentUser as a watch param
  const addItem = item => collection.add(item).then(getData);
  const removeItem = id => collection.doc(id).delete().then(getData);
  const updateItem = (id, newData, bulk = false) =>
    collection.doc(id).update(newData).then(() => {
      if (!bulk) getData();
    });

  return [items, addItem, removeItem, updateItem];
}

export const useItem = (collectionRef, itemRef, transform) => {
  const currentUser = firebase.auth().currentUser;

  const [item, setItem] = useState(null);
  const get = () => {
    const unsubscribe = db.collection(collectionRef)
      .doc(itemRef)
      .onSnapshot(item => setItem(transform(item)));
    return () => unsubscribe();
  };
  const update = newData => db.collection(collectionRef).doc(itemRef).update(newData).then(get);
  
  useEffect(get, [currentUser]);
  return [item, update];
}