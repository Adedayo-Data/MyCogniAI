import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import TutorChat from "./pages/TutorChat"; // or 'tutor-chat' if that's the file
import ImmersiveMode from "./pages/ImmersiveMode";
import Home from "./pages/Home";
// Import other components as needed

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/tutor-chat" element={<TutorChat />} />
        <Route path="/immersive-mode" element={<ImmersiveMode />} />
        <Route path="/" element={<Home />} />
        <Route path="*" element={<div>Page Not Found</div>} />
      </Routes>
    </Router>
  );
}

export default App;
