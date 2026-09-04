import { BrowserRouter, Navigate, Route, Routes } from "react-router";
import GlobalStyles from "./styles/GlobalStyles";
import Dashboard from "./pages/Dashboard";
import Bookings from "./pages/Bookings";
import Cabins from "./pages/Cabins";
import Users from "./pages/Users";
import Settings from "./pages/Settings";
import Account from "./pages/Account";
import Login from "./pages/Login";
import PageNotFound from "./pages/PageNotFound";
import AppLayout from "./ui/AppLayout";
import { ToastContainer } from "react-toastify";

const App = () => {
  return (
    <>
      <ToastContainer />
      <GlobalStyles />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<AppLayout />}>
            <Route index element={<Navigate replace to="dashboard" />} />
            <Route path="Users" element={<Users />} />
            <Route path="Account" element={<Account />} />
            <Route path="Bookings" element={<Bookings />} />
            <Route path="Cabins" element={<Cabins />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="Settings" element={<Settings />} />
          </Route>
          <Route path="Login" element={<Login />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
