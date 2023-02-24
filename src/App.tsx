import { Suspense, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Cookies from 'js-cookie';
import MyCart from "./pages/MyCart/MyCart";
import MyFavorites from "./pages/MyFavorites/MyFavorites";
import Products from "./pages/Products/Products";
import './scss/common.scss';
import authService from "./services/auth/authService";

function App() {
  useEffect(() => {
    authService.authenticate({
      username: 'kminchelle',
      password: '0lelplR'
    }).then(result => {
      Cookies.set('token', result.token)
    })
  }, [])
  return (
    <>
      <Suspense fallback={null}>
        <Router>
          <Routes>
            <Route path='/' element={<Products />} />
            <Route path='/my-favorites' element={<MyFavorites />} />
            <Route path='/my-cart' element={<MyCart />} />
          </Routes>
        </Router>
      </Suspense>

    </>
  );
}

export default App;
