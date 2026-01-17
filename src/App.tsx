import { BrowserRouter, Routes, Route } from "react-router-dom"
import { ProtectedRoute } from "./components/ProtectedRoute"
import { PublicRoute } from "./components/PublicRoute"
import Login from "./pages/auth/index"
import Home from "./pages/Home"
import Schema from "./pages/Schema"
import Template from "./pages/Template"

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<PublicRoute children={<Login />} />} />
        <Route path="/home" element={<ProtectedRoute children={<Home />} />} />
        <Route path="/schema" element={<ProtectedRoute children={<Schema />} />} />
        <Route path="/template" element={<ProtectedRoute children={<Template />} />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
