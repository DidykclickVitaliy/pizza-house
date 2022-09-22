import React, { Suspense } from "react";
import { Route, Routes } from "react-router-dom";
// import Loadable from "react-loadable";
// https://www.youtube.com/watch?v=7t9_nmg_Yzg&list=PL0FGkDGJQjJG9eI85xM1_iLIf6BcEdaNl&index=10  verstka
import { Home } from "./pages/Home";
import { MainLayout } from "./layouts/MainLayout";

import "./assets/scss/app.scss";

const Cart = React.lazy(
  () => import(/* webpackChunkName: "Cart" */ "./pages/Cart")
);
const NotFound = React.lazy(
  () => import(/* webpackChunkName: "NotFound" */ "./pages/NotFound")
);
const FullPizza = React.lazy(() =>
  import(/* webpackChunkName: "FullPizza" */ "./pages/FullPizza").then(
    (module) => ({ default: module.FullPizza }) // if not export default
  )
);

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route path="" element={<Home />} />
        <Route
          path="cart"
          element={
            <Suspense fallback={<div>Loading...</div>}>
              <Cart />
            </Suspense>
          }
        />
        <Route
          path="pizza/:id"
          element={
            <Suspense fallback={<div>Loading...</div>}>
              <FullPizza />
            </Suspense>
          }
        />
        <Route
          path="*"
          element={
            <Suspense fallback={<div>Loading...</div>}>
              <NotFound />
            </Suspense>
          }
        />
      </Route>
    </Routes>
  );
}

export default App;
