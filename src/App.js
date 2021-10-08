import { addDoc, collection, query, onSnapshot, doc, deleteDoc } from "firebase/firestore";
import './App.css';
import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import Button from "@mui/material/Button";
import { TextField } from '@mui/material';
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"
import IconButton from '@mui/material/IconButton';
import DenseAppBar from "./components/Navbar";
import DeleteIcon from '@mui/icons-material/Delete';




//Details of API
const firebaseConfig = {
  apiKey: "AIzaSyAT6J2QUlILZN8uQMwzWjcUSHt55i7Pq6E",
  authDomain: "todo-app-react-task.firebaseapp.com",
  projectId: "todo-app-react-task",
  storageBucket: "todo-app-react-task.appspot.com",
  messagingSenderId: "931158328108",
  appId: "1:931158328108:web:2a959dad61011859c6e289",
  measurementId: "G-9JHP2WFWBT"
};



// Initialize Firebase
initializeApp(firebaseConfig);

//Handler For API
const db = getFirestore();



//onsubmit function
async function submit(values) {
  console.log("values", values)

  try {
    const docRef = await addDoc(collection(db, "ToDolist"), {
      item: values.item,

    });
    console.log("Document written with ID: ", docRef.id);
  } catch (e) {
    console.error("Error adding document: ", e);
  }

}


//validation schema 
const validationSchema = yup.object({
  item: yup
    .string('Enter your item')
    .min(3, 'item should be of minimum 3 characters length')
    .required('item is required'),
});


async function del(id) {
  await deleteDoc(doc(collection(db, "ToDolist"), id));
}




function App() {

  const [Data, setData] = useState([])

  useEffect(() => {

    const q = query(collection(db, "ToDolist"));
    const unsubscribe = onSnapshot(q, (snapshot) => {

      let temp = [];
      snapshot.forEach((doc) => {

        let id = doc.id;
        let data = doc.data();

        temp.unshift({
          id: id,
          item: data.item,
        });
      })
      setData(temp)
    });

    return () => {
      unsubscribe()
      console.log("unsub")
    };
  }, []);



  //getting data in object
  const formik = useFormik({
    validationSchema: validationSchema,
    initialValues: {
      item: '',
    },
    onSubmit: submit
  },
  );


  return (
    <>
    <DenseAppBar/>
      <div className="container">

        <div className="main">


          <form onSubmit={formik.handleSubmit}>

            <TextField
              id="outlined-basic"
              name="item"
              label="item"
              className="box"
              value={formik.values.item}
              onChange={formik.handleChange}

              error={formik.touched.item && Boolean(formik.errors.item)}
              helperText={formik.touched.item && formik.errors.item}


              variant="outlined" />

            <Button id="btn" variant="contained" color="primary" type="submit">
              +
            </Button>

          </form>



          <div className="item">
            {Data.map((eachUser, i) => {

              return (<div key={i}>

                <div id="cont">

                  <li>{eachUser.item}</li>

                  <IconButton aria-label="delete" className="delbtn" size="small">
                    <DeleteIcon className="delicon" onClick={() => { del(eachUser.id) }} />
                  </IconButton>

                </div>
                <br />
              </div>)
            })}
          </div>

        </div>
      </div>
    </>
  );
}

export default App;

