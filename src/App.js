import './App.css';
import { BrowserRouter } from 'react-router-dom'; // Import BrowserRouter
import Routes from './routes/AppRoutes';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes />
      </BrowserRouter>
    </div>
  );
}

export default App;
