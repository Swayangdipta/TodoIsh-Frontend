import { useState } from 'react';
import {BrowserRouter as Router,Route,Routes} from 'react-router-dom'
import {ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import AuthSection from './components/AuthSection';
import Home from './components/Home';
import {TodoProvider} from './context/TodoContext'

function App() {
  const [darkToggle,setDarkToggle] = useState(false)
  
  return (
    <div className={`App w-[100vw] min-h-[100vh] font-['poppins'] ${darkToggle && 'dark'}`}>
      <div className='w-[100vw] min-h-[100vh] pb-[30px] dark:bg-slate-800'>
        <ToastContainer />
        <TodoProvider>
        <Router>
          <Routes>
            <Route path='/' element={<AuthSection darkToggle={darkToggle} setDarkToggle={setDarkToggle} />} />
            <Route path='/home' element={<Home darkToggle={darkToggle} setDarkToggle={setDarkToggle} />} />
          </Routes>
        </Router>
        </TodoProvider>        
      </div>

    </div>
  );
}

export default App;
