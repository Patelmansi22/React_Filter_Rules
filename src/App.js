import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Addrule from './Components/Addrule';
import Checkrule from './Components/Checkrule';
import Home from './Components/Home';
import Form from "./Components/Form";
import Demo from './Components/Demo';
function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* <Route path='/' element={<Home/>}/> */}
        <Route path='/' element={<Form />} />
        <Route path='/checkrule' element={<Demo />} />


        {/* <Route path='/history' element={<History/>}/> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
