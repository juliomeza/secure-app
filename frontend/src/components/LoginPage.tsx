// frontend/src/components/LoginPage.tsx
import React from 'react';
import { useLocation, Navigate } from 'react-router-dom';
import { useAuth } from './AuthProvider';
import { 
    MicrosoftLoginButton,
    GoogleLoginButton
} from 'react-social-login-buttons';

const LoginPage: React.FC = () => {
    const { isAuthenticated, isLoading } = useAuth();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/";

    const handleMicrosoftLogin = () => {
        window.location.href = `/auth/login/azuread-oauth2/?prompt=select_account`;
    };
    
    const handleGoogleLogin = () => {
        window.location.href = `/auth/login/google-oauth2/`;
    };

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (isAuthenticated) {
       return <Navigate to={from} replace />;
    }

    return (
        <div className="login-page">
            <h2>Welcome back</h2>
            <p>Please enter your details</p>
            
            {/* Microsoft Login Button */}
            <MicrosoftLoginButton 
                onClick={handleMicrosoftLogin}
                style={{ width: '250px', margin: '0 auto' }}
                className="login-button"
                text="Sign in with Microsoft"
            />
            
            <div className="or-separator">or</div>
            
            {/* Google Login Button */}
            <GoogleLoginButton
                onClick={handleGoogleLogin}
                style={{ width: '250px', margin: '0 auto' }}
                className="login-button"
                text="Sign in with Google"
            />

            {/* Don't have an account link */}
            <div className="signup-link">
                Don't have an account? <a href="/signup">Sign up</a>
            </div>
        </div>
    );
};

export default LoginPage;