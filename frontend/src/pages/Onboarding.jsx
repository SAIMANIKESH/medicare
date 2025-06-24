import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Toast from '../components/Toast';
import api from '../services/api';

export default function Onboarding() {
  const { name, email } = JSON.parse(localStorage.getItem('user')) || {};
  const [toast, setToast] = useState(false);
  const [error, setError] = useState('');
  const [form, setForm] = useState({
    gender: '',
    profileImage: '',
    
  });

  const navigate = useNavigate();
  const { gender  } = form;

  const handleChange = e => {
    setForm({...form, [e.target.name]: e.target.value});
  };

  const handleOnboarding = async e => {
    e.preventDefault();
    setError('');

    if (password !== confirmPassword) {
      setError("Passwords not matched.");
      setToast(true);

      setTimeout(() => {
        setToast(false);
        setError('');
      }, 5000);
      return;
    }

    try {
      const res = await api.post('/auth/onboarding', form);

      return navigate("/login", { replace: true });
    } catch (err) {
      const msg = err.response?.data?.message || "An error occurred. Please try again.";
      setError(msg);

      if (msg === "User already exists") {
        setToast(true);
        setError("User already exists. Redirecting to Login...");

        setTimeout(() => {
          navigate("/login", { replace: true });
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
      setForm({ name: '', email: '', password: '', confirmPassword: '' });
    }
  };

  const display = showPassword ? "text" : "password";

  return (
    <div className='form-container'>
      <form onSubmit={handleOnboarding}>
        <img src="/medicare.png" alt="Medicare Logo" className='mb-1' />
        <h2>Sign up</h2>
        {error && <p className="error-msg">*{error}</p>}

        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            id="name"
            type="text"
            name="name"
            placeholder="Full Name"
            value={name}
            onChange={handleChange}
            className="input"
            required
            autoFocus
        />
        </div>

        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={handleChange}
            placeholder="xyz@gmail.com"
            className="input"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="password">Password</label>
          <div tabIndex="0" className="flex justify-between items-center input">
            <input
              type={display}
              id="password"
              name="password"
              value={password}
              onChange={handleChange}
              placeholder="Password"
              className="outline-none w-80"
              required
            />

            {showPassword ? <Eye className="show-password" onClick={() => setShowPassword(!showPassword)} /> 
              : <EyeClosed className="show-password" onClick={() => setShowPassword(!showPassword)} />
            }
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="confirmPassword">Confirm Password</label>
          <div tabIndex="0" className="flex justify-between items-center input">
            <input
              type={display}
              id="confirmPassword"
              name="confirmPassword"
              value={confirmPassword}
              onChange={handleChange}
              placeholder="Confirm Password"
              className="outline-none w-80"
              required
            />

            {showPassword ? <Eye className="show-password" onClick={() => setShowPassword(!showPassword)} /> 
              : <EyeClosed className="show-password" onClick={() => setShowPassword(!showPassword)} />
            }
          </div>
        </div>

        <button type="submit">Register</button>

        <p>
          Already have an account? <a href="/login">Login</a>
        </p>
        <p>
          By signing up, you agree to our <a href="#">Terms of Service</a> and
          acknowledge that you have read our <a href="#">Privacy Policy</a>.
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