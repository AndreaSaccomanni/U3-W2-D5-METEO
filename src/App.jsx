import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import NavBar from "./components/NavBar";
import MyFooterComponent from "./components/MyFooterComponent";
import MainComponent from "./components/MainComponent";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import MeteoDetailsComponent from "./components/MeteoDetailsComponent";

function App() {
  return (
    <>
      <NavBar />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainComponent />}></Route>
          <Route path="/details" element={<MeteoDetailsComponent />}></Route>
        </Routes>
      </BrowserRouter>
      <MyFooterComponent />
    </>
  );
}

export default App;
