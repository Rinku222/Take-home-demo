import { useNavigate } from 'react-router-dom';

export default function FloatingAddButton() {
  const navigate = useNavigate();

  return (
    <button style={styles.button} onClick={() => navigate('/add')}>
      +
    </button>
  );
}

const styles = {
  button: {
    position: 'fixed',
    bottom: 20,
    right: 20,
    width: 55,
    height: 55,
    borderRadius: '50%',
    fontSize: 30,
    backgroundColor: '#1976d2',
    color: '#fff',
    border: 'none',
    cursor: 'pointer'
  }
};
