import './App.css';
import Navbar from "./Components/Navbar/Navbar";
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Products from "./Pages/Products";
import ProductPage from "./Pages/ProductPage";
import Search from "./Pages/Search";
import Cart from "./Pages/Cart";
import Login from "./Pages/Login";
import SignUp from "./Pages/SignUp";

function App() {
  return (
      <BrowserRouter>
          <header><Navbar/></header>
          <Routes>
              <Route path="/" element={<Products/>}/>
              <Route path="/product" element={<ProductPage/>}>
                  <Route path=":productId" element={<ProductPage/>}/>
              </Route>
              <Route path="/search" element={<Search/>}/>
              <Route path="/cart" element={<Cart/>}/>
              <Route path="/login" element={<Login/>}/>
              <Route path="/signup" element={<SignUp/>}/>
          </Routes>
      </BrowserRouter>
  );
}

export default App;