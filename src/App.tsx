import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function App() {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      navigate('/todo');
    } else {
      navigate('/login');
    }
  }, [navigate]);

  return null; // or a loading spinner
}

export default App;