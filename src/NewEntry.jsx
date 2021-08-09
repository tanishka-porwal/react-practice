import React from 'react'

const NewEntry = ({setUniversityName, setJobTitle, setEmployerName}) => {
    return (
        <div>
        <input type="text" placeholder= "Enter University name" onChange = {e => setUniversityName(e.target.value)}/>
        {/* <input type="text" placeholder= "Enter Specialization " onChange = {e => setSpecialization(e.target.value)}/>
        <input type="text" placeholder= "Enter Grad year " onChange = {e => setGraduationYear(e.target.value)}/> */}
        <input type="text" placeholder= "Enter Employer name" onChange = {e => setEmployerName(e.target.value)}/>
        <input type="text" placeholder= "Enter Job Title " onChange = {e => setJobTitle(e.target.value)}/>
        {/* <input type="text" placeholder= "Enter Job start date " onChange = {e => setJobStartDate(e.target.value)}/>
        <input type="text" placeholder= "Enter career url" onChange = {e => setCareerURL(e.target.value)}/> */}
      </div>
        
    )
}
NewEntry.propTypes = {

}

export default NewEntry
