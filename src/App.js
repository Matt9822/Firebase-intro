import React from "react";
import "./App.css";
import { auth, db } from "./firebase/init";
import {
  collection,
  addDoc,
  getDocs,
  getDoc,
  doc,
  query,
  where,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import { BrowserRouter as Router } from "react-router-dom";
import Nav from "./componants/Nav.jsx";
import { useState, useEffect } from "react";


function App() {
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);
  const hideBtns = document.querySelectorAll(".sign-in--btn");
  const hideUsers = document.querySelectorAll(".display-user");
  
  async function updatePost() {
    const hardCodedId = "3H66ToXxUhj9lk1bjcxa";
    const postRef = doc(db, "posts", hardCodedId);
    const post = await getPostById(hardCodedId)
    console.log(post)
    const newPost = {
      ...post,
      title: "Get a cute Girlfriend"
    }
    console.log(newPost)
    updateDoc(postRef, newPost);
  }

  function deletePost() {
    const hardCodedId = "3H66ToXxUhj9lk1bjcxa";
    const postRef = doc(db, "posts", hardCodedId);
    deleteDoc(postRef)
  }

  function createPost() {
    const post = {
      title: "finish interveiw section",
      description: "Finish React section",
      uid: user.uid,
    };
    addDoc(collection(db, "posts"), post);
  }

  async function getAllPosts() {
    const { docs } = await getDocs(collection(db, "posts"));

    /**
     * .data is given to us by "firebase" and converts the data array into javascript.
     * The spred oparator "...post.data" is being used to create a copy of the data array
     * and then "id: data.id" is adding an ID to all posts in the new data array
     * And the ID will match the ID that it was given in the "Firebase" data section.
     * You then can use that ID to call that post specifically to then edit how you want
     */
    const posts = docs.map((post) => ({ ...post.data(), id: post.id }));
    console.log(posts);
  }

  async function getPostById(id) {
    const postRef = doc(db, "posts", id);
    const postSnap = await getDoc(postRef);
    if (postSnap.exists) {
      return postSnap.data();
    }
  }

  async function getPostsByUid() {
    const postCollectionRef = await query(
      collection(db, "posts"),
      where("uid", "==", "3")
    );
    const { docs } = await getDocs(postCollectionRef);
    console.log(docs.map((doc) => doc.data()));
  }

  /**
   *
   *
   *
   *
   * Sign-In section
   *
   *
   *
   *
   */

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
      hideBtn.classList.add("hide");
    });
    hideUsers.forEach((hideUser) => {
      hideUser.classList.remove("hide");
    });
  }

  function register() {
    createUserWithEmailAndPassword(auth, "email@email.com", "test123")
      .then((user) => {})
      .catch((error) => {
        console.log(error);
      });
  }

  function login(hideUsers) {
    signInWithEmailAndPassword(auth, "email@email.com", "test123")
      .then(({ user }) => {
        setUser(user);
        hideSignIn();
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function logout() {
    signOut(auth);
    setUser({});
    hideBtns.forEach((hideBtn) => {
      hideBtn.classList.remove("hide");
    });
    hideUsers.forEach((hideUser) => {
      hideUser.classList.add("hide");
    });
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
          createPost={createPost}
          getAllPosts={getAllPosts}
          getPostById={getPostById}
          getPostsByUid={getPostsByUid}
          updatePost={updatePost}
          deletePost={deletePost}
        />
      </div>
    </Router>
  );
}

export default App;
