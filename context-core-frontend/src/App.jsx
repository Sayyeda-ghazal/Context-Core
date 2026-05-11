import { Routes, Route } from 'react-router-dom';
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
import VerifyEmail from "./pages/Auth/VerifyEmail";
import VerificationSent from "./pages/Auth/VerificationSent";

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/verify-email" element={<VerifyEmail />} />
      <Route path="/verification-sent" element={<VerificationSent />} />
      <Route path="/*" element={<Login />} />
    </Routes>
  );
}

export default App;