import { Route, Routes } from 'react-router-dom';
import './App.css';
import Auth from './components/Auth';
import Navbar from './components/Navbar';
import Mainpage from './components/Mainpage';
import { useEffect } from 'react';

function App() {
  return (
    <div className="App">
      <Routes>  
        <Route path='/' element={[<Navbar /> , <Auth signin={true}/>]}/>
        <Route path='/signup' element={[[<Navbar /> , <Auth signin={false}/>]]} />
        <Route path='/home' element={[[<Navbar logout={true}/> , <Mainpage />]]} />        
      </Routes>
    </div>
  );
}

export default App;
