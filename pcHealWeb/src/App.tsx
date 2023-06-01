import { Route, Routes } from "react-router-dom";
import "./App.css";
import { LoginPage } from "./pages/login";
import { PcInfoPage } from "./pages/pcinfo";
import { Header } from "./widget/header";

function App() {
  return (
    <>
      <Header/>
      <Routes>
        <Route element={<LoginPage />} path={"/login"} />
        <Route element={<LoginPage />} path={"/"} />
        <Route element={<PcInfoPage />} path={"/pcinfo"} />
      </Routes>
    </>
  );
}

export default App;
