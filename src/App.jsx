import React from 'react'
import { useState, useEffect } from 'react';
import './App.css';
import ImageCounter from './ImageCounter';
import Card from './Card.jsx';
//import importedData from './Student_Data.json';
import CircularProgress from '@material-ui/core/CircularProgress';
import './App.css'
import { v4 as uuidv4 } from 'uuid';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import NewEntry from './NewEntry';
import axios from 'axios';


// const imgArray = [
//  `https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=750&q=80`,
// `https://images.unsplash.com/photo-1470181942237-78ce33fec141?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=750&q=80`,
// `https://images.unsplash.com/photo-1470082719408-b2843ab5c9ab?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=891&q=80`
// ]

function App() {
  const[favs, setFavs] = useState([])
  const [delData, setDeletedData] = useState([])

  const [universityName, setUniversityName] = useState("")
  const [specialization, setSpecialization] = useState("")
  const [gradYear, setGraduationYear] = useState("")
  const [employerName, setEmployerName] = useState("")
  const [jobTitle, setJobTitle] = useState("")
  const [jobStartDate, setJobStartDate] = useState("")
  const [careerURL, setCareerURL] = useState("")

  const [data, setData] = useState([]) 
  const [isLoading, setIsLoading] = useState(true)

  const [posts, setPosts] = useState([])
  const [isPostsLoading, setIsPostsLoading] = useState(true)

  const [history, setHistory] = useState([])
  const [isHistoryLoading, setIsHistoryLoading] = useState(true)


  // useEffect(() => {
  //   let myData = [...importedData]
  //   myData = myData.map(i => {
  //     return {...i, id:uuidv4()}
  //   })
  //    setData(myData)
  // }, [])

  useEffect(() => {

    axios.get("http://localhost:4200/getAllEntries")
    .then(resp => {
      setIsLoading(false)
      setData(resp.data)
    })
    .catch(e => setIsLoading(false))
  }, [])


  useEffect(() => {

    axios.get("http://localhost:4200/getPosts")
    .then(resp => {
      setIsPostsLoading(false)
      setPosts(resp.data)
      console.log(resp, "resp")
    })
    .catch(e => setIsPostsLoading(false))
  }, [])


  useEffect(() => {

    axios.get("http://localhost:4200/getSpaceXHistory")
    .then(resp => {
      setIsHistoryLoading(false)
      setHistory(resp.data)
      console.log(resp, "resp")
    })
    .catch(e => setIsHistoryLoading(false))
  }, [])



  
  
  function displayFavorite(employerName) {
    //first favs is empty we copy it in new array amd them copy the new one to the favs back
    let copyFavs = [...favs]
    if(!copyFavs.includes(employerName)){
      copyFavs.push(employerName)
      setFavs(copyFavs)
    }
  }
  
  function displayUnFavorite(employerName) {
    let copyFavs = [...favs]
    //filter
    // const removed = favs.filter(i => i !== employerName)
    // setFavs(removed)

    //splice
    if(copyFavs.includes(employerName)){
      copyFavs.splice(copyFavs.indexOf(employerName), 1)
      setFavs(copyFavs)
    }  
  }

  function disableButton(employerName){
    //if employerName exists return true else return false
    if(favs.includes(employerName)) return true
  }

  function disableUnFavButton(employerName){
    if(! favs.includes(employerName)) return true
  }

  function deleteItem(id){
    //delete whole item
    const deleted = data.filter(i => i.id !== id)
    setData(deleted)

    //get deleted data
    const showDeleted = data.filter(i => i.id === id)
    setDeletedData(delData.concat(showDeleted))  
  }

  function addNewObject(e){
    // e.preventDefault()
    let newObject = {
      University_Name : universityName , 
      Specialization : specialization,
      Graduation_Year :gradYear,
      Employer : employerName,
      Job_Title : jobTitle,
      Job_Start_Date : jobStartDate,
      Career_Url : careerURL,
      id: uuidv4()
    }

    const newData = [newObject, ...data]
    setData(newData)
  }
  
  let names = data.map(i=>{
    return (
      <div className="split container" key={i.id}>
      <Card 
        Employer = {i.Employer}
        University_Name = {i.University_Name}
        Job_Title = {i.Job_Title}
      />
        <button disabled = {disableButton(i.Employer)} onClick = {() => displayFavorite(i.Employer)}>Favorite</button>
        <button disabled = {disableUnFavButton(i.Employer)} onClick = {() => displayUnFavorite(i.Employer)}>UnFavorite</button>
        <button onClick = {() => deleteItem(i.id)}>Delete</button>
  
      </div>
    )
  })
  
  
  let postsDisplayed = posts.map(i=>{
    return (
      <div className="split posts" key={i.id}>
      <p>{i.title}</p>
      </div>
    )
  })

  let spaceXHistory = history.map(i => {
    return (
      <div className ="container" key = {i.id}>
        <p>{i.event_date_utc}</p>
      </div>
    )
  })

 // const [currentSlide, setCurrentSlide] = useState(0)
  
  // function handlePrev(){
  //   return currentSlide === imgArray.length -1 ? setCurrentSlide(0) : setCurrentSlide(currentSlide +1) 
  // }
  // function handleNext(){
  //   return currentSlide === 0 ? setCurrentSlide(imgArray.length -1) : setCurrentSlide(currentSlide -1)
  // }

  if(isLoading || isPostsLoading || isHistoryLoading){
    return <CircularProgress />
  }
  return (
    <div className="App">
    <Router>
      <div>
        <nav>
          <ul>
            <li><Link to="/">Home</Link></li> 
            <li><Link to="/newentry">Create New Entry</Link></li>
          </ul>
        </nav>
        <Switch>
          <Route path="/newentry">
            <NewEntry
            setUniversityName = {setUniversityName}
            setJobTitle = {setJobTitle}
            setEmployerName = {setEmployerName}
             />
          </Route>
        </Switch>
        
       {`Recently deleted items are ${delData.map(i => i.Employer).join(", ")}`}
       <br/>
       {`Your current favorite are ${favs.join(", ")}`}
       <button onClick = {(e) => addNewObject()}>Add Entry</button>
       
      {names}
      {postsDisplayed}
      {spaceXHistory}
      
      {/* <ImageCounter
      person = {{name: "Tanishka", lastName: "Porwal"}}
      myArray = {[1,2,3]} /> */}
      {/* <img src = {imgArray[currentSlide]}></img>
      <button  onClick = {() => handlePrev()}>Prev</button>
      <button  onClick = {() => handleNext()}>Next</button>  */}
    </div>
    </Router>
    </div>
  );
}

export default App;
