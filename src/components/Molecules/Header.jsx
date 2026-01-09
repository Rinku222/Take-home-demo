import { useNavigate } from 'react-router-dom';
import PrimaryButton from '../Atoms/PrimaryButton';
import { useAuth } from '../../hooks/useAuth';

export default function Header() {
  const navigate = useNavigate();
  const { logout, isAuthenticated } = useAuth();

  return (
    <div style={styles.header}>
      <h2>Welcome 👋</h2>

      <div>
        {isAuthenticated ? (
          <PrimaryButton name="Logout" onClick={logout} />
        ) : (
          <PrimaryButton name="Login" onClick={() => navigate('/login')} />
        )}
      </div>
    </div>
  );
}

const styles = {
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    borderBottom: '1px solid #ddd',
    alignItems: 'center'
  }
};
