import React from 'react';
import { useState } from 'react';

const ImageCounter = (props) => {
    // const [shouldDisplayName, setShouldDisplayName] = useState(true) //state
    // const [shouldDisplayCount, setShouldDisplayCount] = useState(false) //state to display name count
    const [currCount, setCurrCount] = useState(0)
    const [incremnetInput, setIncrementInput] = useState(0)
 
    // function lengthOfNames(){
    //     let fNameLength = props.person.name.length
    //     let lastNameLength = props.person.lastName.length

    //     return fNameLength+lastNameLength 
    // }


    return (
        <div>
            <h1>{currCount}</h1>
            {/* {
                shouldDisplayName ? <h3>{`My name is ${props.person.name} ${props.person.lastName}!`}</h3> : null
            }
            <button onClick = { () => setShouldDisplayName(false)} >Make name Disappear</button>
            <br/>
            {
                shouldDisplayCount ? lengthOfNames() : null
            } */}
            {/* to toggle we can change the state by negating the state*/}
            {/* <br/><button onClick = { () => setShouldDisplayCount(!shouldDisplayCount)} >Toggle Length</button> */}
           
            <br/><button onClick = { () => setCurrCount(currCount+1)} >Increment by 1</button>
            <br/><button onClick = { () => setCurrCount(currCount-1)} >Decrement by 1</button>

            <br/><input onChange = { (e) => setIncrementInput(parseInt(e.target.value))}></input>
            <br/><button onClick = {() => setCurrCount(currCount+ incremnetInput)} >Increment by Number</button>

            <br/><input onChange = { (e) => setIncrementInput(parseInt(e.target.value))}></input>
            <br/><button onClick = {() => setCurrCount(currCount- incremnetInput)} >Decrement by Number</button>
        
        </div>
    );
};

export default ImageCounter;
