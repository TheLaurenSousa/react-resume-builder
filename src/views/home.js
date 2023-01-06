import React, {useState} from 'react';
import '../App.css';
import Form from '../components/form';

export default () => {
    const [ jobList, setjobList ] = useState([]);

    return (
        <div className="App">
            <h1>Resume Builder</h1>
            <Form jobList = {[ jobList, setjobList ]}/>
            {jobList.map(job => {
                return (
                    <div key={job.employerName} id="job">
                        <p id='detail'><span id='jobTitle'>{job.jobTitle}</span>, {job.employerName}</p>
                        <p id='detail'>{job.startDate} - {job.endDate}</p>
                        <p id='rating'>Rating: {job.rating}</p>
                    </div>
                )
            })}
        </div>
    );
}
