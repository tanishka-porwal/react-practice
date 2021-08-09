import React from 'react'

const Card = (props) => {
    //destructure props here
    //const {Employer, University_Name, Job_Title} = props
    return (
        <div>
            {props.Employer}
            {props.University_Name}
            {props.Job_Title}          
        </div>
    )
}

export default Card
