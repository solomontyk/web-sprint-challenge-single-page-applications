import React from "react";
import './App.css';
import{Routes , Route, Link} from 'react-router-dom';
import PizzaForm from './Components/PizzaOrderForm';
import Home from './Components/Home';


const App = () => {
  return (
    <div>
    <nav>
        <h1 className='order-pizza'>Ya Mans Pizza</h1>
        <div className='nav-links'>
          <Link to='/'>Home</Link>
          <Link to='/pizza'>Order Pizza</Link>
        </div>
    </nav>
    <Routes>
      <Route path="/" element={<Home />} />

      <Route path="/pizza" element={<PizzaForm />} />
    </Routes>
   </div>
  );
};
export default App;
