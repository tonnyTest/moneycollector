import "./App.css";
import Login from "./Components/login/LoginForm";
import Signup from "./Components/signup/Signup";
import Name from "./Components/register/Name";
import ManagerDashboard from "./Components/dashboard/ManagerDashboard";
import EmployeeDashboard from "./Components/dashboard/EmployeeDashBoard";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./Components/Comman/Header";
import Footer from "./Components/Comman/Footer";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Signup />} />
          <Route path="/manager-dashboard" element={<ManagerDashboard />} />
          <Route path="/employee-dashboard/:id" element={<EmployeeDashboard />} />
          <Route path="/user-name" element={<Name />} />
        </Routes>
        {/* <Footer /> */}
      </BrowserRouter>
    </div>
  );
}

export default App;
