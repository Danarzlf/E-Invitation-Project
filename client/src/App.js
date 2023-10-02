import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  createBrowserRouter,
  RouterProvider,
  Routes,
  Route,
  Switch,
  Navigate,
  BrowserRouter,
} from "react-router-dom";
import Dashboard from "./components/Home/Dashboard";
// import ExpenseDetail from "./components/Expenses/ExpenseDetail";
// import ExpenseFormUpdate from "./components/NewExpense/ExpenseFormUpdate";

import ExpenseLogin from "./components/Expenses/ExpenseLogin";
import ExpenseRegister from "./components/Expenses/ExpenseRegister";
import ClientList from "./components/Home/ClientList";
import OTP from "./components/Expenses/OTP";
import NotFoundPage from "./components/Expenses/NotFoundPage";
import NoAccess from "./components/Expenses/NoAccess";
import ClientPage from "./components/Home/ClientPage";
import AdminProfile from "./components/Home/AdminProfile";
import ForYouPage from "./components/Home/ForYouPage";
import Forget from "./components/Home/Forget";
import Reset from "./components/Home/Reset";
import DetailPage from "./components/Home/DetailPage";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ClientPage />} />
        <Route path="/lgn-adm" element={<ExpenseLogin />} />
        <Route path="/rgs-adm" element={<ExpenseRegister />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/client/:invitation_id" element={<ClientList />} />
        <Route path="/otp-verify" element={<OTP />} />
        <Route path="/who?" element={<NoAccess />} />
        <Route path="/admin-profile" element={<AdminProfile />} />
        <Route path="/forget-password" element={<Forget />} />
        <Route path="/reset-password" element={<Reset />} />
        <Route path="/wedding/:urlCouple" element={<ForYouPage />} />
        <Route path="/detail-page" element={<DetailPage />} />
        {/* <Route path="/for-you" element={<ForYouPage />} /> */}

        <Route path="*" element={<NotFoundPage />} />
        {/* <Route path="/details/:id" element={<ExpenseDetail />} />
        <Route path="/update/:id" element={<ExpenseFormUpdate />} />
        <Route path="/register" element={<ExpenseRegister />} />{" "} */}
        {/* Tambahkan properti element untuk rute login */}
      </Routes>
    </BrowserRouter>
  );
};

export default App;
