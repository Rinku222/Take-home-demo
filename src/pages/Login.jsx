import { useState } from 'react';
import { showError, showSuccess } from '../utils/toast';
import { useNavigate } from 'react-router-dom';
import TextInput from '../components/Atoms/TextInput';
import PrimaryButton from '../components/Atoms/PrimaryButton';
import FormPage from '../components/Molecules/FormPage';
import { useAuth } from '../hooks/useAuth';
import api from '../api/axios';
import { AUTH } from '../api/endpoints';

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    if (e) e.preventDefault();

    const trimmedEmail = email.trim();
    const trimmedPassword = password.trim();

    if (!trimmedEmail || !trimmedPassword) {
      showError('Email and Password are required');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(trimmedEmail)) {
      showError('Please enter a valid email');
      return;
    }

    setLoading(true);

    try {
      console.log("before api call")
      const { data } = await api.post(AUTH.LOGIN, {
        email: trimmedEmail,
        password: trimmedPassword
      });

      if (!data?.result?.token) {
        throw new Error('Token not received');
      }

      login(data.result.token);
      showSuccess('Login successful');
    } catch (error) {
      console.error('Login error:', error);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <FormPage>
      <div style={styles.form}>
        <h2>Login</h2>

        <TextInput label="Email" value={email} onChange={setEmail} placeholder='Email' type="email" />
        <TextInput label="Password" value={password} onChange={setPassword} placeholder='Password' type='password' />

        <PrimaryButton name={loading ? 'Logging in...' : 'Login'} onClick={handleLogin} type="button" style={styles.button} disabled={loading} />
        <p style={styles.signupText}>
            Don&apos;t have an account?{' '}
            <span
                style={styles.signupLink}
                onClick={() => navigate('/signup')}
            >
                Signup
            </span>
        </p>

      </div>
    </FormPage>
  );
}

const styles = {
  form: {
    width: 360,
    display: 'flex',
    flexDirection: 'column',
    gap: 12,
    backgroundColor: '#ffffff',
    padding: 34,
    borderRadius: 10,
    boxShadow: '0 10px 30px rgba(0, 0, 0, 0.15)'
  },
  input: {
    padding: 10,
    fontSize: 14
  },
  button: {
    padding: 10,
    fontSize: 15,
    cursor: 'pointer'
  },
  signupText: {
    marginTop: 10,
    fontSize: 14,
    textAlign: 'center',
    color: '#555'
  },
    signupLink: {
    marginLeft: 4,
    color: '#007bff',
    cursor: 'pointer',
    textDecoration: 'underline',
    fontWeight: 500
 }
};
