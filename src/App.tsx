import React from "react";
import Index from "./pages/book/indexPage";
import User from "./pages/user/user";
import LoginPage from "./pages/login/loginPage";
import Dashboard from "./pages/Dashboard/dashboardPage";
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
