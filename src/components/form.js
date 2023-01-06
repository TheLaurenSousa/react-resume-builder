import React, {useState} from 'react';
import '../App.css';

const Form = (props) => {
    const [ jobList, setJobList ] = props.jobList;
    const [ employerName, setEmployerName ] = useState('');
    const [ jobTitle, setJobTitle ] = useState('');
    const [ rating, setRating ] = useState('');
    const [ startDate, setStartDate ] = useState('');
    const [ endDate, setEndDate ] = useState('');
    const date = new Date();
    const currentDate = date.getTime(); 
    const [ error, setError ] = useState('');

    const submitHandler = e => {
        e.preventDefault();
        const startDateFormat = new Date(startDate);
        const startDateValidator = startDateFormat.getTime();
        if (!employerName || !jobTitle || !startDate ){
            setError('Make sure all required fields are completed');
        } else if (!rating || rating === "default"){
            setError("Rating must be a number between 1 and 5");
        } else if (currentDate < startDateValidator){
            setError("Start Date must be prior to today")
        } else if (endDate){
            const endDateFormat = new Date(endDate);
            const endDateValidator = endDateFormat.getTime();
            if ( endDateValidator < startDateValidator){
                setError("End Date must be after Start Date");
            } else {
                setJobList([...jobList, {employerName: employerName, jobTitle: jobTitle, rating: rating, startDate: startDate, endDate: endDate}]);
                clearFields();
            }
        }else {
            setJobList([...jobList, {employerName: employerName, jobTitle: jobTitle, rating: rating, startDate: startDate, endDate: "Current"}]);
            clearFields();
        }
    }

    const clearFields = () => {
        setEmployerName('');
        setJobTitle('');
        setRating('');
        setStartDate('');
        setEndDate('');
        setError('');
    }


    return (
        <form onSubmit={submitHandler}>
            {
                error ? 
                <p id='error'>{error}</p> : ''
            }
            <p id='inputField'>
                <label>Employer Name:* </label>
                <input type='text' name='employerName' value={employerName} onChange={(e) => setEmployerName(e.target.value)}/>
            </p>
            <p id='inputField'>
                <label>Job Title:* </label>
                <input type='text' name='jobTitle' value={jobTitle} onChange={(e) => setJobTitle(e.target.value)}/>
            </p>
            <p id='inputField'>
                <label>Rating:* </label>
                <select name='Rating' value={rating} onChange={(e) => setRating(e.target.value)}>
                    <option value='default'>---</option>
                    <option value='1'>1</option>
                    <option value='2'>2</option>
                    <option value='3'>3</option>
                    <option value='4'>4</option>
                    <option value='5'>5</option>
                </select>
            </p>
            <p id='inputField'>
                <label>Start Date:* </label>
                <input type='date' name='startDate' value={startDate} onChange={(e) => setStartDate(e.target.value)}/>
            </p>
            <p id='inputField'>
                <label>End Date: </label>
                <input type='date' name='endDate' value={endDate} onChange={(e) => setEndDate(e.target.value)}/>
            </p>
            <p id='submit'>
                <input type='submit' value="Submit"/>
            </p>
            <p id="info">* fields are required</p>
        </form>
    )
}

export default Form;