// import React, { useState } from 'react';

// const ResumeForm = ({ jobId, onSubmit }) => {
//     const [name, setName] = useState('');
//     const [email, setEmail] = useState('');
//     const [resume, setResume] = useState(null);

//     const handleSubmit = (e) => {
//         e.preventDefault();
//         onSubmit({ name, email, resume });
//     };

//     return (
//         <form onSubmit={handleSubmit}>
//             <input
//                 type="text"
//                 placeholder="Your Name"
//                 value={name}
//                 onChange={(e) => setName(e.target.value)}
//                 required
//             />
//             <input
//                 type="email"
//                 placeholder="Your Email"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//                 required
//             />
//             <input
//                 type="file"
//                 onChange={(e) => setResume(e.target.files[0])}
//                 required
//             />
//             <button type="submit">Submit Application</button>
//         </form>
//     );
// };

// export default ResumeForm;
import React, { useState } from 'react';

const ResumeForm = ({ jobId, onSubmit }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [resume, setResume] = useState(null);

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit({ name, email, resume });
    };

    return (
        <form onSubmit={handleSubmit} className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-6 text-gray-800">Apply for this Job</h2>
            <div className="mb-4">
                <label htmlFor="name" className="block text-gray-700 mb-2">
                    Your Name
                </label>
                <input
                    id="name"
                    type="text"
                    placeholder="Your Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>
            <div className="mb-4">
                <label htmlFor="email" className="block text-gray-700 mb-2">
                    Your Email
                </label>
                <input
                    id="email"
                    type="email"
                    placeholder="Your Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>
            <div className="mb-6">
                <label htmlFor="resume" className="block text-gray-700 mb-2">
                    Upload Resume
                </label>
                <input
                    id="resume"
                    type="file"
                    onChange={(e) => setResume(e.target.files[0])}
                    required
                    className="w-full"
                />
            </div>
            <button
                type="submit"
                className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition-colors duration-200"
            >
                Submit Application
            </button>
        </form>
    );
};

export default ResumeForm;
