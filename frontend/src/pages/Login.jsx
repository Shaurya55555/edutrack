<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-M">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Login Page Preview</title>
    <script src="https://unpkg.com/react@17/umd/react.development.js"></script>
    <script src="https://unpkg.com/react-dom@17/umd/react-dom.development.js"></script>
    <script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
</head>
<body>
    <div id="root"></div>

    <script type="text/babel">
        const { useState, useContext, createContext } = React;

        // --- Mock AuthContext ---
        // This simulates the AuthContext from ../context/AuthContext
        const AuthContext = createContext();

        const AuthProvider = ({ children }) => {
            const [user, setUser] = useState(null);

            const login = (userData) => setUser(userData);
            const logout = () => setUser(null);

            // This component allows toggling the login state for the demo
            const DemoController = () => (
                <div style={{ textAlign: 'center', marginBottom: '1rem', fontFamily: 'sans-serif' }}>
                    <p><strong>Demo Controls</strong></p>
                    <button onClick={() => login({ name: 'Demo User' })}>
                        Simulate Login
                    </button>
                    <button onClick={logout} style={{ marginLeft: '10px' }}>
                        Simulate Logout
                    </button>
                    <hr style={{marginTop: '1rem'}}/>
                </div>
            );

            return (
                <AuthContext.Provider value={{ user, login, logout }}>
                    <DemoController />
                    {children}
                </AuthContext.Provider>
            );
        };


        // --- LoginPage Component ---
        // The original code from frontend/src/pages/Login.jsx
        const LoginPage = () => {
          const { user } = useContext(AuthContext);

          const handleGoogleLogin = () => {
            // In a real app, this redirects to the backend for Google OAuth
            alert('Redirecting to Google login...');
            window.open("http://localhost:5000/api/auth/google", "_self");
          };

          const pageStyle = {
            fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
            margin: '4rem auto',
            maxWidth: '450px',
            textAlign: 'center',
            padding: '2rem 2.5rem',
            backgroundColor: '#fff',
            border: '1px solid #e1e4e8',
            borderRadius: '8px',
            boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
          };

          const headingStyle = {
            marginBottom: '2.5rem',
            color: '#24292e',
            fontSize: '2rem',
          };

          const buttonStyle = {
            backgroundColor: '#4285F4',
            color: 'white',
            border: 'none',
            padding: '12px 24px',
            fontSize: '16px',
            fontWeight: '500',
            borderRadius: '6px',
            cursor: 'pointer',
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '12px',
            transition: 'background-color 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
            boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
          };

          const loggedInMessageStyle = {
            fontSize: '1.1rem',
            color: '#444',
            lineHeight: '1.6',
          };
          
          const userNameStyle = {
            fontWeight: '600',
            color: '#0366d6'
          };

          return (
            <div style={pageStyle}>
              <h1 style={headingStyle}>Welcome to EduTrack</h1>
              {user ? (
                <div style={loggedInMessageStyle}>
                  <p>You are logged in as <span style={userNameStyle}>{user.name}</span>.</p>
                </div>
              ) : (
                <div>
                  <p style={{color: '#586069', marginBottom: '2rem'}}>Please log in to continue.</p>
                  <button 
                    onClick={handleGoogleLogin} 
                    style={buttonStyle}
                    onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#3367D6'}
                    onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#4285F4'}
                  >
                    <svg width="20" height="20" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48"><path fill="#FFC107" d="M43.611 20.083H42V20H24v8h11.303c-1.649 4.657-6.08 8-11.303 8c-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4C12.955 4 4 12.955 4 24s8.955 20 20 20s20-8.955 20-20c0-1.341-.138-2.65-.389-3.917z"></path><path fill="#FF3D00" d="M6.306 14.691l6.571 4.819C14.655 15.108 18.961 12 24 12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4C16.318 4 9.656 8.337 6.306 14.691z"></path><path fill="#4CAF50" d="M24 44c5.166 0 9.86-1.977 13.409-5.192l-6.19-5.238C29.211 35.091 26.715 36 24 36c-5.222 0-9.619-3.317-11.283-7.946l-6.522 5.025C9.505 39.556 16.227 44 24 44z"></path><path fill="#1976D2" d="M43.611 20.083H42V20H24v8h11.303c-.792 2.237-2.231 4.166-4.087 5.571l6.19 5.238C42.011 35.636 44 30.138 44 24c0-1.341-.138-2.65-.389-3.917z"></path></svg>
                    <span>Sign in with Google</span>
                  </button>
                </div>
              )}
            </div>
          );
        };

        const App = () => (
            <AuthProvider>
                <LoginPage />
            </AuthProvider>
        );

        // --- Render App ---
        ReactDOM.render(<App />, document.getElementById('root'));
    </script>
</body>
</html>
