// import { useNavigate } from 'react-router-dom';
// import { showSuccess } from '../utils/toast';

import Header from '../components/Molecules/Header';
import UserList from '../components/Molecules/UserList';
import FloatingAddButton from '../components/Atoms/FloatingAddButton';
import { useAuth } from '../hooks/useAuth';

function Home() {
  const { isAuthenticated } = useAuth();
  
  return (
    <div style={{ padding: 20 }}>
      <Header />
      <UserList />
      {isAuthenticated && <FloatingAddButton />}
    </div>
  );
}

export default Home;
