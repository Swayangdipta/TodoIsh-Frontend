import { useContext, useEffect } from 'react';
import {BrowserRouter as Router,Route,Routes} from 'react-router-dom'
import {ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import AuthSection from './components/AuthSection';
import Home from './components/Home';
import {TodoProvider} from './context/TodoContext'

function App() {
  return (
    <div className="App w-[100vw] min-h-[100vh] font-['poppins']">
      <ToastContainer />
      <TodoProvider>
      <Router>
        <Routes>
          <Route path='/' element={<AuthSection />} />
          <Route path='/home' element={<Home />} />
        </Routes>
      </Router>
      </TodoProvider>
    </div>
  );
}

export default App;
