import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import Login from "./pages/Login";
import { Toaster } from "react-hot-toast";
import Appointment from "./pages/Appointment";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Appointment />} />
        <Route path="/login" element={<Login />} />
      </Routes>
      <Toaster position="top-right" />
    </Router>
  )
}

export default App