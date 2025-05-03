import './App.css';
import Navbar from "./Components/Navbar/Navbar";
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Products from "./Pages/Products";
import ProductPage from "./Pages/ProductPage";
import Search from "./Pages/Search";
import Cart from "./Pages/Cart";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import Footer from "./Components/Footer/Footer";

function App() {
  return (
      <BrowserRouter>
          <header><Navbar/></header>
          <section>
              <Routes>
                  <Route path="/" element={<Products/>}/>
                  <Route path="/product/:productId" element={<ProductPage/>}/>
                  <Route path="/search" element={<Search/>}/>
                  <Route path="/cart" element={<Cart/>}/>
                  <Route path="/login" element={<Login/>}/>
                  <Route path="/register" element={<Register/>}/>
              </Routes>
          </section>
          <Footer/>
      </BrowserRouter>
  );
}

export default App;