import { Suspense, useEffect } from "react";
import { Provider } from "react-redux";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import MyCart from "./pages/MyCart/MyCart";
import MyFavorites from "./pages/MyFavorites/MyFavorites";
import Products from "./pages/Products/Products";
import './scss/common.scss';
import store, { useAppSelector } from "./redux/stores";

function App() {

  const { common } = useAppSelector(state => state)
  return (
      <div className={common.darkmode ? "darktheme" : "lighttheme"} >
        <Suspense fallback={null}>
          <Router>
            <Routes>
              <Route path='/' element={<Products />} />
              <Route path='/my-favorites' element={<MyFavorites />} />
              <Route path='/my-cart' element={<MyCart />} />
            </Routes>
          </Router>
        </Suspense>
      </div>
  );
}

export default App;
