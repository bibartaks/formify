import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Home from "./pages/Home"
import UserData from "./pages/UserData"
import Layout from "./pages/Layout"
import "../src/index.css"

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/userdata" element={<UserData />} />
        </Route>
      </Routes>
    </Router>
  )
}

export default App
