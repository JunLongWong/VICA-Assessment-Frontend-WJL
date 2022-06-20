import React from "react";
import Index from "./pages/book/IndexPage";
import User from "./pages/user/UserPage";
import LoginPage from "./pages/login/LoginPage";
import Dashboard from "./pages/Dashboard/DashboardPage";
import { Route, Routes } from "react-router-dom";

const App: React.FC = () => {
  return (
    <div className={"App"}>
      <Routes>
        <Route path="/" element={<LoginPage />}></Route>
        <Route path='/index' element={<Index />} />
        <Route path='/user' element={<User />} />
        <Route path='/dashboard' element={<Dashboard />} />
      </Routes>
    </div>
  );
};

export default App;
