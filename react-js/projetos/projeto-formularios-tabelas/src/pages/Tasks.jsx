import { useNavigate } from 'react-router-dom';

import fakeAuth from '../fake-auth';

const Tasks = () => {
  const navigate = useNavigate();
  
  const logout = () => {
    fakeAuth.isAuthenticated = false;
    navigate('/login')
  }

  return (
    <div>
      <h1>Tasks</h1>
      <button onClick={logout}>

        Sair

      </button>
    </div>
  );
}

export default Tasks;
