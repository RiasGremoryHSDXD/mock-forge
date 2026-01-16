import { useNavigate } from "react-router-dom";
import Logo from "../../assets/websiteLogo3.png";
import { useGoogleLogin } from "../../hooks/useGoogleLogin";
import { setUserFromLocalStorage } from "../../utils/storage";

export default function LoginCard() {
    const navigate = useNavigate();
    const { login, error } = useGoogleLogin();

    const handleGoogleLogin = async () => {
        const user = await login();
        if (user) {
            setUserFromLocalStorage(user);
            navigate('/home');
        }
    };

    return (
        <div className="w-[30vw] h-[50vh] bg-slate-800 rounded-lg border border-white relative">
            <div className="flex flex-col justify-center items-center h-full">

                {/* Logo and Title */}
                <div className="flex flex-row justify-center items-center rounded-lg px-4 py-2 gap-4">
                    <img src={Logo} alt="Website Logo" className="w-12 h-auto" />
                    <h1 className="text-white text-2xl font-semibold">Mock Forge</h1>
                </div>

                <h1 className="text-white text-2xl font-semibold">Welcome Back</h1>
                <p className="text-white text-sm mt-1">Sign in to manage your schema and Api Endpoints</p>

                {/* Error Message Display */}
                {error && <p className="text-red-500 text-xs mt-2">{error}</p>}

                {/* Button with Click Handler */}
                <button
                    onClick={handleGoogleLogin}
                    className="flex flex-row justify-center items-center bg-white rounded-lg px-4 py-3 gap-3 w-full max-w-[80%] mt-8 hover:bg-gray-100 transition-colors cursor-pointer"
                >
                    <svg className="w-5 h-5" viewBox="0 0 24 24">
                        <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                        <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                        <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                        <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                    </svg>
                    <span className="text-gray-700 font-bold text-sm">Sign in with Google</span>
                </button>

                <p className="text-gray-400 text-xs mt-4 text-center">
                    By clicking continue, you agree to our <span className="text-white cursor-pointer hover:underline">Terms of Service</span>.
                </p>
            </div>
        </div>
    );
}