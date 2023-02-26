import { Suspense, useEffect } from "react";
import { Provider } from "react-redux";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import MyCart from "./pages/MyCart/MyCart";
import MyFavorites from "./pages/MyFavorites/MyFavorites";
import Products from "./pages/Products/Products";
import './scss/common.scss';
import store from "./redux/stores"; 

function App() {
  return (
    <Provider store={store}>
      <Suspense fallback={null}>
        <Router>
          <Routes>
            <Route path='/' element={<Products />} />
            <Route path='/my-favorites' element={<MyFavorites />} />
            <Route path='/my-cart' element={<MyCart />} />
          </Routes>
        </Router>
      </Suspense>
    </Provider>
  );
}

export default App;
