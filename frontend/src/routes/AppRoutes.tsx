import { Route, Routes, Navigate } from "react-router-dom";
import Login from "../pages/Login/Login";
import Layout from "../components/Layout/Layout";
import Dashboard from "../pages/Dashboard/Dashboard";
import Clients from "../pages/Clients/Clients";
import CaseDetails from "../pages/Cases/CaseDetails";

function AppRoutes() {
    return (
        <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<Layout />}>
                <Route index element={<Dashboard />} />
                <Route path="dashboard" element={<Dashboard />} />
                <Route path="clients" element={<Clients />} />
                <Route path="cases" element={<CaseDetails />} />
                <Route path="cases/:caseId" element={<CaseDetails />} />
                <Route path="*" element={<Navigate to="/" replace />} />
            </Route>
        </Routes>
    );
}

export default AppRoutes;