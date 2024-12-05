import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import FormEditor from './pages/FormEditor';
import FormPreview from './pages/FormPreview';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<FormEditor />} />
        <Route path="/preview/:formId" element={<FormPreview />} />
      </Routes>
    </Router>
  );
}

export default App;
