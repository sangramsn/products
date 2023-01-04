import './App.css';
import Dashboard from './pages/Dashboard';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import AddProducts from './pages/AddProducts';
import { GlobalProvider } from './context/GlobalState';
import 'bootstrap/dist/css/bootstrap.min.css';
function App() {
  return (
    <div className='App'>
      <GlobalProvider>
        <BrowserRouter>
          <Routes>
            <Route exact path='/' element={<Dashboard />} />
            <Route path='/product/:id' element={<AddProducts />} />
            <Route path='/create-product' element={<AddProducts />} />
          </Routes>
        </BrowserRouter>
      </GlobalProvider>
    </div>
  );
}

export default App;
