import "./App.css";
import { Route, BrowserRouter, Routes } from "react-router-dom";
import Home from "./Views/Home/Home";
import Landing from "./Views/Landing/Landing";
import Navbar from "./Components/Navbar/Navbar";
import Form from "./Views/Form/Form";
import Detail from "./Views/Detail/Detail";

function App() {
  //const location = useLocation();

  return (
    <BrowserRouter>
      <div className="App">
        <Navbar />
        <Routes>
          <Route exact path={"/"} element={<Landing />} />
          <Route path={"/home"} element={<Home />} />

          <Route path={"/create"} element={<Form />} />

          <Route path={"/detail/:id"} element={<Detail />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
