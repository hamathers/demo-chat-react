import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route } from "react-router-dom";
import DashboardComponent from "./dashboard/dashboard";
import "./index.css";
import LoginComponent from "./login/login";
import * as serviceWorker from "./serviceWorker";
import SignupComponent from "./signup/signup";

const firebase = require("firebase");
require("firebase/firestore");

firebase.initializeApp({
  apiKey: "AIzaSyAw4Z1ohHdwpg6qTwQJNHZVolZXjIE5CMc",
  authDomain: "notereactjs-havh.firebaseapp.com",
  databaseURL: "https://notereactjs-havh.firebaseio.com",
  projectId: "notereactjs-havh",
  storageBucket: "notereactjs-havh.appspot.com",
  messagingSenderId: "1045777364818",
  appId: "1:1045777364818:web:7069d916e02de84f47ac8b",
});

const routing = (
  <Router>
    <div id="routing-container">
      <Route path="/login" component={LoginComponent}></Route>
      <Route path="/signup" component={SignupComponent}></Route>
      <Route path="/" exact component={DashboardComponent}></Route>
    </div>
  </Router>
);

ReactDOM.render(routing, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
