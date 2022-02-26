import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./pageComponents/Header/Header";
import Footer from "./pageComponents/Footer/Footer";
import Main from "./Components/Main/Main";
import Auth from "./Components/Auth/Auth";

function App() {
  return (
    <BrowserRouter>
      <div className="wrapper" style={{ marginBottom: "74px" }}>
        <Header />
      </div>
      <Routes>
        <Route path="/" element={<Main />}></Route>
        <Route path="/auth/:type" element={<Auth />}></Route>
      </Routes>

      <Footer />
    </BrowserRouter>
  );
}

export default App;
