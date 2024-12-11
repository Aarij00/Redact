// import React, { useState } from 'react';
// import axios from '../services/api';
// import { useNavigate } from 'react-router-dom';

// const Login = () => {
//     const [email, setEmail] = useState('');
//     const [password, setPassword] = useState('');
//     const [error, setError] = useState(null);
//     const navigate = useNavigate();
    
//     const handleLogin = async (e) => {
//         e.preventDefault();
//         try {
//             // Send login request to the server
//             const response = await axios.post('/auth/login', { email, password });
            
//             // Extract the hrId from the response (assuming it's in response.data)
//             const hrId = response.data._id;
    
//             if (hrId) {
//                 // Navigate to the dashboard and pass the hrId
//                 navigate('/dashboard', {state: { hrId }});
//             } else {
//                 throw new Error('HR ID not found in response');
//             }
//         } catch (err) {
//             setError('Invalid email or password');
//             console.error('Error during login:', err);
//         }
//     };
    

//     return (
//         <div className="login-form">
//             <h1>Login</h1>
//             {error && <p className="error-text">{error}</p>}
//             <form onSubmit={handleLogin}>
//                 <input
//                     type="email"
//                     placeholder="Email"
//                     value={email}
//                     onChange={(e) => setEmail(e.target.value)}
//                     required
//                 />
//                 <input
//                     type="password"
//                     placeholder="Password"
//                     value={password}
//                     onChange={(e) => setPassword(e.target.value)}
//                     required
//                 />
//                 <button type="submit">Login</button>
//             </form>
//         </div>
//     );
// };

// export default Login;



import React, { useState } from 'react';
import axios from '../services/api';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    
    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            // Send login request to the server
            const response = await axios.post('/auth/login', { email, password });
            
            // Extract the hrId from the response (assuming it's in response.data)
            const hrId = response.data._id;

            if (hrId) {
                // Navigate to the dashboard and pass the hrId
                navigate('/dashboard', {state: { hrId }});
            } else {
                throw new Error('HR ID not found in response');
            }
        } catch (err) {
            setError('Invalid email or password');
            console.error('Error during login:', err);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="w-full max-w-md bg-white rounded-lg shadow-md p-8">
                <h1 className="text-2xl font-bold mb-6 text-center">Login</h1>
                {error && <p className="text-red-500 mb-4">{error}</p>}
                <form onSubmit={handleLogin} className="space-y-6">
                    <div>
                        <label htmlFor="email" className="block text-gray-700">Email</label>
                        <input
                            id="email"
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div>
                        <label htmlFor="password" className="block text-gray-700">Password</label>
                        <input
                            id="password"
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-200"
                    >
                        Login
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Login;


