// import React, { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import axios from '../services/api';
// import { useLocation } from 'react-router-dom';

// const HrDashboard = () => {
//     const [jobPostings, setJobPostings] = useState([]);
//     const navigate = useNavigate();
//     const location = useLocation();
//     const hrId = location.state?.hrId;

//     useEffect(() => {
//         if (!hrId) {
//             console.error('No HR manager ID found');
//             return;
//         }

//         axios.get(`/hr/dashboard/${hrId}`)
//             .then(response => setJobPostings(response.data))
//             .catch(error => console.error('Error fetching job postings:', error));
//     }, [hrId]);

//     return (
//         <div>
//             <h1>Current Postings</h1>
//             {jobPostings.length > 0 ? (
//                 jobPostings.map(job => (
//                     <div key={job._id} className="job-card">
//                         <h2>{job.title}</h2>
//                         <button onClick={() => navigate(`/job-postings/edit/${job._id}`, {state: { hrId }})}>Edit</button>
//                         <button onClick={() => navigate(`/job-postings/${job._id}/candidates`)}>View Candidates</button>
//                     </div>
//                 ))
//             ) : (
//                 <p>No job postings available.</p>
//             )}
//         </div>
//     );
// };

// export default HrDashboard;
// HrDashboard.js
import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from '../services/api';

const HrDashboard = () => {
    const [jobPostings, setJobPostings] = useState([]);
    const navigate = useNavigate();
    const location = useLocation();
    const hrId = location.state?.hrId;

    useEffect(() => {
        if (!hrId) {
            console.error('No HR manager ID found');
            return;
        }

        axios.get(`/hr/dashboard/${hrId}`)
            .then(response => setJobPostings(response.data))
            .catch(error => console.error('Error fetching job postings:', error));
    }, [hrId]);

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100 p-6">
            <div className="w-full max-w-4xl bg-white rounded-lg shadow-md p-8">
                <h1 className="text-2xl font-bold mb-6 text-center">Current Postings</h1>
                {jobPostings.length > 0 ? (
                    <div className="space-y-4">
                        {jobPostings.map(job => (
                            <div key={job._id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors duration-200">
                                <div>
                                    <h2 className="text-xl font-semibold text-gray-800">{job.title}</h2>
                                    <p className="text-gray-600">{job.description.substring(0, 100)}...</p>
                                </div>
                                <div className="space-x-2">
                                    <button
                                        onClick={() => navigate(`/job-postings/edit/${job._id}`, { state: { hrId } })}
                                        className="bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600 transition-colors duration-200"
                                    >
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => navigate(`/job-postings/${job._id}/candidates`)}
                                        className="bg-indigo-500 text-white px-4 py-2 rounded-lg hover:bg-indigo-600 transition-colors duration-200"
                                    >
                                        View Candidates
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="text-gray-500 text-center">No job postings available.</p>
                )}
            </div>
        </div>
    );
};

export default HrDashboard;
