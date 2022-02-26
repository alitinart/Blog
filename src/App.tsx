import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./pageComponents/Header/Header";
import Footer from "./pageComponents/Footer/Footer";
import Main from "./Components/Main/Main";

function App() {
  return (
    <BrowserRouter>
      <div className="wrapper" style={{ marginBottom: "74px" }}>
        <Header />
      </div>
      <Routes>
        <Route path="/" element={<Main></Main>}></Route>
      </Routes>

      <Footer />
    </BrowserRouter>
  );
}

export default App;
