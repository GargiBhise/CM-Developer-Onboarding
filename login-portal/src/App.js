import React, { useState, useEffect } from 'react';
import DisplayUsername from './DisplayUsername';

const ForgotPasswordButton = () => {
  const [disabled, setDisabled] = useState(false);
  const [countdown, setCountdown] = useState(60);

  const handleButtonClick = () => {
    setDisabled(true);
    setCountdown(30);

    setTimeout(() => {
      setDisabled(false);
    }, 30000);
  };

  useEffect(() => {
    let interval;
    if (disabled) {
      interval = setInterval(() => {
        setCountdown((prevCountdown) => prevCountdown - 1);
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [disabled]);

  return (
    <div>
      <button onClick={handleButtonClick} disabled={disabled}>
        {disabled ? `Resend in ${countdown} seconds` : 'Forgot Password'}
      </button>
    </div>
  );
};

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [resetPassword, setResetPassword] = useState(false);
  const [username, setUsername] = useState('');

  const handleLogin = () => {
    setUsername('JohnDoe');
    setIsLoggedIn(true);
  };

  const handlePasswordReset = () => {
    setResetPassword(true);
  };

  return (
    <div>
      {isLoggedIn ? (
        <div>
          <h1>Welcome! You are logged in.</h1>
          <DisplayUsername username={username} />
        </div>
      ) : resetPassword ? (
        <div>
          <h2>Forgot Password</h2>
          <ForgotPasswordButton />
        </div>
      ) : (
        <div>
          <h2>Login</h2>
          <form onSubmit={handleLogin}>
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <br />
            <input type="password" placeholder="Password" />
            <br />
            <button type="submit">Login</button>
          </form>
        </div>
      )}
      {!isLoggedIn && !resetPassword && (
        <p>
          <a href="#!" onClick={handlePasswordReset}>
            Forgot your password?
          </a>
        </p>
      )}
    </div>
  );
};

export default App;
