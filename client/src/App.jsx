
import './App.css';

import { Routes, Route } from "react-router-dom";
import { HomePage } from "./Pages/HomePage"
import { RegisterPage } from "./Auth/RegisterPage";
import { LoginPage } from "./Auth/LoginPage";
import { CSVFileUploadPage } from './Pages/CSVFileUploadPage';
import { ProductsPage } from './Pages/ProductsPage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<><HomePage /></>} />
      <Route path="/register" element={<><RegisterPage /></>} />
      
      <Route path="/login" element={<><LoginPage /></>} />
      <Route path="/csv-file-upload" element={<><CSVFileUploadPage /></>} />
      <Route path="/get-all-products" element={<><ProductsPage /></>} />
    </Routes>
  );
}

export default App;
