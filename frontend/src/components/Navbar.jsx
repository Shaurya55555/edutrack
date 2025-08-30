<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>EduTrack Frontend Demo</title>
    <!-- React and Babel for JSX transpilation -->
    <script src="https://unpkg.com/react@18/umd/react.development.js"></script>
    <script src="https://unpkg.com/react-dom@18/umd/react-dom.development.js"></script>
    <script src="https://unpkg.com/babel-standalone@6/babel.min.js"></script>
    <!-- React Router -->
    <script src="https://cdnjs.cloudflare.com/ajax/libs/react-router-dom/6.22.2/react-router-dom.development.js"></script>
    <!-- Google Identity Services -->
    <script src="https://accounts.google.com/gsi/client" async defer></script>
</head>
<body>
    <div id="root"></div>

    <script type="text/babel">
        const { useState, createContext, useContext, useEffect } = React;
        const { MemoryRouter, Routes, Route, Link } = ReactRouterDOM;

        // --- 1. API Functions (from api.js) ---
        // Simulating the backend API calls with fetch
        const API_BASE_URL = 'http://localhost:5000/api'; // This will fail in a sandbox, but shows the structure

        const apiGoogleLogin = async (token) => {
            // In a real app, this would make a POST request to your backend.
            // Here, we'll simulate a successful login by decoding the token for display purposes.
            console.log("Sending token to backend:", token);
            // Dummy user data based on a generic token structure
            const dummyUser = {
                name: "Demo User",
                email: "demo@example.com",
                avatar: "https://placehold.co/40x40/EFEFEF/333?text=DU",
            };
            return { user: dummyUser, message: "Login successful" };
        };

        // --- 2. Auth Context (from AuthContext.jsx) ---
        const AuthContext = createContext(null);

        const AuthProvider = ({ children }) => {
            const [user, setUser] = useState(null);

            useEffect(() => {
                try {
                    const storedUser = localStorage.getItem('user');
                    if (storedUser) {
                        setUser(JSON.parse(storedUser));
                    }
                } catch (error) {
                    console.error("Failed to parse user from localStorage", error);
                    localStorage.removeItem('user');
                }
            }, []);

            const login = (userData) => {
                localStorage.setItem('user', JSON.stringify(userData));
                setUser(userData);
            };

            const logout = () => {
                localStorage.removeItem('user');
                setUser(null);
            };

            return (
                <AuthContext.Provider value={{ user, login, logout }}>
                    {children}
                </AuthContext.Provider>
            );
        };

        const useAuth = () => {
            return useContext(AuthContext);
        };

        // --- 3. Google Login Button Component ---
        // This replaces the component from the '@react-oauth/google' library
        const GoogleLoginButton = ({ onSuccess, onError }) => {
            const buttonRef = React.useRef(null);

            useEffect(() => {
                if (!window.google || !buttonRef.current) return;

                window.google.accounts.id.initialize({
                    client_id: "YOUR_GOOGLE_CLIENT_ID.apps.googleusercontent.com", // IMPORTANT: Replace with your actual Client ID
                    callback: onSuccess,
                });

                window.google.accounts.id.renderButton(
                    buttonRef.current,
                    { theme: "outline", size: "large" } 
                );
                
                // Optional: prompt for login one-tap
                // window.google.accounts.id.prompt();

            }, [onSuccess]);

            return <div ref={buttonRef}></div>;
        };


        // --- 4. Navbar Component (from Navbar.jsx) ---
        const Navbar = () => {
            const { user, login, logout } = useAuth();

            const handleLoginSuccess = async (credentialResponse) => {
                console.log("Google response:", credentialResponse);
                try {
                    const res = await apiGoogleLogin(credentialResponse.credential);
                    login(res.user);
                } catch (error) {
                    console.error('Login Failed:', error);
                }
            };

            const handleLoginError = () => {
                console.error('Login Failed');
            };

            const handleLogout = () => {
                // In a real app, you would also call `googleLogout()` if you were using the library
                logout();
            };
            
            const navStyle = { display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem 2rem', background: '#f8f9fa', borderBottom: '1px solid #dee2e6', fontFamily: 'sans-serif' };
            const navLinksStyle = { display: 'flex', gap: '1.5rem', alignItems: 'center' };
            const linkStyle = { textDecoration: 'none', color: '#333', fontWeight: 'bold' };
            const userInfoStyle = { display: 'flex', alignItems: 'center', gap: '10px' };
            const avatarStyle = { width: '40px', height: '40px', borderRadius: '50%' };
            const logoutButtonStyle = { padding: '8px 16px', border: 'none', borderRadius: '4px', backgroundColor: '#dc3545', color: 'white', cursor: 'pointer', fontWeight: 'bold' };

            return (
                <nav style={navStyle}>
                    <div style={navLinksStyle}>
                        <Link to="/" style={{...linkStyle, fontSize: '1.5rem' }}>EduTrack</Link>
                        <Link to="/" style={linkStyle}>Home</Link>
                        <Link to="/add" style={linkStyle}>Add Student</Link>
                    </div>
                    <div>
                        {user ? (
                            <div style={userInfoStyle}>
                                <img src={user.avatar} alt={user.name} style={avatarStyle} />
                                <span>Welcome, {user.name}</span>
                                <button onClick={handleLogout} style={logoutButtonStyle}>Logout</button>
                            </div>
                        ) : (
                            <GoogleLoginButton
                                onSuccess={handleLoginSuccess}
                                onError={handleLoginError}
                            />
                        )}
                    </div>
                </nav>
            );
        };
        
        // --- 5. Dummy Page Components ---
        const HomePage = () => <h1 style={{textAlign: 'center', fontFamily: 'sans-serif', marginTop: '2rem'}}>Home Page</h1>;
        const AddStudentPage = () => <h1 style={{textAlign: 'center', fontFamily: 'sans-serif', marginTop: '2rem'}}>Add Student Page</h1>;


        // --- 6. Main App Component ---
        const App = () => {
            return (
                <AuthProvider>
                    <MemoryRouter>
                        <Navbar />
                        <Routes>
                            <Route path="/" element={<HomePage />} />
                            <Route path="/add" element={<AddStudentPage />} />
                        </Routes>
                    </MemoryRouter>
                </AuthProvider>
            );
        };

        // --- 7. Render the App ---
        const root = ReactDOM.createRoot(document.getElementById('root'));
        root.render(<App />);

    </script>
</body>
</html>
