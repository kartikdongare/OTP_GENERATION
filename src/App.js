
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import FormPage from './Components/FormPage';
import OtpPage from './Components/OtpPage';

function App() {
  return (
    <div>
      <BrowserRouter>
      <Routes>
        <Route path='/' element={<FormPage/>}/>
        <Route path='/otppage' element={<OtpPage/>}/>
      </Routes>
      </BrowserRouter>
     
    </div>
  );
}

export default App;
