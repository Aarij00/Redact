import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import JobPostings from './pages/JobPostings';
import JobDetails from './pages/JobDetails';
import Confirmation from './pages/Confirmation';
import HrDashboard from './pages/HrDashboard';
import EditJob from './pages/EditJob';
import ViewCandidates from './pages/ViewCandidates';
import ShortlistedCandidates from './pages/ShortlistedCandidates';
import Login from './pages/Login';
import Register from './pages/Register';

function App() {
    const [data, setData] = useState(null);

    return (
        <Router>
            <Routes>
                <Route path="/" element={<Navigate to="/getJob" />} />
                {/* Employee Views */}
                <Route path="/getJob" element={<JobPostings />} />
                <Route path="/getJob/:jobId" element={<JobDetails />} />
                <Route path="/confirmation" element={<Confirmation />} />

                {/* HR Manager Views */}
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/dashboard" element={<HrDashboard />} />
                <Route path="/job-postings/edit/:jobId" element={<EditJob />} />
                <Route path="/job-postings/:jobId/candidates" element={<ViewCandidates />} />
                <Route path="/job-postings/:jobId/shortlisted" element={<ShortlistedCandidates />} />
            </Routes>
        </Router>
    );
}

export default App;
