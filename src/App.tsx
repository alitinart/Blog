import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./pageComponents/Header/Header";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
