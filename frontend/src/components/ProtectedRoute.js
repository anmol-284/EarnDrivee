import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const ProtectedRoute = ({ component: Component }) => {
    const navigate = useNavigate();
    const login = localStorage.getItem('token');

    useEffect(() => {
        if (!login) {
            navigate('/login');
        }
    }, [navigate, login]);

    if (!login) {
        return null;
    }

    return (
        <div>
            <Component />
        </div>
    );
};

export default ProtectedRoute;
