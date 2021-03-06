import React from "react";
import Index from "./pages/book/indexPage";
import User from "./pages/user/UserPage";
import LoginPage from "./pages/login/loginPage";
import Dashboard from "./pages/Dashboard/dashboardPage";
import { Route, Routes } from "react-router-dom";
import { useAuth } from "./hooks/useAuth";
import { UserRoleEnum } from "./models/UserRoleEnum";
// import BorrowHistory from "./pages/borrowHistory/borrowHistory";

const App: React.FC = () => {
  const {
    getLoggedInUserRole,
    isAuthorized
  } = useAuth();

  return (
    <div className={"App"}>
      <Routes>
        <Route path="/" element={<LoginPage />}></Route>
        {getLoggedInUserRole() && <Route path='/index' element={<Index />} />}
        {isAuthorized([UserRoleEnum.SUPER_ADMIN, UserRoleEnum.ADMIN, UserRoleEnum.EDITOR]) && <Route path='/user' element={<User />} />}
        {getLoggedInUserRole() &&
          <>
            <Route path='/dashboard' element={<Dashboard />} />
            {/* <Route path='/borrowhistory' element={<BorrowHistory />} /> */}
          </>
        }
      </Routes>
    </div>
  );
};

export default App;
