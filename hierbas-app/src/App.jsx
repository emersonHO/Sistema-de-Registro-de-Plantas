import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import LoginPage from "./pages/LoginPage";
import { useEffect, useState } from "react";
import AuthService from "./services/AuthService";

export default function App() {
  
  const [isAuth, setIsAuth] = useState(!!AuthService.getToken());

  useEffect(() => {
    const onStorage = () => setIsAuth(!!AuthService.getToken());
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  return (
    <>
      {isAuth ? <Dashboard /> : <LoginPage onAuth={() => setIsAuth(true)} />}
    </>
  );
}
