import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Staff from "./pages/Staff";
import Login from "./pages/Login";
export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/staff" element={<Staff />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}
