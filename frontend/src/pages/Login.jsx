import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { EyeClosed, Eye } from "lucide-react";

import Toast from "../components/Toast";
import api from "../services/api";

export default function Login() {
  const [toast, setToast] = useState(false);
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState({ email: '', password: '' });

  const navigate = useNavigate();
  const { email, password } = form;

  const handleChange = e => {
    setForm({...form, [e.target.name]: e.target.value});
  };

  const handleLogin = async e => {
    e.preventDefault();
    setError('');
    
    try {
      const res = await api.post('/auth/login', form);
      const { token } = res.data;

      localStorage.setItem('token', JSON.stringify(token));

      window.location.reload();
      window.location.href = "/";
      return;
    } catch (err) {
      const msg = err.response?.data?.message || "An error occurred. Please try again...";
      
      if (msg === "User not found") {
        setToast(true);
        setError("User not found. Please Register...");

        setTimeout(() => {
          navigate("/signup", { replace: true });
        }, 3000);

        return;
      } else {
        setToast(true);
        setError(msg);

        setTimeout(() => {
          setToast(false);
          setError('');
        }, 5000);
      }
      
      console.log(err);
    } finally {
      setForm({ password: '' });
    }
  };

  const display = showPassword ? "text" : "password";

  return (
    <div className="form-container">
      <form onSubmit={handleLogin}>
        <img src="/medicare.png" alt="Medicare Logo" className="mb-1" />
        <h2>Login</h2>
        {error && <p className="error-msg">*{error}</p>}

        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            autoComplete="email"
            value={email}
            onChange={handleChange}
            placeholder="xyz@gmail.com"
            className="input"
            required
            autoFocus
          />
        </div>

        <div className="form-group">
          <label htmlFor="password">Password</label>
          <div tabIndex="0" className="flex justify-between items-center input">
            <input
              type={display}
              id="password"
              name="password"
              autoComplete="current-password"
              value={password}
              onChange={handleChange}
              placeholder="Enter your password"
              className="outline-none w-80"
              required
            />

            {showPassword ? <Eye className="show-password" onClick={() => setShowPassword(!showPassword)} /> 
              : <EyeClosed className="show-password" onClick={() => setShowPassword(!showPassword)} />
            }
          </div>
        </div>

        <button type="submit">Sign In</button>

        <p>
          Don't have an account? <a href="/signup">Register</a>
        </p>
        <p>
          <a href="">Forgot Password?</a>
        </p>
      </form>

      {toast && (
        <Toast
          message={error}
          onClose={() => setToast(false)}
        />
      )}
    </div>
  );
};