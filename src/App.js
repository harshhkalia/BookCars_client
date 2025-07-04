import { BrowserRouter, Routes, Route } from "react-router-dom";
import React, { Suspense, lazy } from "react";
import ProtectedRoute from "./protectedRoute";
import Auth from "./components/auth/Auth";

const CustomerHome = lazy(() => import("./components/home/CustomerHome"));
const OwnerInitialHP = lazy(() => import("./components/home/OwnerInitialHP"));
const OwnerHome = lazy(() => import("./components/home/OwnerHome"));

const App = () => {
  return (
    <BrowserRouter>
      <Suspense fallback={<div id="loading_heading">Loading...</div>}>
        <Routes>
          <Route path="/" element={<ProtectedRoute fallback={Auth} />} />
          <Route path="/customer" element={<CustomerHome />} />
          <Route path="/ownerIP" element={<OwnerInitialHP />} />
          <Route path="/owner" element={<OwnerHome />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
};

export default App;
