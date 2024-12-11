// import React, { useState, useEffect } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import axios from '../services/api';
// import ResumeForm from '../components/ResumeForm';

// const JobDetails = () => {
//     const { jobId } = useParams();
//     const [job, setJob] = useState(null);
//     const navigate = useNavigate();

//     useEffect(() => {
//         axios.get(`/job/getJob/${jobId}`)
//             .then(response => setJob(response.data))
//             .catch(error => console.error('Error fetching job details:', error));
//     }, [jobId]);

//     const handleFormSubmit = (formData) => {
//         const formDataObj = new FormData();
//         formDataObj.append('name', formData.name);
//         formDataObj.append('email', formData.email);
//         formDataObj.append('resume', formData.resume);

//         axios.post(`/job/apply/${jobId}`, formDataObj)
//             .then(() => navigate('/confirmation'))
//             .catch(error => console.error('Error submitting application:', error));
//     };

//     return job ? (
//         <div>
//             <h1>{job.title}</h1>
//             <p>{job.description}</p>
//             <ResumeForm jobId={jobId} onSubmit={handleFormSubmit} />
//         </div>
//     ) : (
//         <p>Loading...</p>
//     );
// };

// export default JobDetails;


// JobDetails.js
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from '../services/api';
import ResumeForm from '../components/ResumeForm';

const JobDetails = () => {
    const { jobId } = useParams();
    const [job, setJob] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`/job/getJob/${jobId}`)
            .then(response => setJob(response.data))
            .catch(error => console.error('Error fetching job details:', error));
    }, [jobId]);

    const handleFormSubmit = (formData) => {
        const formDataObj = new FormData();
        formDataObj.append('name', formData.name);
        formDataObj.append('email', formData.email);
        formDataObj.append('resume', formData.resume);

        axios.post(`/job/apply/${jobId}`, formDataObj)
            .then(() => navigate('/confirmation'))
            .catch(error => console.error('Error submitting application:', error));
    };

    return job ? (
        <div className="flex items-center justify-center min-h-screen bg-gray-100 p-6">
            <div className="w-full max-w-3xl bg-white rounded-lg shadow-md p-8">
                <h1 className="text-2xl font-bold mb-4">{job.title}</h1>
                <p className="text-gray-700 mb-6">{job.description}</p>
                <ResumeForm jobId={jobId} onSubmit={handleFormSubmit} />
            </div>
        </div>
    ) : (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <p className="text-gray-500">Loading...</p>
        </div>
    );
};

export default JobDetails;
