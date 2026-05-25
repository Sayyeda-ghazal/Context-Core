import { Routes, Route } from 'react-router-dom';
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
import VerifyEmail from "./pages/Auth/VerifyEmail";
import VerificationSent from "./pages/Auth/VerificationSent";
import ForgotPassword from './pages/Auth/Forgot Password';
import ResetPassword from './pages/Auth/ResetPassword';
import Dashboard from './pages/Dashboard/Dashboard';
import RequireAuth from "./Components/auth/RequireAuth";

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/verify-email" element={<VerifyEmail />} />
      <Route path="/verification-sent" element={<VerificationSent />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path='/reset-password' element= {<ResetPassword/>}/>
      <Route
        path="/dashboard/home"
        element={
          <RequireAuth>
            <Dashboard />
          </RequireAuth>
        }
      />
      <Route path="/*" element={<Login />} />
    </Routes>
  );
}

export default App;
