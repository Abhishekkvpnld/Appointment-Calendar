import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import Login from "./pages/Login";
import { Toaster } from "react-hot-toast";
import Appointment from "./pages/Appointment";
import AllAppointments from "./pages/AllAppointments";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Appointment />} />
        <Route path="/login" element={<Login />} />
         <Route path="/all-appointments" element={<AllAppointments/>} />
      </Routes>
      <Toaster position="top-right" />
    </Router>
  )
}

export default App