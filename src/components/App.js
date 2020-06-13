import React, { Component } from 'react'; 
import firebase, { functions } from 'firebase/app';
import 'firebase/firestore';
import config from '../config/firebase-config';
import Header from "./Header";
import TextField  from './Textfield';

function App() {
  firebase.initializeApp(config);
  return (
    <div>
      <Header />
      <TextField />
    </div>
  );
}
export default App;