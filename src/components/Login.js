import React from 'react';

const Login = ({email, password, setEmail, setPassword, handleLogin}) => (
    <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
        <form style={{display: 'flex', flexDirection: 'column'}}>
            <label>
                Email
                <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} className="rounded-input"/>
            </label>
            <label>
                Password
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)}
                       className="rounded-input"/>
            </label>
            <button id={'login-button'} type="button" onClick={handleLogin}>
                Login
            </button>
        </form>
    </div>

);

export default Login;
