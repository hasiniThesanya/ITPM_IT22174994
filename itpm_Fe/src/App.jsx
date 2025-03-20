import { Route } from "react-router"
import Navbar from "./Components/Navbar"
import Contact from "./routes/Contact"
import Home from "./routes/Home"
import About from "./routes/About"
import Services from "./routes/Product"
import { Routes } from "react-router-dom"
import Profile from "./routes/Profile"
function App() {
  return (
    <>
    <Navbar />
    <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/about" element={<About />} />
    <Route path="/Product" element={<Services />} />
    <Route path="/contact" element={<Contact />} />
    <Route path="/profile" element={<Profile />} />
    

    </Routes>
      
    </>
  )
}

export default App
