import './App.css'
import { Routes, Route } from "react-router-dom";
import VizDesigner from './pages/designer/VizDesigner';
import VizPreview from './pages/preview/VizPreview';

function App() {
  return (
    <Routes>
      <Route path="/" element={<VizDesigner />}></Route>
      <Route path="/preview" element={<VizPreview />}></Route>
    </Routes>)
}

export default App
