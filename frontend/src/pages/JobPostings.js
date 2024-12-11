// import React, { useEffect, useState } from 'react';
// import axios from '../services/api';
// import JobCard from '../components/JobCard';

// const JobPostings = () => {
//     const [jobs, setJobs] = useState([]);

//     useEffect(() => {
//         axios.get('/job/getJob')
//             .then(response => setJobs(response.data))
//             .catch(error => console.error('Error fetching job postings:', error));
//     }, []);

//     return (
//         <div>
//             <h1>Job Postings</h1>
//             {jobs.map(job => (
//                 <JobCard key={job._id} job={job} />
//             ))}
//         </div>
//     );
// };

// export default JobPostings;
// JobPostings.js
import React, { useEffect, useState } from 'react';
import axios from '../services/api';
import JobCard from '../components/JobCard';

const JobPostings = () => {
    const [jobs, setJobs] = useState([]);

    useEffect(() => {
        axios.get('/job/getJob')
            .then(response => setJobs(response.data))
            .catch(error => console.error('Error fetching job postings:', error));
    }, []);

    return (
        <div className="min-h-screen bg-gray-100 p-6">
            <div className="max-w-5xl mx-auto">
                <h1 className="text-3xl font-bold mb-6 text-center">Job Postings</h1>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {jobs.map(job => (
                        <JobCard key={job._id} job={job} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default JobPostings;
