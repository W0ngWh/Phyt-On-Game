import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './Home';
import Login from './Login';
import Register from './Register';
import Menu from './Menu';
import Map from './Map';
import Story from './Story';
import Challenge from './Challenge';
import Leaderboard from './Leaderboard';
import Multiplayer from './Multiplayer';
import End from './End';
import './App.css'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />}></Route>
        <Route path='/login' element={<Login />}></Route>
        <Route path='/register' element={<Register />}></Route>
        <Route path='/menu' element={<Menu />}></Route>
        <Route path='/map' element={<Map />}></Route>
        <Route path='/story' element={<Story />}></Route>
        <Route path='/challenge' element={<Challenge />}></Route>
        <Route path='/leaderboard' element={<Leaderboard />}></Route>
        <Route path='/multiplayer' element={<Multiplayer />}></Route>
        <Route path='/end' element={<End />}></Route>
      </Routes>
    </BrowserRouter>
  )
}
 
export default App

