// import React, { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';
// import axios from '../services/api';

// const ShortlistedCandidates = () => {
//     const { jobId } = useParams();
//     const [candidates, setCandidates] = useState([]);

//     useEffect(() => {
//         axios.get(`/hr/view-shortlisted/${jobId}`)
//             .then(response => setCandidates(response.data))
//             .catch(error => console.error('Error fetching shortlisted candidates:', error));
//     }, [jobId]);

//     const handleSendEmail = () => {
//         alert('Email sent to all shortlisted candidates');
//         // API call for sending email logic can go here
//     };

//     return (
//         <div>
//             <h1>Shortlisted Candidates for Job {jobId}</h1>
//             <div>
//                 {candidates.map(candidate => (
//                     <div key={candidate._id}>
//                         <p>{candidate.name}</p>
//                     </div>
//                 ))}
//             </div>
//             <button onClick={handleSendEmail}>Send Email to All</button>
//         </div>
//     );
// };

// export default ShortlistedCandidates;
// ShortlistedCandidates.js
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from '../services/api';

const ShortlistedCandidates = () => {
    const { jobId } = useParams();
    const [candidates, setCandidates] = useState([]);

    useEffect(() => {
        axios.get(`/hr/view-shortlisted/${jobId}`)
            .then(response => setCandidates(response.data))
            .catch(error => console.error('Error fetching shortlisted candidates:', error));
    }, [jobId]);

    const handleSendEmail = () => {
        alert('Email sent to all shortlisted candidates');
        // API call for sending email logic can go here
    };

    return (
        <div className="min-h-screen bg-gray-100 p-6">
            <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-8">
                <h1 className="text-2xl font-bold mb-6 text-center">Shortlisted Candidates for Job {jobId}</h1>
                <div className="space-y-4">
                    {candidates.length > 0 ? (
                        candidates.map(candidate => (
                            <div key={candidate._id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors duration-200">
                                <p className="text-gray-700">{candidate.name}</p>
                            </div>
                        ))
                    ) : (
                        <p className="text-gray-500">No shortlisted candidates found.</p>
                    )}
                </div>
                <button
                    onClick={handleSendEmail}
                    className="mt-6 w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 transition-colors duration-200"
                >
                    Send Email to All
                </button>
            </div>
        </div>
    );
};

export default ShortlistedCandidates;
