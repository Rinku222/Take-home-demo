import { useState } from 'react';
import { showError, showSuccess } from '../utils/toast';
import { useNavigate } from 'react-router-dom';
import bgImage from '../assets/nature.jpg';
import TextInput from '../components/Atoms/TextInput';
import PrimaryButton from '../components/Atoms/PrimaryButton';
import FormPage from '../components/Molecules/FormPage';
import { useAuth } from '../hooks/useAuth';
import api from '../api/axios';
import { AUTH } from '../api/endpoints';

export default function SignUp() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();

    const trimmedName = name.trim();
    const trimmedEmail = email.trim();
    const trimmedPassword = password.trim();
    const trimmedConfirmPassword = confirmPassword.trim();

    if (
      !trimmedName ||
      !trimmedEmail ||
      !trimmedPassword ||
      !trimmedConfirmPassword
    ) {
      showError("All fields are required");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(trimmedEmail)) {
      showError("Please enter a valid email");
      return;
    }

    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?#&])[A-Za-z\d@$!%*?#&]{8,}$/;

    if (!passwordRegex.test(trimmedPassword)) {
      showError(
        "Password must be at least 8 characters and include uppercase, lowercase, number, and special character"
      );
      return;
    }

    if (trimmedPassword !== trimmedConfirmPassword) {
      showError("Passwords do not match");
      return;
    }

    setLoading(true);

    try {
      const { data } = await api.post(AUTH.SIGNUP, {
        name: trimmedName,
        email: trimmedEmail,
        password: trimmedPassword,
        confirmPassword: trimmedConfirmPassword,
      });

      const token = data?.result?.token;

      if (!token) {
        throw new Error("Token not received");
      }

      login(token);
      showSuccess("Signup successful");
    } catch (error) {
      console.log("error", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <FormPage>
      <form style={styles.form} onSubmit={handleLogin}>
        <h2>Sign Up</h2>

        <TextInput label="Name" value={name} onChange={setName} placeholder='Name' type="text" />
        <TextInput label="Email" value={email} onChange={setEmail} placeholder='Email' type="email" />
        <TextInput label="Password" value={password} onChange={setPassword} placeholder='Password' type='password' />
        <TextInput label="Confirm Password" value={confirmPassword} onChange={setConfirmPassword} placeholder='Confirm Password' type='password' />

        <PrimaryButton name={loading ? 'Signing in...' : 'Sign Up'} onClick={handleLogin} type="submit" style={styles.button} disabled={loading} />
        <p style={styles.signupText}>
            Already have an account?{' '}
            <span
                style={styles.signupLink}
                onClick={() => navigate('/login')}
            >
                Login
            </span>
        </p>
      </form>
    </FormPage>
  );
}

const styles = {
   page: {
    width: '100vw',
    height: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundImage: `url(${bgImage})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat'
  },
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
