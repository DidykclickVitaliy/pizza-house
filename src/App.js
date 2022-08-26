import React from "react";
import { Route, Routes } from "react-router-dom";
// https://www.youtube.com/watch?v=7t9_nmg_Yzg&list=PL0FGkDGJQjJG9eI85xM1_iLIf6BcEdaNl&index=10  verstka
import { Home } from "./pages/Home";
import { Header } from "./components/Header";
import { Cart } from "./pages/Cart";
import { NotFound } from "./pages/NotFound";

// import pizzas from "./assets/pizzas.json";
import "./assets/scss/app.scss";

function App() {
  // const pathname = window.location.pathname;

  return (
    <div className="wrapper">
      <Header />
      <div className="content">
        {/* pathname === "/" && <Home/> */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
