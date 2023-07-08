import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div>
      <h1>404 - Página não encontrada</h1>
      <div>
        Voltar para a <Link to="/">Home</Link>
      </div>
    </div>
  );
}

export default NotFound;
