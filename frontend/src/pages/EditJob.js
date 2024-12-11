// import React, { useState, useEffect } from 'react';
// import { useParams, useNavigate, useLocation } from 'react-router-dom';
// import axios from '../services/api';

// const EditJob = () => {
//     const { jobId } = useParams();
//     const navigate = useNavigate();
//     const location = useLocation();
//     const hrId = location.state?.hrId;
//     const [job, setJob] = useState({ title: '', description: '' });

//     useEffect(() => {
//         axios.get(`/hr/job/edit/${jobId}`)
//             .then(response => setJob(response.data))
//             .catch(error => console.error('Error fetching job details:', error));
//     }, [jobId]);

//     const handleInputChange = (e) => {
//         const { name, value } = e.target;
//         setJob({ ...job, [name]: value });
//     };

//     const handleSave = () => {
//         axios.post(`/hr/job/edit/${jobId}`, job)
//             .then(() => navigate('/dashboard', {state: { hrId }}))
//             .catch(error => console.error('Error updating job:', error));
//     };

//     return (
//         <div>
//             <h1>Edit Job</h1>
//             <input
//                 type="text"
//                 name="title"
//                 value={job.title}
//                 onChange={handleInputChange}
//                 placeholder="Job Title"
//             />
//             <textarea
//                 name="description"
//                 value={job.description}
//                 onChange={handleInputChange}
//                 placeholder="Job Description"
//             />
//             <button onClick={handleSave}>Save Changes</button>
//         </div>
//     );
// };

// export default EditJob;
// EditJob.js
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import axios from '../services/api';

const EditJob = () => {
    const { jobId } = useParams();
    const navigate = useNavigate();
    const location = useLocation();
    const hrId = location.state?.hrId;
    const [job, setJob] = useState({ title: '', description: '' });

    useEffect(() => {
        axios.get(`/hr/job/edit/${jobId}`)
            .then(response => setJob(response.data))
            .catch(error => console.error('Error fetching job details:', error));
    }, [jobId]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setJob({ ...job, [name]: value });
    };

    const handleSave = () => {
        axios.post(`/hr/job/edit/${jobId}`, job)
            .then(() => navigate('/dashboard', { state: { hrId } }))
            .catch(error => console.error('Error updating job:', error));
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100 p-6">
            <div className="w-full max-w-2xl bg-white rounded-lg shadow-md p-8">
                <h1 className="text-2xl font-bold mb-6 text-center">Edit Job</h1>
                <div className="space-y-4">
                    <div>
                        <label htmlFor="title" className="block text-gray-700 mb-2">
                            Job Title
                        </label>
                        <input
                            id="title"
                            name="title"
                            type="text"
                            value={job.title}
                            onChange={handleInputChange}
                            placeholder="Job Title"
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div>
                        <label htmlFor="description" className="block text-gray-700 mb-2">
                            Job Description
                        </label>
                        <textarea
                            id="description"
                            name="description"
                            value={job.description}
                            onChange={handleInputChange}
                            placeholder="Job Description"
                            rows="6"
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        ></textarea>
                    </div>
                    <button
                        onClick={handleSave}
                        className="w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 transition-colors duration-200"
                    >
                        Save Changes
                    </button>
                </div>
            </div>
        </div>
    );
};

export default EditJob;
