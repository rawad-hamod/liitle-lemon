import { BrowserRouter , Routes , Route } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import BookingTable from "./pages/BookingTable";


function App() {
  return (
    <>
    
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/booking-a-table" element={<BookingTable/>}/>
    </Routes>
    </BrowserRouter>
      
    </>
  );
}

export default App;
