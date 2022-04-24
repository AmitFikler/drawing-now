import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import WelcomePage from './components/WelcomePage';
import './App.css';
import ChooseWord from './components/ChooseWord';
function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<WelcomePage />} />
          <Route path="/choose" element={<ChooseWord />} />
          {/* <Route path='/drew' element={} />
          <Route path='/guess' element={} />
          <Route path='/wait' element={} /> */}
        </Routes>
      </Router>
    </div>
  );
}

export default App;
