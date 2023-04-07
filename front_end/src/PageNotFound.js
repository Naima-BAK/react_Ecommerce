import React from 'react'
import { useNavigate } from 'react-router-dom'
export default function PageNotFound() {
    const navigate = useNavigate();
    const goHome = () => {
        navigate('/login');
    }
    return (
        <div className="d-flex align-items-center justify-content-center vh-100">
            <div className="text-center">
                <h1 className="display-1 fw-bold">404</h1>
                <p className="fs-3"> <span className="text-danger">Oups !</span>  Page non trouvée.</p>
                <p className="lead">
                    La page que vous recherchez n'existe pas.                </p>
                <button onClick={goHome} type="submit" className="btn btn-primary">Go Home</button>
            </div>
        </div>
    )
}
