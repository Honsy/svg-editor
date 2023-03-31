import './App.css'
import { Routes, Route } from "react-router-dom";
import DesignerPage from './pages/designer/DesignerPage';
import PreviewPage from './pages/preview/PreviewPage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<DesignerPage />}></Route>
      <Route path="/preview" element={<PreviewPage />}></Route>
    </Routes>)
}

export default App
