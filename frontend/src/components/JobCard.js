// import React from 'react';
// import { Link } from 'react-router-dom';

// const JobCard = ({ job }) => {
//     return (
//         <div className="job-card">
//             <h2>{job.title}</h2>
//             <p>{job.description.substring(0, 100)}...</p>
//             <Link to={`/getJob/${job._id}`}>View Details</Link>
//         </div>
//     );
// };

// export default JobCard;

import React from 'react';
import { Link } from 'react-router-dom';

const JobCard = ({ job }) => {
    return (
        <div className="border rounded-lg shadow-md p-6 bg-white hover:shadow-lg transition-shadow duration-300">
            <h2 className="text-xl font-semibold mb-2 text-gray-800">{job.title}</h2>
            <p className="text-gray-600 mb-4">{job.description.substring(0, 100)}...</p>
            <Link
                to={`/getJob/${job._id}`}
                className="text-blue-500 hover:text-blue-700 font-medium"
            >
                View Details &rarr;
            </Link>
        </div>
    );
};

export default JobCard;
