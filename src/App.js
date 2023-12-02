import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './components/Home';
import Data from './components/Data';
import Transaction from './components/Transaction';


function App() {
  return (
    <div className="App">
     
     <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}/>
          <Route path="/transact" element={<Transaction />} />
          <Route path="/getdata" element={<Data />} />
       
      </Routes>
    </BrowserRouter>

    </div>
  );
}

export default App;
