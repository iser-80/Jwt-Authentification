import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/login/login.js';
import Register from './pages/register/register.js';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/login' element={<Login/>} />
        <Route path='/register' element={<Register/>} />
      </Routes>
    </Router>
  );
}

export default App;
