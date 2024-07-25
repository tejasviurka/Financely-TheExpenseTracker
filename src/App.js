import "./App.css";
// import Header from "./components/Header";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import SignUp from "./pages/Signup";
import  {ToastContainer, toast} from "react-toastify";
function App() {
  return (
    <>
    <ToastContainer/>
    <Router>
      <Routes>
        <Route path="/" element={<SignUp/>} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </Router>
    </>
  );
}

export default App;
