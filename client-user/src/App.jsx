import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
//import Appbar from "./components/Appbar";
import LoginPage from "./components/LoginPage";
import RegisterPage from "./components/RegisterPage";
import LandingPage from "./components/LandingPage";
import ShowCourses from "./components/ShowCourses";
import CoursePage from "./components/CoursePage";
import PurchasedCourses from "./components/PurchasedCourses";
import AppNavBar from "./components/AppNavBar";
import { Toaster } from 'react-hot-toast';
import CartPage from "./components/CartPage";
import ThankYouPage from "./components/ThankYouPage";

function App() {
  return (
    <Router>
      <AppNavBar />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/courses" element={<ShowCourses />} />
        <Route path="/courses/:id" element={<CoursePage />} />
        <Route path="/courses/purchased" element={<PurchasedCourses />} />
        <Route path="/courses/cartpage" element={<CartPage />} />
        <Route path="/thankyou" element={<ThankYouPage />} />
      </Routes>
      <Toaster />
    </Router>
  );
}

export default App;
