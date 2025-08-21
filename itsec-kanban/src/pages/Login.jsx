import loginBg from '../assets/images/login-bg.jpg';
import LoginForm from '../components/forms/LoginForm';

const LoginPage = () => {
    return (
        <div className="flex min-h-screen">
            {/* Left Column - Image */}
            <div className="lg:flex w-1/2 bg-cover bg-center relative"
                style={{
                backgroundImage: `url(${loginBg})`,
            }}
            >
            </div>
    
            {/* Right Column - Login form */}
            <div className="w-full lg:w-1/2 flex items-center justify-center bg-white p-8">
                <div className="max-w-md w-full">
                    <h1 className="text-3xl font-bold">Login</h1>
                    <LoginForm />
                </div>
            </div>
        </div>
    );
};

export default LoginPage;