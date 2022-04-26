// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase, ref as dbref, child, get } from "firebase/database";
import { getStorage, ref as stref, getDownloadURL} from "firebase/storage";
// add to database: set(reference, { });

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAXKoNYyn21YUqkwS49y6wJh36j_dXOQX0",
  authDomain: "fakenstein-239a1.firebaseapp.com",
  databaseURL: "https://fakenstein-239a1-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "fakenstein-239a1",
  storageBucket: "fakenstein-239a1.appspot.com",
  messagingSenderId: "836509721271",
  appId: "1:836509721271:web:577c48cd531d3875a62332",
  measurementId: "G-5YLHP0L15D"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Get a reference to the database service
const database = getDatabase(app);
const reference = dbref(database);

// Get a reference to the storage service, which is used to create references in your storage bucket
const storage = getStorage(app);

//renderFaces('female', 'old', 'dark');
export function renderFaces(gender: string, age: string, skinColor: string) {
  get(child(reference, gender + '/' + age + '/' + skinColor)).then((snapshot) => {
    if (snapshot.exists()) {
      console.log(snapshot.val());
      //[empty, 'DSC01200.JPG']
      const results = snapshot.val();
      // select first answer
      console.log(results[1]);
      getDownloadURL(stref(storage, 'images/' + results[1]))
          .then((url) => {
            // `url` is the download URL for 'images/stars.jpg'
            const img = document.getElementById('myimg');
            img?.setAttribute('src', url);
            console.log(url);

          })
          .catch((error) => {
            // Handle any errors
            switch (error.code) {
              case 'storage/object-not-found':
                alert('File doesn\'t exist');
                break;
              case 'storage/unauthorized':
                alert("User doesn't have permission to access the object");
                break;
              case 'storage/canceled':
                alert("User canceled the upload");
                break;
              case 'storage/unknown':
                alert("Unknown error occurred, inspect the server response");
                break;
            }
          });
    } else {
      console.log("No data available");
    }
  }).catch((error) => {
    console.error(error);
  });
}

