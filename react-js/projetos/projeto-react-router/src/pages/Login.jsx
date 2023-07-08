import { useNavigate } from 'react-router-dom';

import fakeAuth from '../fake-auth';

const Login = () => {
  const navigate = useNavigate();

  const login = () => {
    fakeAuth.isAuthenticated = true;
    navigate('/tasks')
  }

  return (
    <div>
      <h1>Login page</h1>
      <input placeholder="Usuário" /> <br />
      <input placeholder="Senha" /> <br />
      <button onClick={login}>Entrar</button>
    </div>
  );
}

export default Login;
