import {
  HashRouter as Router,
  Routes,
  Route,
  Link,
} from 'react-router-dom';

import Home from './pages/Home';
import Tasks from './pages/Tasks';
import About from './pages/About';
import PrivateRoute from './components/PrivateRoute';
import Login from './pages/Login';
import NotFound from './pages/NotFound';

function App() {

  return (
    <Router>
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/tasks">Tarefas</Link></li>
        <li><Link to="/about">Sobre</Link></li>
      </ul>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/tasks" element={
          <PrivateRoute>
            <Tasks />
          </PrivateRoute>
        } />
        <Route path="/login" element={<Login />} />
        <Route path="/about" element={<About />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  )
}

export default App
