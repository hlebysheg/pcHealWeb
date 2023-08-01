import { Route, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import "./App.css";
import { LoginPage } from "./pages/login";
import { PcInfoPage } from "./pages/pcinfo";
import { Header } from "./widget/header";

function App() {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <Header/>
      <Routes>
        <Route element={<LoginPage />} path={"/login"} />
        <Route element={<LoginPage />} path={"/"} />
        <Route element={<PcInfoPage />} path={"/pcinfo"} />
      </Routes>
    </QueryClientProvider>
  );
}

export default App;
