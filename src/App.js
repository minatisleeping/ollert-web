import './App.css'
import Navbar from './Components/Navbar/Navbar'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Shop from './Pages/Shop'
import ShopCategory from './Pages/ShopCategory'
import Product from './Pages/Product'
import Cart from './Pages/Cart'
import LoginSignUp from './Pages/LoginSignUp'
// import Hero from './Components/Hero/Hero'

function App() {
  return (
    <div>
      <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/shop" element={<Shop/>} />
        <Route path="/mens" element={<ShopCategory category='men'/>} />
        <Route path="/womens" element={<ShopCategory category='women'/>} />
        <Route path="/kids" element={<ShopCategory category='kid'/>} />
        <Route path='/product' element={<Product/>}>
          <Route path=':productId' element={<Product/>} />
        </Route>
        <Route path="/cart" element={<Cart/>} />
        <Route path="/login" element={<LoginSignUp/>} />
      </Routes>
      </BrowserRouter>
      <Shop />
    </div>
  );
}

export default App;
