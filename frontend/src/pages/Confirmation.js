// import React from 'react';
// import { Link } from 'react-router-dom';

// const Confirmation = () => {
//     return (
//         <div>
//             <h1>Application Submitted</h1>
//             <p>Your application has been successfully submitted.</p>
//             <Link to="/getJob">Back to Job Postings</Link>
//         </div>
//     );
// };

// export default Confirmation;

// Confirmation.js
import React from 'react';
import { Link } from 'react-router-dom';

const Confirmation = () => {
    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100 p-6">
            <div className="w-full max-w-md bg-white rounded-lg shadow-md p-8 text-center">
                <h1 className="text-2xl font-bold mb-4">Application Submitted</h1>
                <p className="text-gray-700 mb-6">Your application has been successfully submitted.</p>
                <Link
                    to="/getJob"
                    className="inline-block bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors duration-200"
                >
                    Back to Job Postings
                </Link>
            </div>
        </div>
    );
};

export default Confirmation;
