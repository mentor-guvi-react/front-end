import { BrowserRouter, Routes, Route } from "react-router-dom";

import Day05 from "./Day05";
import Jwt from "./Jwt";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/day5" element={<Day05 />} />
        <Route exact path="/jwt" element={<Jwt />} />
        <Route path="/" element={<Day05 />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

// axios.get(url, { header: {} });
// axios.post(url, {}, { headers: {} });
