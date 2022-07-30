import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth";
import './App.css'
import { auth, db } from "./firebase/init";
import React, {useEffect} from "react";
import {collection, addDoc, getDoc, doc, query, where, getDocs, updateDoc, deleteDoc, } from "firebase/firestore"

function App() {
  const [user, setUser] = React.useState({})
  const [loading, setLoading] = React.useState(true)

  function createPost(){
    const post = {
      title: "ewffewfewfewfewfewwe",
      description: "wefwefwefwefewfwefwe",
      uid: user.uid, 

    }
    addDoc(collection(db, "posts"), post)
  }

  async function updatePost(){
    const hardcodedId = "hhTZiDmsl5OvWcGEpgEV" 
    const postRef = doc(db, "posts", hardcodedId)
    const post = await getPostsById(hardcodedId)
    const newpost = {
      description:'fdkepfkwedew',
      uid: "1",
      title: "defe"
    }
    updateDoc(postRef, newpost)
  }


  async function getAllPosts(){
    const {docs} = await getDocs(collection(db, "posts"))
    const posts = docs.map(elem => ({...elem.data(), id: elem.id}))

  }

  function deletePost(){
    const hardcodedId = "hhTZiDmsl5OvWcGEpgEV" 
    const postRef = doc(db, "posts", hardcodedId)
    deleteDoc(postRef)
  }

  async function getPostsById(id){
    const postRef = doc(db, "posts", id)
    const postSnap = await getDoc(postRef)
    return postSnap.data()
  }

  async function getpostbyuid(){
    const postCollectionRef = await query(collection(db, "posts"),
    where("uid" , "==", user.uid))
    const {docs} = await getDocs(postCollectionRef)
  }

  function register(){
    createUserWithEmailAndPassword(auth, "Test123@gmail.com", "password123")
    .then((user => {
      console.log(user)
    }))
    .catch((error => {
      console.log(error)
    }))
  }

  React.useEffect(()=> {
    setLoading(false)
    onAuthStateChanged(auth, (user)=> {
      if(user){
        setUser(user)
      }
    })
  }, [])

  function login(){
    signInWithEmailAndPassword(auth, "Test123@gmail.com", "password123")
    .then(({user}) => {
      setUser(user)
    })
    .catch((error => {
      console.log(error)
    }))
  }

  function logout(){
    signOut(auth)
    setUser({})

  }

  return(
    <div className="App">
      <button onClick={register}>Register</button>
      <button onClick={login}>Login</button>
      <button onClick={logout}>Logout</button>
      {loading ? "loading..." : user.email}
      <button onClick={createPost}> Create Post </button> 
      <button onClick={getAllPosts}> Get All Posts </button> 
      <button onClick={getPostsById}> Get Posts By Id </button> 
      <button onClick={getpostbyuid}> Get Posts By UId </button> 
      <button onClick={updatePost}> Update Post </button> 
      <button onClick={deletePost}> Delete Post </button> 
    </div>
  )
}

export default App