import React from "react";
import "./App.css";
import { auth, db } from "./firebase/init";
import { collection, addDoc } from "firebase/firestore";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import { BrowserRouter as Router,} from "react-router-dom";
import Nav from "./componants/Nav.jsx";
import { useState, useEffect } from "react";

function App() {
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);
  const hideBtns = document.querySelectorAll(".sign-in--btn")
  const hideUsers = document.querySelectorAll(".display-user")

  function createPost() {
    const post = {
      title: "Land a 400k job",
      description: "Finish FES",
    };
    addDoc(collection(db, "posts"), post)
  }
 

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setLoading(false);
      if (user) {
        setUser(user);
      }
    });
  }, []);

  function hideSignIn() {
    hideBtns.forEach((hideBtn) => {
      hideBtn.classList.add("hide")
    })
    hideUsers.forEach((hideUser) => {
      hideUser.classList.remove("hide")
    })
  }

  function register() {
    createUserWithEmailAndPassword(auth, "email@email.com", "test123")
      .then((user) => {
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function login(hideUsers) {
    signInWithEmailAndPassword(auth, "email@email.com", "test123")
      .then(({ user }) => {
        setUser(user);
        hideSignIn()
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function logout() {
    signOut(auth);
    setUser({});
    hideBtns.forEach((hideBtn) => {
      hideBtn.classList.remove("hide")
    })
    hideUsers.forEach((hideUser) => {
      hideUser.classList.add("hide")
    })
  }

  return (
    <Router>
      <div className="App">
        <Nav
          register={register}
          login={login}
          logout={logout}
          loading={loading}
          user={user}
        />
      </div>
    </Router>
  );
}

export default App;
