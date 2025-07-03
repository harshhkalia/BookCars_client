import { BrowserRouter, Routes, Route } from "react-router-dom";
import Auth from "./components/auth/Auth";
import CustomerHome from "./components/home/CustomerHome";
import OwnerInitialHP from "./components/home/OwnerInitialHP";
import ProtectedRoute from "./protectedRoute";
import OwnerHome from "./components/home/OwnerHome";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ProtectedRoute fallback={Auth} />} />
        <Route path="/customer" element={<CustomerHome />} />
        <Route path="/ownerIP" element={<OwnerInitialHP />} />
        <Route path="/owner" element={<OwnerHome />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
