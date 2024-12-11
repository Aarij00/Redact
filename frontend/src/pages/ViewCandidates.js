// import React, { useEffect, useState } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import axios from '../services/api';

// const ViewCandidates = () => {
//     const { jobId } = useParams();
//     const navigate = useNavigate(); // Added the useNavigate hook
//     const [candidates, setCandidates] = useState([]);
//     const [selectedCandidate, setSelectedCandidate] = useState(null);

//     useEffect(() => {
//         axios.get(`/hr/view-candidates/${jobId}`)
//             .then(response => setCandidates(response.data))
//             .catch(error => console.error('Error fetching candidates:', error));
//     }, [jobId]);

//     const handleShortlist = (candidateId) => {
//         axios.post(`/hr/jobs/${jobId}/shortlist`, { candidateId })
//             .then(response => {
//                 alert(`Candidate ${candidateId} has been shortlisted.`);
//                 // Optionally, update the local state to reflect the change
//                 setCandidates(prevCandidates =>
//                     prevCandidates.map(candidate =>
//                         candidate._id === candidateId
//                             ? { ...candidate, status: 'shortlisted' }
//                             : candidate
//                     )
//                 );
//             })
//             .catch(error => {
//                 console.error('Error shortlisting candidate:', error);
//                 alert('Failed to shortlist candidate. Please try again.');
//             });
//     };

//     const handleReject = (candidateId) => {
//         alert(`Candidate ${candidateId} rejected`);
//         // API call for rejection logic can go here
//     };

//     const handleNavigateToShortlisted = () => {
//         navigate(`/job-postings/${jobId}/shortlisted`);
//     };

//     return (
//         <div>
//             <h1>Candidates for Job {jobId}</h1>
//             <button onClick={handleNavigateToShortlisted}>Shortlisted candidates</button>
//             <div>
//                 {candidates.map(candidate => (
//                     <div key={candidate._id} onClick={() => setSelectedCandidate(candidate)}>
//                         <p>{candidate.name}</p>
//                     </div>
//                 ))}
//             </div>
//             {selectedCandidate && (
//                 <div>
//                     <h2>Resume</h2>
//                     <iframe src={selectedCandidate.resume} title="Resume" />
//                     <button onClick={() => handleShortlist(selectedCandidate._id)}>Shortlist</button>
//                     <button onClick={() => handleReject(selectedCandidate._id)}>Reject</button>
//                 </div>
//             )}
//         </div>
//     );
// };

// export default ViewCandidates;
// ViewCandidates.js
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from '../services/api';

const ViewCandidates = () => {
    const { jobId } = useParams();
    const navigate = useNavigate();
    const [candidates, setCandidates] = useState([]);
    const [selectedCandidate, setSelectedCandidate] = useState(null);

    useEffect(() => {
        axios.get(`/hr/view-candidates/${jobId}`)
            .then(response => setCandidates(response.data))
            .catch(error => console.error('Error fetching candidates:', error));
    }, [jobId]);

    const handleShortlist = (candidateId) => {
        axios.post(`/hr/jobs/${jobId}/shortlist`, { candidateId })
            .then(response => {
                alert(`Candidate ${candidateId} has been shortlisted.`);
                setCandidates(prevCandidates =>
                    prevCandidates.map(candidate =>
                        candidate._id === candidateId
                            ? { ...candidate, status: 'shortlisted' }
                            : candidate
                    )
                );
            })
            .catch(error => {
                console.error('Error shortlisting candidate:', error);
                alert('Failed to shortlist candidate. Please try again.');
            });
    };

    const handleReject = (candidateId) => {
        alert(`Candidate ${candidateId} rejected`);
        // API call for rejection logic can go here
    };

    const handleNavigateToShortlisted = () => {
        navigate(`/job-postings/${jobId}/shortlisted`);
    };

    return (
        <div className="min-h-screen bg-gray-100 p-6">
            <div className="max-w-5xl mx-auto bg-white rounded-lg shadow-md p-8">
                <div className="flex items-center justify-between mb-6">
                    <h1 className="text-2xl font-bold">Candidates for Job {jobId}</h1>
                    <button
                        onClick={handleNavigateToShortlisted}
                        className="bg-indigo-500 text-white px-4 py-2 rounded-lg hover:bg-indigo-600 transition-colors duration-200"
                    >
                        Shortlisted Candidates
                    </button>
                </div>
                <div className="space-y-4">
                    {candidates.length > 0 ? (
                        candidates.map(candidate => (
                            <div
                                key={candidate._id}
                                onClick={() => setSelectedCandidate(candidate)}
                                className="p-4 border rounded-lg hover:bg-gray-50 cursor-pointer transition-colors duration-200 flex justify-between items-center"
                            >
                                <p className="text-gray-700">{candidate.name}</p>
                                {candidate.status === 'shortlisted' && (
                                    <span className="text-green-500 font-medium">Shortlisted</span>
                                )}
                            </div>
                        ))
                    ) : (
                        <p className="text-gray-500">No candidates found.</p>
                    )}
                </div>
                {selectedCandidate && (
                    <div className="mt-8 bg-gray-50 p-6 rounded-lg shadow-inner">
                        <h2 className="text-xl font-semibold mb-4">Resume of {selectedCandidate.name}</h2>
                        <iframe
                            src={selectedCandidate.resume}
                            title="Resume"
                            className="w-full h-64 border rounded-lg mb-4"
                        />
                        <div className="flex space-x-4">
                            <button
                                onClick={() => handleShortlist(selectedCandidate._id)}
                                className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors duration-200"
                            >
                                Shortlist
                            </button>
                            <button
                                onClick={() => handleReject(selectedCandidate._id)}
                                className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors duration-200"
                            >
                                Reject
                            </button>
                            <button
                                onClick={() => setSelectedCandidate(null)}
                                className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition-colors duration-200"
                            >
                                Close
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ViewCandidates;
